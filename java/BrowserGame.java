import javax.microedition.lcdui.*;
import web.Browser;

public final class BrowserGame {
    public static void main(String[] args) {
        GameMIDlet game = new GameMIDlet();
        Display display = Display.getDisplay(game);
        Browser.bind(
            () -> { game.run(); display.flush(); },
            (key, pressed) -> { display.key(key, pressed != 0); display.flush(); },
            id -> { display.command(id); display.flush(); },
            index -> { display.select(index); display.flush(); },
            (index, value) -> display.text(index, value),
            paused -> {
                if (paused != 0) { game.pauseApp(); game.run(); }
                else game.startApp();
                display.flush();
            },
            () -> "{\"mode\":" + game.browserMode() + ",\"state\":" + game.browserGame().browserState()
                + ",\"x\":" + game.browserGame().browserX() + ",\"y\":" + game.browserGame().browserY() + "}");
        game.startApp();
        display.flush();
    }
}
