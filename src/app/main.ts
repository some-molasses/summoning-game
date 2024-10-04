export class Controller {
  static keyPresses: number = 0;

  static initialized: boolean = false;
  static bellPressed: boolean = false;

  static _elements: {
    openBell: HTMLElement;
    closedBell: HTMLElement;
    ringAudio: HTMLAudioElement;
    score: HTMLElement;
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
      }, index * 2000);
    });

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
      };
    }

    return this._elements;
  }

  static ringBell() {
    if (!this.bellPressed) {
      ++this.keyPresses;

      this.elements.score.innerHTML = this.keyPresses.toString();

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
}
