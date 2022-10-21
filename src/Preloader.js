import Phaser from "phaser";

class Preloader extends Phaser.Scene {
  constructor() {
    super({
      key: "Preloader"
    });
  }

  preload() {
    let logo = this.add
      .sprite(this.scale.width / 2, this.scale.height / 2 - 75, "logo")
      .setOrigin(0.5, 0.5);
    if (logo.width > this.scale.width) {
      logo.setScale(this.scale.width / (logo.width + 50));
    }

    let widthOffset = 50;
    let loadingBar = this.add.nineslice(
      widthOffset,
      this.scale.height / 2 - 64 / 2 + 75,
      this.scale.width - widthOffset * 2,
      64,
      "loadingBar",
      [25, 33]
    );

    let progress = this.add.graphics();
    this.load.on("progress", (value) => {
      progress.clear();
      progress.fillStyle(0xffde00, 1);
      progress.fillRect(
        loadingBar.x + 32,
        loadingBar.y + 10,
        (loadingBar.width - 32 * 2) * value,
        44
      );
    });

    this.load.pack("Preloading", "../assets/pack.json", "Preload");
  }

  create() {
    this.createAnimations();

    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.scene.start("MainMenu");
      this.scene.stop();
    });
    this.cameras.main.fadeOut(250);
  }

  createAnimations() {}
}

export default Preloader;
