package javax.microedition.lcdui;

import java.util.ArrayList;
import web.Browser;

public class Form extends Screen {
    final java.util.List<Object> items = new ArrayList<>();
    public Form(String title) { this.title=title; }
    public int append(String value) { items.add(value); Display.dirty=true; return items.size()-1; }
    public int append(Item value) { items.add(value); Display.dirty=true; return items.size()-1; }
    public void delete(int index) { items.remove(index); Display.dirty=true; }
    public int size() { return items.size(); }
    @Override void render() {
        super.render();
        for (int i=0; i<items.size(); i++) {
            Object item=items.get(i);
            if (item instanceof TextField field) Browser.addField(i,field.label,field.value,field.max);
            else Browser.addText((String)item);
        }
    }
}
