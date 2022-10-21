import Phaser from "phaser";

import Button from "./UI/Button";

class MainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: "MainMenu"
    });
  }
  preload() {
    this.load.audio("music", "assets/sounds/music.wav");
  }

  create() {
    let title = this.add
      .sprite(this.scale.width / 2, this.scale.height / 2 - 5, "title")
      .setOrigin(0.5);
    if (title.displayWidth > this.scale.width) {
      title.setScale(this.scale.width / (title.width + 5));
    }

    // add annoying music
    this.bgMusic = this.sound.add("music", { loop: true });
    this.bgMusic.play();

    this.tweens.add({
      targets: title,
      angle: title.angle - 2,
      duration: 1000,
      ease: "Sine.easeInOut"
    });
    this.tweens.add({
      targets: title,
      angle: title.angle + 4,
      duration: 2000,
      ease: "Sine.easeInOut",
      yoyo: 1,
      loop: -1,
      delay: 1000
    });

    let playButton = new Button(
      this.scale.width - 20,
      this.scale.height - 20,
      3,
      this.clickStart,
      this
    ).setOrigin(1, 1);

    playButton.x = this.scale.width + playButton.displayWidth + 20;
    this.tweens.add({
      targets: playButton,
      x: this.scale.width - 20,
      duration: 500,
      ease: "Back"
    });

    let logo = this.add
      .sprite(20, this.scale.height - 50, "logo")
      .setOrigin(0, 1);
    if (logo.width + 40 > this.scale.width - playButton.displayWidth - 40) {
      logo.setScale(
        (this.scale.width - playButton.displayWidth - 40) / (logo.width + 40)
      );
    }
    logo.x = -logo.displayWidth - 20;
    this.tweens.add({ targets: logo, x: 20, duration: 500, ease: "Back" });

    this.cameras.main.fadeIn(250);
  }

  clickStart() {
    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.scene.start("Story");
      this.scene.stop();
    });
    this.cameras.main.fadeOut(250);
  }
}

export default MainMenu;
