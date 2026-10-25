package javax.microedition.lcdui;

import java.io.IOException;
import web.Browser;

public final class Image {
    final int id;
    private final boolean mutable;
    private Image(int id, boolean mutable) { this.id=id; this.mutable=mutable; }
    public static Image createImage(String path) throws IOException {
        int id=Browser.image(path.startsWith("/") ? path.substring(1) : path);
        if (id<0) throw new IOException("Missing image: "+path);
        return new Image(id,false);
    }
    public static Image createImage(int width, int height) {
        if (width<=0 || height<=0) throw new IllegalArgumentException("Image dimensions");
        return new Image(Browser.surface(width,height),true);
    }
    public int getWidth() { return Browser.dimension(id,0); }
    public int getHeight() { return Browser.dimension(id,1); }
    public Graphics getGraphics() {
        if (!mutable) throw new IllegalStateException("Immutable image");
        return new Graphics(id,getWidth(),getHeight());
    }
}
