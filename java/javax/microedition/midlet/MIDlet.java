package javax.microedition.midlet;

import web.Browser;

public abstract class MIDlet {
    protected abstract void startApp();
    protected abstract void pauseApp();
    protected abstract void destroyApp(boolean unconditional);
    public final void notifyDestroyed() { Browser.exit(); }
}
