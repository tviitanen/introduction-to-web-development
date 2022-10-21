import Phaser from "phaser";

class Story extends Phaser.Scene {
  constructor() {
    super({
      key: "Story"
    });
  }

  create() {
    this.scene.start("Map1");
    this.scene.stop();

    // this.scene.start("Map2");
    // this.scene.stop();
  }
}

export default Story;
