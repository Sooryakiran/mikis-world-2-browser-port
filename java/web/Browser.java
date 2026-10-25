package web;

import org.teavm.jso.*;

public final class Browser {
    private Browser() { }
    @JSFunctor public interface Tick extends JSObject { void run(); }
    @JSFunctor public interface Pair extends JSObject { void run(int a, int b); }
    @JSFunctor public interface Number extends JSObject { void run(int value); }
    @JSFunctor public interface Text extends JSObject { void run(int index, String value); }
    @JSFunctor public interface State extends JSObject { String get(); }

    @JSBody(params={"tick","key","command","select","text","pause","state"}, script=
        "globalThis.mikiPlatform.bind({tick:tick,key:key,command:command,select:select,text:text,pause:pause,state:state});")
    public static native void bind(Tick tick, Pair key, Number command, Number select, Text text, Number pause, State state);
    @JSBody(script="return globalThis.mikiPlatform.clock;")
    private static native double clockValue();
    public static long clock() { return (long) clockValue(); }
    @JSBody(params="name", script="return globalThis.mikiPlatform.resource(name);")
    public static native String resource(String name);
    @JSBody(params="name", script="return globalThis.mikiPlatform.image(name);")
    public static native int image(String name);
    @JSBody(params={"w","h"}, script="return globalThis.mikiPlatform.surface(w,h);")
    public static native int surface(int w, int h);
    @JSBody(params={"id","axis"}, script="return globalThis.mikiPlatform.dimension(id,axis);")
    public static native int dimension(int id, int axis);
    @JSBody(params={"id","color","cx","cy","cw","ch","x","y","w","h","outline"},
        script="globalThis.mikiPlatform.rect(id,color,cx,cy,cw,ch,x,y,w,h,outline);")
    public static native void rect(int id, int color, int cx, int cy, int cw, int ch,
        int x, int y, int w, int h, boolean outline);
    @JSBody(params={"id","source","cx","cy","cw","ch","x","y"},
        script="globalThis.mikiPlatform.blit(id,source,cx,cy,cw,ch,x,y);")
    public static native void blit(int id, int source, int cx, int cy, int cw, int ch, int x, int y);
    @JSBody(params={"id","value","color","size","bold","cx","cy","cw","ch","x","y"},
        script="globalThis.mikiPlatform.drawText(id,value,color,size,bold,cx,cy,cw,ch,x,y);")
    public static native void drawText(int id, String value, int color, int size, boolean bold,
        int cx, int cy, int cw, int ch, int x, int y);
    @JSBody(params={"value","size","bold"}, script="return globalThis.mikiPlatform.measure(value,size,bold);")
    public static native int measure(String value, int size, boolean bold);
    @JSBody(params={"kind","title"}, script="globalThis.mikiPlatform.beginUI(kind,title);")
    public static native void beginUI(String kind, String title);
    @JSBody(params={"id","label"}, script="globalThis.mikiPlatform.addCommand(id,label);")
    public static native void addCommand(int id, String label);
    @JSBody(params="text", script="globalThis.mikiPlatform.addText(text);")
    public static native void addText(String text);
    @JSBody(params={"id","label","value","max"}, script="globalThis.mikiPlatform.addField(id,label,value,max);")
    public static native void addField(int id, String label, String value, int max);
    @JSBody(params={"id","text","selected"}, script="globalThis.mikiPlatform.addOption(id,text,selected);")
    public static native void addOption(int id, String text, boolean selected);
    @JSBody(script="globalThis.mikiPlatform.endUI();")
    public static native void endUI();
    @JSBody(params={"name","op","id","value"}, script="return globalThis.mikiPlatform.rms(name,op,id,value);")
    public static native String rms(String name, String op, int id, String value);
    @JSBody(params="data", script="return globalThis.mikiPlatform.sound(data);")
    public static native int sound(String data);
    @JSBody(params={"id","repeats"}, script="globalThis.mikiPlatform.playSound(id,repeats);")
    public static native void playSound(int id, int repeats);
    @JSBody(params="id", script="globalThis.mikiPlatform.stopSound(id);")
    public static native void stopSound(int id);
    @JSBody(params="ms", script="globalThis.mikiPlatform.vibrate(ms);")
    public static native void vibrate(int ms);
    @JSBody(script="globalThis.mikiPlatform.exit();")
    public static native void exit();
}
