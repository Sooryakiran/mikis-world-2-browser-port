import java.nio.file.*;
import java.security.MessageDigest;
import java.util.*;
import java.util.jar.*;
import org.objectweb.asm.*;
import org.objectweb.asm.tree.*;

public final class PrepareOriginal implements Opcodes {
    private static final String HASH = "20cf96fe5bb118e47abd2f390b4778f36bca9d461349351b7e003669ea29a794";
    private static final Map<String, Integer> counts = new TreeMap<>();

    private static String hash(byte[] bytes) throws Exception {
        return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(bytes));
    }

    private static void count(String key) { counts.merge(key, 1, Integer::sum); }

    public static void main(String[] args) throws Exception {
        Path root = Path.of(args[0]);
        Path jarPath = root.resolve("jar/mikis_world_2.jar");
        if (!hash(Files.readAllBytes(jarPath)).equals(HASH)) {
            throw new IllegalStateException("Unrecognized JAR: re-inspect bytecode before adapting");
        }
        Path classes = root.resolve("build/original");
        Path resources = root.resolve("public/original");
        Files.createDirectories(classes);
        Files.createDirectories(resources);
        List<String> entries = new ArrayList<>();
        try (JarFile jar = new JarFile(jarPath.toFile())) {
            for (JarEntry entry : Collections.list(jar.entries())) {
                String name = entry.getName();
                if (entry.isDirectory() || name.startsWith("META-INF/")) continue;
                if (name.contains("/") || name.contains("\\") || name.contains("..")) {
                    throw new IllegalStateException("Unexpected archive path: " + name);
                }
                byte[] bytes = jar.getInputStream(entry).readAllBytes();
                if (name.endsWith(".class")) {
                    Files.write(classes.resolve(name), adapt(bytes));
                } else {
                    Files.write(resources.resolve(name), bytes);
                    entries.add("{\"name\":\"" + name + "\",\"size\":" + bytes.length
                            + ",\"sha256\":\"" + hash(bytes) + "\"}");
                }
            }
        }
        Map<String, Integer> expected = Map.of("loop", 1, "thread", 1, "join", 1,
                "resource", 7, "clock", 3, "random-seed", 1, "sleep", 2, "yield", 1);
        if (!counts.equals(expected)) throw new IllegalStateException("Adaptation mismatch: " + counts);
        if (entries.size() != 34) throw new IllegalStateException("Resource inventory changed: " + entries.size());
        Files.writeString(resources.resolve("manifest.json"),
                "{\"jarSha256\":\"" + HASH + "\",\"resources\":[" + String.join(",", entries) + "]}");
        System.out.println("Verified original JAR; resources=" + entries.size() + "; adaptations=" + counts);
    }

    private static byte[] adapt(byte[] bytes) {
        ClassNode cls = new ClassNode();
        new ClassReader(bytes).accept(cls, ClassReader.SKIP_FRAMES);
        for (MethodNode method : cls.methods) {
            if (cls.name.equals("GameMIDlet") && method.name.equals("run") && method.desc.equals("()V")) {
                // The initial forward jump checks lifecycle flags; return on the body fall-through only.
                JumpInsnNode initial = null;
                for (AbstractInsnNode insn : method.instructions) {
                    if (insn instanceof JumpInsnNode jump && jump.getOpcode() == GOTO) {
                        initial = jump;
                        break;
                    }
                }
                if (initial == null) throw new IllegalStateException("Missing run loop entry");
                int backEdges = 0;
                for (AbstractInsnNode insn : method.instructions) {
                    if (insn instanceof JumpInsnNode jump && jump.getOpcode() == IFEQ
                            && method.instructions.indexOf(jump.label) < method.instructions.indexOf(jump)) {
                        backEdges++;
                    }
                }
                if (backEdges != 1) throw new IllegalStateException("Unexpected run loop");
                LabelNode condition = new LabelNode();
                InsnList boundary = new InsnList();
                boundary.add(new InsnNode(RETURN));
                boundary.add(condition);
                method.instructions.insert(initial.label, boundary);
                initial.label = condition;
                count("loop");
            }
            for (AbstractInsnNode insn : method.instructions.toArray()) {
                if (!(insn instanceof MethodInsnNode call)) continue;
                if (call.owner.equals("java/lang/Class") && call.name.equals("getResourceAsStream")) {
                    call.setOpcode(INVOKESTATIC);
                    call.owner = "web/Resources";
                    call.name = "open";
                    call.desc = "(Ljava/lang/Class;Ljava/lang/String;)Ljava/io/InputStream;";
                    count("resource");
                } else if (call.owner.equals("java/lang/System") && call.name.equals("currentTimeMillis")) {
                    if (cls.name.equals("d") && method.name.equals("<init>")) {
                        count("random-seed");
                    } else {
                        call.owner = "web/Browser";
                        call.name = "clock";
                        count("clock");
                    }
                } else if (call.owner.equals("java/lang/Thread")) {
                    switch (call.name) {
                        case "start" -> {
                            if (!cls.name.equals("GameMIDlet") || !method.name.equals("startApp")) {
                                throw new IllegalStateException("Unexpected thread start");
                            }
                            AbstractInsnNode first = call;
                            for (int i = 0; i < 8; i++) first = first.getPrevious();
                            if (!(first instanceof VarInsnNode) || first.getOpcode() != ALOAD) {
                                throw new IllegalStateException("Unexpected thread construction");
                            }
                            while (first != call) {
                                AbstractInsnNode next = first.getNext();
                                method.instructions.remove(first);
                                first = next;
                            }
                            method.instructions.remove(call);
                            count("thread");
                        }
                        case "join" -> { method.instructions.set(call, new InsnNode(POP)); count("join"); }
                        case "sleep" -> { method.instructions.set(call, new InsnNode(POP2)); count("sleep"); }
                        case "yield" -> { method.instructions.remove(call); count("yield"); }
                        default -> { }
                    }
                }
            }
        }
        if (cls.name.equals("GameMIDlet")) {
            getter(cls, "browserGame", "case", "Ld;");
            getter(cls, "browserMode", "long", "I");
        }
        if (cls.name.equals("d")) {
            getter(cls, "browserState", "cX", "I");
            getter(cls, "browserX", "aR", "I");
            getter(cls, "browserY", "aQ", "I");
        }
        ClassWriter writer = new ClassWriter(ClassWriter.COMPUTE_MAXS);
        cls.accept(writer);
        return writer.toByteArray();
    }

    private static void getter(ClassNode cls, String methodName, String field, String type) {
        MethodNode method = new MethodNode(ACC_PUBLIC, methodName, "()" + type, null, null);
        method.instructions.add(new VarInsnNode(ALOAD, 0));
        method.instructions.add(new FieldInsnNode(GETFIELD, cls.name, field, type));
        method.instructions.add(new InsnNode(type.equals("I") ? IRETURN : ARETURN));
        cls.methods.add(method);
    }
}
