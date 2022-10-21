import "./styles.css";
import Phaser from "phaser";

import { Plugin as NineSlicePlugin } from "phaser3-nineslice";
import Boot from "./Boot";
import Preloader from "./Preloader";
import MainMenu from "./MainMenu";
import Story from "./Story";
import Map1 from "./Map1";
import Pause from "./Pause";
import Map2 from "./Map2";

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "game-container",
    width: 800,
    height: 600,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    mode: Phaser.Scale.FIT
  },
  backgroundColor: "#008080",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: [Boot, Preloader, MainMenu, Story, Map1, Map2, Pause],
  plugins: {
    global: [NineSlicePlugin.DefaultCfg]
  }
};

new Phaser.Game(config);
