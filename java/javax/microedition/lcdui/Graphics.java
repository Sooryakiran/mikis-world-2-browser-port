package javax.microedition.lcdui;

import web.Browser;

public final class Graphics {
    public static final int HCENTER=1, VCENTER=2, LEFT=4, RIGHT=8, TOP=16, BOTTOM=32, BASELINE=64;
    private final int target;
    private int tx,ty,cx,cy,cw,ch,color;
    private Font font=Font.getFont(0,0,0);
    Graphics(int target, int width, int height) { this.target=target; cw=width; ch=height; }
    public void translate(int x, int y) { tx+=x; ty+=y; }
    public int getClipX() { return cx-tx; }
    public int getClipY() { return cy-ty; }
    public int getClipWidth() { return cw; }
    public int getClipHeight() { return ch; }
    public void setClip(int x,int y,int w,int h) { cx=x+tx; cy=y+ty; cw=Math.max(0,w); ch=Math.max(0,h); }
    public void clipRect(int x,int y,int w,int h) {
        int left=Math.max(cx,x+tx), top=Math.max(cy,y+ty);
        cw=Math.max(0,Math.min(cx+cw,x+tx+Math.max(0,w))-left);
        ch=Math.max(0,Math.min(cy+ch,y+ty+Math.max(0,h))-top);
        cx=left; cy=top;
    }
    public void setColor(int r,int g,int b) { color=(r<<16)|(g<<8)|b; }
    public void setFont(Font value) { font=value; }
    public void fillRect(int x,int y,int w,int h) { Browser.rect(target,color,cx,cy,cw,ch,x+tx,y+ty,w,h,false); }
    public void drawRect(int x,int y,int w,int h) { Browser.rect(target,color,cx,cy,cw,ch,x+tx,y+ty,w,h,true); }
    public void drawImage(Image image,int x,int y,int anchor) {
        if ((anchor&RIGHT)!=0) x-=image.getWidth();
        else if ((anchor&HCENTER)!=0) x-=image.getWidth()/2;
        if ((anchor&BOTTOM)!=0) y-=image.getHeight();
        else if ((anchor&VCENTER)!=0) y-=image.getHeight()/2;
        Browser.blit(target,image.id,cx,cy,cw,ch,x+tx,y+ty);
    }
    public void drawString(String text,int x,int y,int anchor) {
        if ((anchor&RIGHT)!=0) x-=font.stringWidth(text);
        else if ((anchor&HCENTER)!=0) x-=font.stringWidth(text)/2;
        if ((anchor&BASELINE)!=0) y-=font.size;
        else if ((anchor&BOTTOM)!=0) y-=font.getHeight();
        Browser.drawText(target,text,color,font.size,font.bold,cx,cy,cw,ch,x+tx,y+ty);
    }
}
