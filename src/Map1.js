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
    this.add.image(400, 300, "sky-img");

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
    this.enemy1 = this.physics.add.sprite(450, 450, "enemy-img");
    // small bounce when character drops to ground
    this.enemy1.setBounce(0.2);
    // collider bounds
    this.enemy1.setCollideWorldBounds(true);

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
    this.physics.add.collider(this.player, this.groupPlatforms);
    this.physics.add.collider(this.groupMushroom, this.groupPlatforms);
    this.physics.add.collider(this.enemy1, this.groupPlatforms);
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
      this.enemy1,
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
  }

  update() {
    /*
    if (this.gameOver) {
      return;
    } */
    if (this.score === 10 && this.redStar === false) {
      this.addRedStar();
    }

    // movement & anim
    if (this.keyboard.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim-left-turn", true);
    } else if (this.keyboard.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim-turn-right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim-static");
    }
    // jump functionality
    // cannot jump if character is not on the ground
    if (this.keyboard.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-300);
      // play jump sound
      this.jumpSound = this.sound.add("jump");
      this.jumpSound.play();
    }

    //enemy1
    // if player to left of enemy AND enemy moving to right (or not moving)
    if (this.player.x < this.enemy1.x && this.enemy1.body.velocity.x >= 0) {
      // move enemy to left
      this.enemy1.body.velocity.x = -40;
      this.enemy1.flipX = true;
    }
    // if player to right of enemy AND enemy moving to left (or not moving)
    else if (
      this.player.x > this.enemy1.x &&
      this.enemy1.body.velocity.x <= 0
    ) {
      // move enemy to right
      this.enemy1.body.velocity.x = 40;
      this.enemy1.flipX = false;
    }
  }

  pausePlay() {
    this.scene.launch("Pause");
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
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    // if all stars are collected
    if (this.groupStars.countActive(true) === 0) {
      this.groupStars.children.iterate(function iterate(star) {
        star.enableBody(true, star.x, 0, true, true);
      });

      let x;
      if (this.player.x < 400) {
        x = Phaser.Math.Between(400, 800);
      } else {
        x = Phaser.Math.Between(0, 400);
      }

      let bomb = this.groupBombs.create(x, 16, "bomb-img");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }
  // start next level
  collectRedStar(player, star) {
    //sound
    this.redStarSound = this.sound.add("levelup");
    this.redStarSound.play();

    star.disableBody(true, true);
    this.score += 20;
    this.scoreText.setText("Score: " + this.score);
    // start new Map
    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.scene.start("Map2", { score: this.score });
      this.scene.stop();
    });
    this.cameras.main.fadeOut(250);
  }

  hitToBomb(player, bomb) {
    // play hit sound
    this.hitSound = this.sound.add("hit");
    this.hitSound.play();
    this.physics.pause();
    //tint player to red
    player.setTint(0xff0000);

    player.anims.play("anim-static");

    // this.gameOver = true;
    // t0 mainmenu
    this.scene.pause();
    this.groupGameOver.create(400, 300, "gameover-img");
  }

  hitToEnemy(player, enemy) {
    // play hitsound
    this.hitSound = this.sound.add("hit");
    this.hitSound.play();
    // pause
    this.physics.pause();
    // tint player to red
    player.setTint(0xff0000);

    player.anims.play("anim-static");

    //this.gameOver = true;

    this.scene.pause();
    this.groupGameOver.create(400, 300, "gameover-img");
  }

  collectMushroom() {
    // TODO
  }
}

export default Map1;
