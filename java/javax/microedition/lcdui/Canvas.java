package javax.microedition.lcdui;

public abstract class Canvas extends Displayable {
    public static final int UP=1, LEFT=2, RIGHT=5, DOWN=6, FIRE=8;
    private boolean pending;
    public int getWidth() { return 176; }
    public int getHeight() { return 144; }
    public boolean isDoubleBuffered() { return true; }
    public int getGameAction(int key) {
        return switch (key) { case 50 -> UP; case 52 -> LEFT; case 54 -> RIGHT; case 56 -> DOWN; case 53 -> FIRE; default -> 0; };
    }
    public void repaint() { pending = true; }
    public void serviceRepaints() {
        if (pending && Display.getDisplay(null).getCurrent() == this) {
            pending = false;
            paint(new Graphics(0, getWidth(), getHeight()));
        }
    }
    protected abstract void paint(Graphics graphics);
    protected void keyPressed(int code) { }
    protected void keyReleased(int code) { }
    protected void keyRepeated(int code) { }
    protected void hideNotify() { }
    protected void showNotify() { }
}
