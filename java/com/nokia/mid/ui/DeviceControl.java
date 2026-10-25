package com.nokia.mid.ui;

import web.Browser;

public final class DeviceControl {
    // Browser displays have no application-controlled phone backlight.
    public static void setLights(int number,int level) { }
    public static void startVibra(int intensity,long duration) { Browser.vibrate((int)Math.min(duration,10000)); }
    public static void stopVibra() { Browser.vibrate(0); }
}
