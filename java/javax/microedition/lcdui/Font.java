package javax.microedition.lcdui;

import web.Browser;

public final class Font {
    public static final int FACE_SYSTEM=0, STYLE_PLAIN=0, STYLE_BOLD=1, SIZE_SMALL=8, SIZE_MEDIUM=0, SIZE_LARGE=16;
    final int size;
    final boolean bold;
    private Font(int size, boolean bold) { this.size=size; this.bold=bold; }
    public static Font getFont(int face, int style, int size) {
        return new Font(size==8 ? 10 : size==16 ? 16 : 12, (style&1)!=0);
    }
    public int getHeight() { return size+2; }
    public int stringWidth(String text) { return Browser.measure(text,size,bold); }
}
