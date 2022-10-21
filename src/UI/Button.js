import Phaser from "phaser";

class Button extends Phaser.GameObjects.Image {
  constructor(x, y, iconID, callback, scene) {
    super(scene, x, y, "buttonUIs", 4 * iconID);
    this.setInteractive({ useHandCursor: true });

    this.on("pointerup", () => {
      this.setFrame(4 * iconID + 1);
    });

    this.on("pointerdown", () => {
      this.setFrame(4 * iconID + 2);

      callback.call(scene);
    });

    this.on("pointerover", () => {
      this.setFrame(4 * iconID + 1);
    });

    this.on("pointerout", () => {
      this.setFrame(4 * iconID);
    });

    scene.add.existing(this);
  }
}

export default Button;
