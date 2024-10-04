export class Controller {
  static keyPresses: number = 0;

  static initialized: boolean = false;
  static bellPressed: boolean = false;

  static async init() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    const lines = Array.from(document.getElementsByClassName("narrative-line"));
    const openBell = document.getElementById("bell-open");
    const closedBell = document.getElementById("bell-closed");
    const ringAudio: HTMLAudioElement = document.getElementById(
      "bell-ring-audio"
    ) as HTMLAudioElement;

    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("visible");
      }, index * 2000);
    });

    document.addEventListener("keydown", () => {
      if (!this.bellPressed) {
        ++this.keyPresses;
        console.log(this.keyPresses);

        openBell?.classList.add("invisible");
        closedBell?.classList.remove("invisible");
        this.bellPressed = true;

        const newAudio = new Audio("/ding.wav");
        newAudio.load();
        newAudio.play();

        setTimeout(() => {
          openBell?.classList.remove("invisible");
          closedBell?.classList.add("invisible");
          this.bellPressed = false;
        }, 50);
      }
    });
  }

  ringBell() {}
}
