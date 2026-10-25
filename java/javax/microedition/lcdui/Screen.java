package javax.microedition.lcdui;
public abstract class Screen extends Displayable {
    public void setTitle(String value) { title = value; Display.dirty = true; }
}
