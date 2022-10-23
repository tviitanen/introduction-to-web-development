# Introduction to web development course project

This game is developed for LUT University course 'Introduction to web programming' as a final project in autumn 2022.

## BASIC JUMPER

@author tviitanen

In this project, the Phaser3 library is used to develop a simple game. There is a boot screen and mainmenu. From mainmenu, you can start playing by clicking a button.

### PLOT

In the game, the goal is to collect stars. Each yellow star gives you 10 points. When all yellow stars are collected, new stars are dropped into the game. Also, bombs and enemies are added to the game. If the bomb touches you, it's game over. On the ground enemies are tracking your location and trying to kill you. You can earn points (30p) if you manage to kill an enemy by jumping over them. If you eat a mushroom, you get sick. The player and enemy movement slows down and the background turns green. Extra effort doesn't go unnoticed. You get double points when sick. From collecting a red star you can get more points (20p) and spawn to a new map, but it is not required to collect (new stars are dropped anyway). The second map has more enemies and is harder to play with moving platforms.

### DEVELOPMENT

The game is created in CodeSandbox, and can be tested straight from

https://codesandbox.io/s/github/tviitanen/introduction-to-web-development

This game is created with vanilla JavaScript. Also, Phaser 3.55.2 library is used in development. The process included a lot of learning and searching since this is my first game project. The file structure is so that from the src-folder you can find all the .js files. In the assets folder, there are pictures and sounds. Pictures are used for characters, enemies, bombs, and menu objects including buttons. Sounds are in the assets/sounds folder and those are used for in-game audio. There are many scenes/js files since I wanted to try how to create a game with multiple .js files/scenes. Also, that gives me a better playground if I wish to develop this game even further. A simple phaser template is used for menu structure, which can be found from sources. Phasers NineSlicePlugin is used for the loadingbar when booting the game. There are also some animations added to the game when changing scenes and on the main menu. There are around 1200 lines of code since this project was a pretty fun thing to do!

### CONTROLS

- Jump: space / down
- Move right: arrow right
- Move left: arrow left
- Go down: arrow down (easier to kill enemies this way)

### IN-GAME OBJECTS

#### Map 1

- Stars
- Red star to move to a next map
- Mushroom
- Enemies
- Bombs
- Platforms

#### Map 2

- Stars
- Red star to move to a next map
- Enemies
- Bombs
- Platforms
- Horizontally moving platform
- Vertically moving platform

### GAME FUNCTIONALITIES

When starting the application loading bar is showing the progress. In the main menu, you can see the game name and start the game by clicking a button. In-game, you can pause the game and after that either continue gaming or return to the main menu. If you lose, the game over-picture is shown, the player changes to red, and the game physics is stopped. Also, a button is added to restart the game. There are some animations like moving pictures and camera fadeouts when changing scenes. The player can kill enemies by jumping over them, and get some points. New enemies are added when all stars are collected. Also, bombs are added to a random location. The player and enemies slow down and the background turns green after eating a mushroom. There is sound when jumping, killing an enemy, collecting stars, moving to the next map, game over, and eating a mushroom. A red star to move to the next map is added after collecting 100 points. In map 2 there are vertically and horizontally moving platforms.

### GRADING

- The report is written carefully and contains all the important stuff. 2p
- The game has a clear plot and function (collect stars/points). The game gets harder further you keep playing since the number of bombs increases in each round. 4p
- The application works on most used browsers (Chrome, Firefox, Edge). 2p
- The application is responsible and all the files are not in the same folder (no minus points).
- Application has a logical file stucture good for further development. Also, code is well commented and uses describing methods and variables making it more readable and more maintainable (and understandable). 2p.
- There are different kinds of enemies/objects which can hurt the player. 3p
- There are sound effects in the game. (Annoying) background music, sound when jumping, collecting stars, moving to the next map, eating mushrooms, and hitting to enemy/bomb 3p
- There is more than one map. The second map has the same basic idea but is harder to play. 3p
- There are moving platforms on the game (Second map) and in the main menu. 3p
- Boot screen, main menu, restart (after the game is over), and pause functionality. 2p
- There are different kinds of objects to collect with different kind of functionalities. 2p
- Kill enemies by jumping over them 2p

= TOTAL: 28/30p

#### TODO:

- Users can get their names on the scoreboard. 3p
- Timer to normalize velocities after 60 seconds after eating mushroom
- Mute annoying background music

#### BUGS:

- Enemy sprite 'spins' while aligned with the player

### SOURCES

https://pablo.gg/en/blog/games/creating-moving-platforms-for-my-phaser-js-game-game-devlog-22/
http://phaser.io/examples/v3/view/scenes/changing-scene
https://codesandbox.io/s/3xdr9?file=/src/MainMenu.js
https://www.thepolyglotdeveloper.com/2020/09/add-music-sounds-other-audio-phaser-game/
https://stackblitz.com/edit/typescript-phaser-scene-data-transfer?file=scenes%2Fgame.ts
