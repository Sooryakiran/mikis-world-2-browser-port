package javax.microedition.lcdui;
public class TextField extends Item {
    public static final int ANY=0;
    final String label;
    String value;
    int max;
    public TextField(String label, String value, int max, int constraints) {
        this.label=label; this.max=max; setString(value == null ? "" : value);
    }
    public String getString() { return value; }
    public void setString(String text) {
        if (text.length() > max) throw new IllegalArgumentException("Text exceeds maximum size");
        value=text;
    }
    public int setMaxSize(int size) {
        if (size <= 0) throw new IllegalArgumentException("Invalid text size");
        max=size;
        if (value.length() > max) value=value.substring(0,max);
        Display.dirty=true;
        return max;
    }
}
