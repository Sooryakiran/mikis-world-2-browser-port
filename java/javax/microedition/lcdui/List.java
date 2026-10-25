package javax.microedition.lcdui;

import java.util.ArrayList;
import web.Browser;

public class List extends Screen {
    public static final int IMPLICIT=3;
    public static final Command SELECT_COMMAND = new Command("Select", Command.ITEM, 0);
    private final java.util.List<String> items=new ArrayList<>();
    private int selected=-1;
    public List(String title, int type) { this.title=title; }
    public int append(String value, Image image) {
        items.add(value); if (selected<0) selected=0; Display.dirty=true; return items.size()-1;
    }
    public void delete(int index) {
        items.remove(index); selected=Math.min(selected,items.size()-1); Display.dirty=true;
    }
    public int size() { return items.size(); }
    public int getSelectedIndex() { return selected; }
    public void setSelectedIndex(int index) {
        if (index<0 || index>=items.size()) throw new IllegalArgumentException("List selection");
        selected=index; Display.dirty=true;
    }
    @Override void render() {
        super.render();
        for (int i=0; i<items.size(); i++) Browser.addOption(i,items.get(i),i==selected);
    }
}
