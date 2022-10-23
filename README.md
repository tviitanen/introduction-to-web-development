# Introduction to web development course project

This game is developed for LUT University course 'Introduction to web programming' as final project in autumn 2022.

## BASIC JUMPER

@author tviitanen

In this project, Phaser3 library is used to develop a simple game. There is boot screen, mainmenu. From mainmenu you can start playing by clicking a button.

### PLOT

In the game, the goal is to collect stars. Each yellow star gives you 10 points. When all yellow stars are collected, new stars are dropped to game. Also, bomb and enemies are added to the game. If bomb touches you, it's game over. On the ground, there is enemies tracking your location and trying to kill you. You can earn points (30p) if you manage to kill an enemy by jumping over them. If you eat mushroom, you get sick. Player and enemy movement slows down and background turns green. Extra effort doesn't go unnoticed. You get double points when sick. From collecting a red star you can get more points (20p) and spawn to a new map, but it is not required to collect (new stars are dropped anyway). Second map has more enemies and is harder to play with moving platforms.

### DEVELOPMENT

Game is created in CodeSandbox, and can be tested straight from

https://codesandbox.io/s/github/tviitanen/introduction-to-web-development

This game is created with vanilla JavaScript. Also Phaser 3.55.2 library is used in development. Process included lot of learning and searching since this is my first game project. Filestructure is so that from src-folder you can find all the .js files. In assets folder there is pictures and sounds. Pictures are used for character, enemy, bomb and menu objects including buttons. Sounds are in assets/sounds folder and those are used for in-game audio. There is many scenes/js files, since I wanted to try how to create game with multiple .js files/scenes. Also that gives me better play ground if I wish to develop this game even further. Simple phaser-template is used for menu structure,which can be found from sources. Phasers NineSlicePlugin is used for loadingbar when booting the game. There are also some animations added to game when changing scenes and on the main menu. There is around 1200 lines of code, since this project was pretty fun thing to do!

## CONTROLS

- Jump: space / down
- Move right: arrow right
- Move left: arrow left
- Go down: arrow down (easier to kill enemies this way)

## IN GAME OBJECTS

### Map 1

- Stars
- Red star to move to a next map
- Mushroom
- Enemies
- Bombs
- Platforms

### Map 2

- Stars
- Red star to move to a next map
- Enemies
- Bombs
- Platforms
- Horizontally moving platform
- Vertically moving platform

## GAME FUNCTIONALITIES

When starting application loading bar is showing the progress. In main menu, you can see game name and start game by clicking a button. In game, you can pause the game and after that either continue gaming or return to main menu. If you lose, game over picture is shown, player changes to red and game physics is stopped. Also, button is added to restart game. There is some animations like moving pictures and camera fadeout when changing scenes. Player can kill enemies by jumping over them, and get some points. New enemies are added when all stars are collected. Also bombs are added to a random location. Player and enemies slows down and background turns green after eating a mushroom. There is sound when jumping, killing an enemy, collecting star, moving to next map, game over and eating mushroom. Red star to move to next map is added after collecting 100 poinst. In map 2 there are vertically and horizontally moving platforms.

## GRADING

- Report is written carefully and contains all the important stuff. 2p
- Game has clear plot and function (collect stars/points). Game gets harder further you keep playing since the amount of bomb increases in each round. 4p
- Application works on most used browsers (Chrome, Firefox, Edge). 2p
- Application is responsible and all the files are not in the same folder (no minus points).
- Application has a logical filestucture good for further development. Also code is well commented and uses describing methods and variables making it more readable and more maintainable (and understandable). 2p.
- There are different kind of enemies/objects which can hurt the player. 3p
- There are sound effects on the game. (Annoying) backgound music, sound when jumping, collecting stars, moving to next map, eating mushroom and hitting to enemy/bomb 3p
- There are more than one map. Second map has the same basic idea but is harder to play. 3p
- There are moving platforms on the game (Second map) and in the main menu. 3p
- Boot screen, mainmenu, restart (after game over) and pause functionality. 2p
- There are different kind of objects to collect with different kind of functionalities. 2p
- Kill enemies by jumping over them 2p

= TOTAL: 28/30p

#### TODO:

- Users can get their name on the scoreboard. 3p
- Timer to normalize velocities after 60s after eating mushroom
- Mute annoying background music

#### BUGS:

- Enemy sprite 'spins' while aligned with the player

### SOURCES

https://pablo.gg/en/blog/games/creating-moving-platforms-for-my-phaser-js-game-game-devlog-22/
http://phaser.io/examples/v3/view/scenes/changing-scene
https://codesandbox.io/s/3xdr9?file=/src/MainMenu.js
https://www.thepolyglotdeveloper.com/2020/09/add-music-sounds-other-audio-phaser-game/
https://stackblitz.com/edit/typescript-phaser-scene-data-transfer?file=scenes%2Fgame.ts
