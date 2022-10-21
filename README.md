# Introduction to web development

This game is developed for LUT University course 'Introduction to web programming' as final project in autumn 2022.

## BASIC JUMPER

@author tviitanen

In this project, Phaser3 library is used to develop a simple game. There is boot screen, mainmenu. From mainmenu you can start playing by clicking a button.

In game, there is an option for user to pause game and to return to mainmenu (currently not working, game freezes).

### PLOT

In the game, the goal is to collect stars. Each yellow star gives you 10 points. When all yellow stars are collected, new stars are dropped to game. Also, bomb is added to the game. If bomb touches you, it's game over. On the ground, there is an enemy tracking your location and trying to kill you. From red star you can get more points and spawn to a new map, but it is not required to collect (new stars are dropped anyway). Second map has more enemies, but you get more points by collecting stars.

### DEVELOPMENT

Game is created in CodeSandbox, and can be tested straight from

https://codesandbox.io/s/github/tviitanen/introduction-to-web-development

This game is created with vanilla js. Also Phaser 3.55.2 library is used in development. Process included lot of learning and searching since this is my first game project. Filestructure is so that from src-folder you can find all the .js files. In assets folder there is pictures and sounds. Pictures are used for character, enemy, bomb and menu. Sounds are in assets/sounds folder and those are used for in-game audio. There is many scenes/js files, since I wanted to try how to create game with multiple .js files. Also that gives me better play ground if I wish to develop this game even further. Simple phaser-template is used for file-structure, which can be found on phaser documents. Phasers NineSlicePlugin is used for loading bar when starting the game.

Hardest part in development process was probably dealing with the different scenes.

## GRADING

- Report is written carefully and contains all the important staff. 2p
- Game has clear plot and function (collect stars/points). Game gets harder further you keep playing since the amount of bomb increases in each round. 4p
- Application works on most used browsers (Chrome, Firefox, Edge). 2p
- Application is responsible and all the files are not in the same folder (no minus points).
- Application has a logical filestucture good for further development.
- Also code is well commented making it more readable and understandable. 2p.
- There are different kind of enemies/objects which can hurt the player. 3p
- There are sound effects on the game. (Annoying) backgound music, sound when jumping, collecting stars and hitting to enemy/bomb 3p
- There are more than one map. Second map has the same basic idea but is harder to play. 3p
- There are moving platforms on the game (Second map). 3p
- Start screen, bootloader and pause functionality. 2p
- There are different kind of objects to collect with different kind of functionalities. 2p

= TOTAL: 24p

#### TODO:

- Users can get their name on the scoreboard. 3p
- There are different kind of objects to collect with different kind of points and plenty of them. 2p
- Kill an enemy (or destroy bomb?) 2p

#### Bugs:

- Pause.js move to mainmenu is not working
- Enemy sprite spins while aligned whit the player

### SOURCES

https://pablo.gg/en/blog/games/creating-moving-platforms-for-my-phaser-js-game-game-devlog-22/
http://phaser.io/examples/v3/view/scenes/changing-scene
https://codesandbox.io/s/3xdr9?file=/src/MainMenu.js
https://www.thepolyglotdeveloper.com/2020/09/add-music-sounds-other-audio-phaser-game/
https://stackblitz.com/edit/typescript-phaser-scene-data-transfer?file=scenes%2Fgame.ts
