import Phaser from "phaser";

import Button from "./UI/Button";

class Map1 extends Phaser.Scene {
  constructor() {
    super({
      key: "Map1"
    });
    this.score = 0;
  }
  preload() {
    this.load.image("mushroom-img", "assets/mushroom.png");
    this.load.image("gameover-img", "assets/gameover.png");
    this.load.audio("hit", "assets/sounds/hit.wav");
    this.load.audio("kill-enemy", "assets/sounds/killenemy.mp3");
    this.load.audio("game-over", "assets/sounds/gameover.wav");
    this.load.audio("belch", "assets/sounds/belch.mp3");
    this.load.audio("jump", "assets/sounds/jump.wav");
    this.load.audio("levelup", "assets/sounds/levelup.mp3");
    this.load.audio("star", "assets/sounds/star.mp3");
    this.load.image("sky-img", "assets/sky.png");
    this.load.image("platform-img", "assets/platform.png");
    this.load.image("star-img", "assets/star.png");
    this.load.image("bomb-img", "assets/bomb.png");
    this.load.spritesheet("player-img", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.spritesheet("enemy-img", "assets/enemy.png", {
      frameWidth: 50,
      frameHeight: 40
    });
  }

  create() {
    // this.gameOver = false;
    this.groupGameOver = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });
    this.cameras.main.fadeIn(250);

    //create background
    this.bgImage = this.add.image(400, 300, "sky-img");

    // create UI
    this.createUI();

