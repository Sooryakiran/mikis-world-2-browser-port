package com.nokia.mid.sound;

import web.Browser;
import web.Resources;

public final class Sound {
    private final int id;
    public Sound(byte[] data,int format) {
        if (format!=1) throw new IllegalArgumentException("Only Nokia OTT tones are supported");
        id=Browser.sound(Resources.binary(data));
    }
    public void play(int repeats) { Browser.playSound(id,repeats); }
    public void stop() { Browser.stopSound(id); }
}
