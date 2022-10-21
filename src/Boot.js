import Phaser from "phaser";

class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "Boot"
    });
  }

  preload() {
    this.load.image("logo", "../assets/menu/logo.png");
    this.load.image("loadingBar", "../assets/menu/loadingBarD.png");
  }

  create() {
    this.scene.start("Preloader");
    this.scene.stop();
  }
}

export default Boot;