    //create platforms
    this.groupPlatforms = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });

    //ground
    this.groupPlatforms.create(50, 584, "platform-img");
    this.groupPlatforms.create(200, 584, "platform-img");
    this.groupPlatforms.create(350, 584, "platform-img");
    this.groupPlatforms.create(500, 584, "platform-img");
    this.groupPlatforms.create(650, 584, "platform-img");
    this.groupPlatforms.create(800, 584, "platform-img");

    // platforms
    this.groupPlatforms.create(600, 490, "platform-img");
    this.groupPlatforms.create(600, 140, "platform-img");
    this.groupPlatforms.create(50, 300, "platform-img");
    this.groupPlatforms.create(50, 120, "platform-img");
    this.groupPlatforms.create(750, 400, "platform-img");
    this.groupPlatforms.create(350, 200, "platform-img");
    this.groupPlatforms.create(800, 270, "platform-img");

    // create player
    this.player = this.physics.add.sprite(100, 450, "player-img");
    // small bounce when character drops to ground
    this.player.setBounce(0.2);
    // collider bounds
    this.player.setCollideWorldBounds(true);

    // create enemy
    this.enemy = this.physics.add.sprite(450, 450, "enemy-img");
    // small bounce when character drops to ground
    this.enemy.setBounce(0.2);
    // collider bounds
    this.enemy.setCollideWorldBounds(true);
    this.enemy.excistance = true;

    // left turn animation
    this.anims.create({
      key: "anim-left-turn",
      frames: this.anims.generateFrameNumbers("player-img", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    // character not moving
    this.anims.create({
      key: "anim-static",
      frames: [{ key: "player-img", frame: 4 }],
      frameRate: 20
    });

    // right turn animation
    this.anims.create({
      key: "anim-turn-right",
      frames: this.anims.generateFrameNumbers("player-img", {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    // input methods
    this.keyboard = this.input.keyboard.createCursorKeys();

    // add stars
    this.groupStars = this.physics.add.group();
    this.groupRedStars = this.physics.add.group();
    this.redStar = false;

    for (let i = 0; i < 10; i++) {
      let x_coordinate = 140 + 70 * i;
      this.groupStars.create(x_coordinate, 10, "star-img");
    }
    // this.groupRedStars.create(70, 10, "star-img").setTint(0xff0000);

    // set random rebound for stars
    this.groupStars.children.iterate(function loopStars(star) {
      var rebound = Phaser.Math.FloatBetween(0.3, 0.6);
      star.setBounceY(rebound);
    });

    // add bombs
    this.groupBombs = this.physics.add.group();

    // add mushroom
    this.groupMushroom = this.physics.add.group();
    this.mushroom = this.groupMushroom.create(70, 200, "mushroom-img");
    this.mushroom.setScale(0.1);
    this.mushroom.setBounceY(0.3);

    // score text
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000000"
    });

    // add colliders
    this.physics.add.collider(
      this.player,
      this.groupPlatforms,
      this.hitToGround,
      null,
      this
    );
    this.physics.add.collider(this.groupMushroom, this.groupPlatforms);
    this.physics.add.collider(this.enemy, this.groupPlatforms);
    this.physics.add.collider(this.groupStars, this.groupPlatforms);
    this.physics.add.collider(this.groupRedStars, this.groupPlatforms);
    this.physics.add.collider(this.groupBombs, this.groupPlatforms);
    this.physics.add.overlap(
      this.player,
      this.groupStars,
      this.collectStar,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.groupRedStars,
      this.collectRedStar,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.groupBombs,
      this.hitToBomb,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.enemy,
      this.hitToEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.groupMushroom,
      this.collectMushroom,
      null,
      this
    );

    // velocities
    this.ENEMY_MAX_V = 50;
    this.PLAYER_MAX_V = 160;
    this.BOMB_MAX_V = 200;

    this.SCORE = 10;
  }

  update() {
    /*
    if (this.gameOver) {
      return;
    } */
    if (this.score >= 100 && this.redStar === false) {
      this.addRedStar();
    }

    // movement & anim
    if (this.keyboard.left.isDown) {
      this.player.setVelocityX(-this.PLAYER_MAX_V);
      this.player.anims.play("anim-left-turn", true);
    } else if (this.keyboard.right.isDown) {
      this.player.setVelocityX(this.PLAYER_MAX_V);
      this.player.anims.play("anim-turn-right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim-static");
    }
    // jump functionality
    // cannot jump if character is not on the ground
    if (
      (this.keyboard.up.isDown || this.keyboard.space.isDown) &&
      this.player.body.touching.down
    ) {
      this.player.setVelocityY(-300);
      // play jump sound
      this.jumpSound = this.sound.add("jump");
      this.jumpSound.play();
    }
    if (this.keyboard.down.isDown) {
      this.player.setVelocityY(500);
    }

    //enemy
    if (this.enemy.excistance) {
      // check excistance
      // if player to left of enemy AND enemy moving to right (or not moving)
      if (this.player.x < this.enemy.x && this.enemy.body.velocity.x >= 0) {
        // move enemy to left
        this.enemy.body.velocity.x = -this.ENEMY_MAX_V;
        this.enemy.flipX = true;
      }
      // if player to right of enemy AND enemy moving to left (or not moving)
      else if (
        this.player.x > this.enemy.x &&
        this.enemy.body.velocity.x <= 0
      ) {
        // move enemy to right
        this.enemy.body.velocity.x = this.ENEMY_MAX_V;
        this.enemy.flipX = false;
      }
    }
  }

  pausePlay() {
    this.sceneKey = "Map1";
    this.scene.launch("Pause", { sceneKey: this.sceneKey });
    this.scene.pause();
  }

  createUI() {
    let pauseButton = new Button(730, 20, 2, this.pausePlay, this).setOrigin(
      0,
      0
    );

    pauseButton.y = -pauseButton.height - 20;
    this.tweens.add({
      targets: pauseButton,
      y: 20,
      duration: 500,
      ease: "back"
    });
  }
  // add red star to level up
  addRedStar() {
    this.groupRedStars.create(70, 10, "star-img").setTint(0xff0000);
    this.redStar = true;
  }

  collectStar(player, star) {
    //sound
    this.starSound = this.sound.add("star");
    this.starSound.play();

    star.disableBody(true, true);
    this.score += this.SCORE;
    this.scoreText.setText("Score: " + this.score);

    // if all stars are collected
    if (this.groupStars.countActive(true) === 0) {
      this.groupStars.children.iterate(function iterate(star) {
        star.enableBody(true, star.x, 0, true, true);
      });
      // add bomb
      let x;
      if (this.player.x < 400) {
        x = Phaser.Math.Between(400, 800);
      } else {
        x = Phaser.Math.Between(0, 400);
      }

      let bomb = this.groupBombs.create(x, 16, "bomb-img");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(
        Phaser.Math.Between(-this.BOMB_MAX_V, this.BOMB_MAX_V),
        20
      );
      bomb.allowGravity = false;
      // create enemy
      this.enemy = this.physics.add.sprite(450, 450, "enemy-img");
      // small bounce when character drops to ground
      this.enemy.setBounce(0.2);
      // collider bounds
      this.enemy.setCollideWorldBounds(true);
      this.enemy.excistance = true;
      this.physics.add.collider(this.enemy, this.groupPlatforms);
      this.physics.add.collider(
        this.player,
        this.enemy,
        this.hitToEnemy,
        null,
        this
      );
    }
  }
  // start next level
  collectRedStar(player, star) {
    //sound
    this.redStarSound = this.sound.add("levelup");
    this.redStarSound.play();

    star.disableBody(true, true);
    this.score += 2 * this.SCORE;
    this.scoreText.setText("Score: " + this.score);
    // start new Map
    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.scene.start("Map2", { score: this.score });
      this.scene.stop();
    });
    this.cameras.main.fadeOut(250);
  }

  hitToBomb(player, bomb) {
    this.gameOver(player);
  }

  hitToEnemy(player, enemy) {
    // kill enemy
    if (enemy.body.touching.up) {
      this.enemy.destroy();
      this.enemy.excistance = false;
      this.score += 3 * this.SCORE;
      this.scoreText.setText("Score: " + this.score);
      this.killSound = this.sound.add("kill-enemy");
      this.killSound.play();
    } else {
      this.gameOver(player);
    }
  }
  gameOver(player) {
    // play hitsound
    this.hitSound = this.sound.add("hit");
    this.hitSound.play();
    // pause
    this.physics.pause();
    // tint player to red
    player.setTint(0xff0000);
    this.gameOverSound = this.sound.add("game-over");
    this.gameOverSound.play();
    player.anims.play("anim-static");

    //this.gameOver = true;
    // this.scene.pause();

    this.groupGameOver.create(400, 300, "gameover-img");

    // add restart button
    let restartButton = new Button(
      this.scale.width - 20,
      this.scale.height - 20,
      3,
      this.clickStart,
      this
    ).setOrigin(1, 1);

    restartButton.x = this.scale.width + restartButton.displayWidth + 20;
    this.tweens.add({
      targets: restartButton,
      x: this.scale.width - 20,
      duration: 500,
      ease: "Back"
    });
  }
  clickStart() {
    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.scene.start("Story");
      this.scene.stop();
    });
    this.cameras.main.fadeOut(250);
  }
  collectMushroom(player, mushroom) {
    mushroom.disableBody(true, true);
    this.mushroomSound = this.sound.add("belch");
    this.mushroomSound.play();
    this.bgImage.setTint(0x86b049);
    this.ENEMY_MAX_V = 25;
    this.PLAYER_MAX_V = 100;
    this.BOMB_MAX_V = 130;
    this.SCORE = 20;

    //TODO

    // normalize after 60s
    // this.time.addEvent({ delay: 60, callback: this.normalizeVelocities() });
    // this.time.delayedCall(60000, this.normalizeVelocities(), [], this)
  }

  normalizeVelocities() {
    this.ENEMY_MAX_V = 50;
    this.PLAYER_MAX_V = 160;
    this.BOMB_MAX_V = 200;
    this.SCORE = 10;
    this.bgImage.clearTint();
  }
}

export default Map1;
