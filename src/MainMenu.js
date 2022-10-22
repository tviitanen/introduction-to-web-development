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
    this.load.image("player", "assets/dude.png");
  }

  create() {
    // Title
    let title = this.add
      .sprite(this.scale.width / 1.2, this.scale.height / 2, "title")
      .setOrigin(0.5, 0.4);
    if (title.displayWidth > this.scale.width) {
      title.setScale(0.8);
    }

    this.playerImage = this.add.image(400, 300, "player").setScale(2, 2);

    // add annoying music
    this.bgMusic = this.sound.add("music", { loop: true });
    this.bgMusic.play();

    // animations
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

    // game logo
    let logo = this.add
      .sprite(this.scale.width, this.scale.height, "logo")
      .setOrigin(0.1, 0.8);
    if (logo.width + 40 > this.scale.width - playButton.displayWidth - 40) {
      logo.setScale(
        (this.scale.width - playButton.displayWidth + 200) / logo.width
      );
    }
    // animation
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
