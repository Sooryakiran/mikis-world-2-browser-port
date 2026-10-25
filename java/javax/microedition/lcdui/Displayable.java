package javax.microedition.lcdui;

import java.util.ArrayList;
import web.Browser;

public abstract class Displayable {
    final java.util.List<Command> commands = new ArrayList<>();
    CommandListener listener;
    String title = "";
    public void addCommand(Command command) {
        if (!commands.contains(command)) { commands.add(command); Display.dirty = true; }
    }
    public void removeCommand(Command command) { commands.remove(command); Display.dirty = true; }
    public void setCommandListener(CommandListener listener) { this.listener = listener; }
    void render() {
        Browser.beginUI(this instanceof Canvas ? "canvas" : "form", title);
        for (int i = 0; i < commands.size(); i++) Browser.addCommand(i, commands.get(i).label);
    }
}
