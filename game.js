// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var numVidas = 3;
var winningScore = 100;

function aleat(){
  var min = 12; var max=550;
  return Math.random() * (max - min) + min;
}

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(aleat(), aleat(), 'coin');
  createItem(aleat(), aleat(), 'poison');
  createItem(aleat(), aleat(), 'coin');

  createItem(aleat(), aleat(), 'coin');

  createItem(aleat(), aleat(), 'poison');

  createItem(aleat(), aleat(), 'coin');

  createItem(aleat(), aleat(), 'coin');
  createItem(aleat(), aleat(), 'coin');

  createItem(aleat(), aleat(), 'coin');

  createItem(aleat(), aleat(), 'coin');

  createItem(aleat(), aleat(), 'poison');

  createItem(aleat(), aleat(), 'star');
}


// add platforms to the game
// de las mas cercanas al suelo hacia arriba
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(80, 550, 'platform');
  platforms.setAll('body.immovable', true);
  
  platforms.create(450, 550, 'platform');
  platforms.setAll('body.immovable', true);

  platforms.create(270, 465, 'platform2');
  platforms.setAll('body.immovable', true);

  platforms.create(390, 365, 'platform2');
  platforms.setAll('body.immovable', true);

  platforms.create(50, 285, 'platform');
  platforms.setAll('body.immovable', true);

  platforms.create(650, 285, 'platform');
  platforms.setAll('body.immovable', true);

  platforms.create(150, 235, 'platform');
  platforms.setAll('body.immovable', true);

  platforms.create(500, 165, 'platform2');
  platforms.setAll('body.immovable', true);

  platforms.create(220, 135, 'platform');
  platforms.setAll('body.immovable', true);

  platforms.create(75, 65, 'platform2');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if(item.key==='coin'){
    currentScore = currentScore + 10;
  }
  else if(item.key==='poison'){
    numVidas --;
  }
  else if(item.key==='star'){
    currentScore = currentScore + 20;
  }
  if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    //game.stage.backgroundColor = '#5db1ad';
    game.load.image('fondo', 'plataformas.png');

    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');

    //Load spritesheets
    game.load.spritesheet('player', 'mikethefrog.png', 32, 32);
    game.load.spritesheet('coin', 'coin.png', 36, 44);

    game.load.spritesheet('star', 'star.png', 32, 32);
    game.load.spritesheet('poison', 'poison.png', 32, 32);

    game.load.spritesheet('badge', 'badge.png', 42, 54);
  }

  // initial game set up
  function create() {
    var background = game.add.sprite(0, 0, 'fondo', 'background');

    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    textVidas = game.add.text(690, 16, "LIVES: " + numVidas, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    textVidas.text = "LIVES: " + numVidas;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
    if(numVidas==0){
      winningMessage.text = "YOU DEAD :P";
    }
  }

  function render() {

  }

};
