package web;

import java.io.*;

public final class Resources {
    private Resources() { }
    public static InputStream open(Class<?> owner, String path) {
        String name = path.startsWith("/") ? path.substring(1) : path;
        String data = Browser.resource(name);
        if (data == null) return null;
        byte[] bytes = new byte[data.length()];
        for (int i = 0; i < bytes.length; i++) bytes[i] = (byte) data.charAt(i);
        return new ByteArrayInputStream(bytes);
    }
    public static String binary(byte[] data) {
        StringBuilder result = new StringBuilder(data.length);
        for (byte value : data) result.append((char) (value & 255));
        return result.toString();
    }
}
