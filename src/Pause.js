import Phaser from "phaser";

import Button from "./UI/Button";

class Pause extends Phaser.Scene {
  constructor() {
    super({
      key: "Pause"
    });
  }

  create(sceneKey) {
    this.sceneKey = sceneKey.sceneKey;

    this.pausedGroup = this.add.group();

    this.pausedBg = this.add.image(0, 0, "overlay");
    this.pausedBg.setAlpha(0.6);
    this.pausedBg.setOrigin(0, 0);
    this.pausedBg.setDisplaySize(this.scale.width, this.scale.height);

    this.menuButton = new Button(
      100,
      this.scale.height / 2,
      12,
      this.goBackToMenu,
      this
    ).setOrigin(0, 1);

    this.continueButton = new Button(
      this.scale.width - 100,
      this.scale.height / 2,
      3,
      this.continue,
      this
    ).setOrigin(1, 1);

    this.pausedGroup.add(this.pausedBg);
    this.pausedGroup.add(this.menuButton);
    this.pausedGroup.add(this.continueButton);
    this.pausedGroup.toggleVisible();

    this.menuButton.x = -this.scale.width - 20;
    this.tweens.add({
      targets: this.menuButton,
      x: 100,
      duration: 500,
      ease: "Back"
    });

    this.continueButton.x =
      this.scale.width + this.continueButton.displayWidth + 20;
    this.tweens.add({
      targets: this.continueButton,
      x: this.scale.width - 100,
      duration: 500,
      ease: "Back"
    });

    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.pausedGroup.toggleVisible();
      this.cameras.main.fadeIn(250);
    });
    this.cameras.main.fadeOut(250);
  }

  continue() {
    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.cameras.main.on("camerafadeincomplete", () => {
        this.scene.stop();
        if (this.sceneKey === "Map1") {
          this.scene.resume("Map1");
        }
        if (this.sceneKey === "Map2") {
          this.scene.resume("Map2");
        }
      });
      this.cameras.main.fadeIn(250);
    });

    this.menuButton.x = 100;
    this.tweens.add({
      targets: this.menuButton,
      x: -this.scale.width - 20,
      duration: 500,
      ease: "Back"
    });

    this.continueButton.x = this.scale.width - 100;
    this.tweens.add({
      targets: this.continueButton,
      x: this.scale.width + this.continueButton.displayWidth + 20,
      duration: 500,
      ease: "Back"
    });
    this.cameras.main.fadeOut(250);
  }

  goBackToMenu() {
    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.scene.start("MainMenu");
      this.scene.stop("Map1");
      this.scene.stop("Map2");
      this.scene.stop();
    });
    this.cameras.main.fadeOut(250);
  }
}

export default Pause;
