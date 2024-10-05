const ENDGAME_SCORE = 420;

export class Controller {
  static keyPresses: number = 0;

  static initialized: boolean = false;
  static bellPressed: boolean = false;
  static frameVisible: boolean = false;

  static _elements: {
    openBell: HTMLElement;
    closedBell: HTMLElement;
    ringAudio: HTMLAudioElement;
    score: HTMLElement;
    guy: HTMLElement;
    speechBubble: HTMLElement;
  } | null = null;

  static async init() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    const lines = Array.from(document.getElementsByClassName("narrative-line"));

    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("visible");
      }, index * 2500);
    });

    setTimeout(() => {
      const listener = () => {
        document.getElementById("narrative")!.classList.add("invisible");
        document.getElementById("frame")!.classList.remove("invisible");
        this.frameVisible = true;

        window.removeEventListener("keydown", listener);
      };

      window.addEventListener("keydown", listener);
    }, (lines.length - 1) * 3000);

    document.addEventListener("keydown", () => {
      this.ringBell();
    });
  }

  static get elements() {
    if (!this._elements) {
      this._elements = {
        openBell: document.getElementById("bell-open")!,
        closedBell: document.getElementById("bell-closed")!,
        ringAudio: document.getElementById(
          "bell-ring-audio"
        ) as HTMLAudioElement,
        score: document.getElementById("score")!,
        guy: document.getElementById("guy-and-speech")!,
        speechBubble: document.getElementById("guy-speech-bubble")!,
      };
    }

    return this._elements;
  }

  static ringBell() {
    if (!this.frameVisible) {
      return;
    }
    if (this.keyPresses >= ENDGAME_SCORE) {
      return;
    }

    if (!this.bellPressed) {
      if (this.keyPresses === ENDGAME_SCORE - 1) {
        this.incrementScore();
        this.endGame();
        return;
      }

      this.incrementScore();

      this.elements.openBell.classList.add("invisible");
      this.elements.closedBell.classList.remove("invisible");
      this.bellPressed = true;

      const newAudio = new Audio("/ding.wav");
      newAudio.load();
      newAudio.play();

      setTimeout(() => {
        this.elements.openBell.classList.remove("invisible");
        this.elements.closedBell.classList.add("invisible");
        this.bellPressed = false;
      }, 50);
    }
  }

  static incrementScore() {
    ++this.keyPresses;
    this.elements.score.innerHTML = this.keyPresses.toString();

    const interval = Math.ceil(ENDGAME_SCORE / 10);

    // accelerate user input feedback
    if (this.keyPresses === 20) {
      this.elements.score.classList.add(`score-0x`);
    }

    if (this.keyPresses % interval === 0) {
      const multiple = this.keyPresses / interval;
      this.elements.score.classList.remove(`score-${multiple - 1}x`);
      this.elements.score.classList.add(`score-${multiple}x`);
    }

    this.elements.score.classList.add("offset");
    setTimeout(() => {
      this.elements.score.classList.remove("offset");
    }, 16);
  }

  static endGame() {
    const GUY_APPEARANCE_TIME = 5 * 1000;

    this.elements.guy.classList.remove("invisible");
    this.elements.score.classList.add("invisible");

    setTimeout(() => {
      this.elements.speechBubble.innerText = "Goodbye.";
    }, GUY_APPEARANCE_TIME - 1500);

    setTimeout(() => {
      this.elements.guy.classList.add("invisible");
    }, GUY_APPEARANCE_TIME - 100);

    setTimeout(() => {
      // intentionally crash the browser
      const newArray = [...Array(2 ** 32 - 1)].map((_) =>
        Math.ceil(Math.random() * 111)
      );
    }, GUY_APPEARANCE_TIME);
  }
}
