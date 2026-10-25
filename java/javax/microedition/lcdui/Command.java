package javax.microedition.lcdui;

public class Command {
    public static final int SCREEN=1, BACK=2, CANCEL=3, OK=4, HELP=5, STOP=6, EXIT=7, ITEM=8;
    public final String label;
    public final int type, priority;
    public Command(String label, int type, int priority) {
        this.label=label; this.type=type; this.priority=priority;
    }
}
