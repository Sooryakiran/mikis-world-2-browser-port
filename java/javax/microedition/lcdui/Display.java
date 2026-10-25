package javax.microedition.lcdui;

import javax.microedition.midlet.MIDlet;
import web.Browser;

public final class Display {
    private static final Display INSTANCE = new Display();
    static boolean dirty = true;
    private Displayable current;
    public static Display getDisplay(MIDlet midlet) { return INSTANCE; }
    public boolean isColor() { return true; }
    public Displayable getCurrent() { return current; }
    public void setCurrent(Displayable next) {
        if (current == next) return;
        if (current instanceof Canvas canvas) canvas.hideNotify();
        current = next;
        dirty = true;
        if (next instanceof Canvas canvas) { canvas.showNotify(); canvas.repaint(); }
    }
    public void flush() {
        if (current == null) return;
        if (dirty) { dirty = false; current.render(); Browser.endUI(); }
        if (current instanceof Canvas canvas) canvas.serviceRepaints();
    }
    public void key(int key, boolean pressed) {
        if (current instanceof Canvas canvas) {
            if (pressed) canvas.keyPressed(key); else canvas.keyReleased(key);
        }
    }
    public void command(int id) {
        if (current == null || id < 0 || id >= current.commands.size()) throw new IllegalArgumentException("Command ID");
        Displayable screen = current;
        if (screen.listener != null) screen.listener.commandAction(screen.commands.get(id), screen);
    }
    public void select(int index) {
        if (!(current instanceof List list)) throw new IllegalStateException("Not a list");
        list.setSelectedIndex(index);
        if (list.listener != null) list.listener.commandAction(List.SELECT_COMMAND, list);
    }
    public void text(int index, String value) {
        if (!(current instanceof Form form) || !(form.items.get(index) instanceof TextField field)) {
            throw new IllegalArgumentException("Text field ID");
        }
        field.setString(value);
    }
}
