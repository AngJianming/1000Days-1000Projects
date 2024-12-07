// main.js

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: '#87CEEB', // Sky blue background
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 }, // Gravity strength
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initialize the game
const game = new Phaser.Game(config);

// Game variables
let player1;
let player2;
let cursors; // For Player 2 (Arrow Keys)
let keys;     // For Player 1 (S, E, D, F) and additional keys
let stoneGroup;

// Health values
let health1 = 100;
let health2 = 100;

// Preload assets
function preload() {
    // Load player sprites
    this.load.image('player1', 'assets/player1.png'); // Player 1 sprite
    this.load.image('player2', 'assets/player2.png'); // Player 2 sprite
    
    // Load stone sprite
    this.load.image('stone', 'assets/stone.png');     // Stone sprite
    
    // Load ground sprite
    this.load.image('ground', 'assets/ground.png');   // Ground sprite
    
    // (Optional) Load sound effects
    // this.load.audio('jump', 'assets/sounds/jump.mp3');
    // this.load.audio('throw', 'assets/sounds/throw.mp3');
    // this.load.audio('hit', 'assets/sounds/hit.mp3');
}

// Create game objects
function create() {
    // Add ground
    const ground = this.physics.add.staticGroup();
    ground.create(500, 590, 'ground').setScale(2).refreshBody(); // Positioned at bottom center

    // Add Player 1
    player1 = this.physics.add.sprite(150, 450, 'player1').setScale(0.5);
    player1.setBounce(0.1);
    player1.setCollideWorldBounds(true);
    this.physics.add.collider(player1, ground);

    // Add Player 2
    player2 = this.physics.add.sprite(850, 450, 'player2').setScale(0.5);
    player2.setBounce(0.1);
    player2.setCollideWorldBounds(true);
    this.physics.add.collider(player2, ground);

    // (Optional) Add sound effects
    // this.jumpSound = this.sound.add('jump');
    // this.throwSound = this.sound.add('throw');
    // this.hitSound = this.sound.add('hit');

    // Set up controls
    cursors = this.input.keyboard.createCursorKeys(); // Player 2: Arrow Keys

    // Define additional keys for Player 1 and Player 2
    keys = this.input.keyboard.addKeys({
        // Player 1 Controls
        p1_left: Phaser.Input.Keyboard.KeyCodes.S,     // Move Left
        p1_right: Phaser.Input.Keyboard.KeyCodes.F,    // Move Right
        p1_jump: Phaser.Input.Keyboard.KeyCodes.E,     // Jump
        p1_moveDown: Phaser.Input.Keyboard.KeyCodes.D, // Move Down
        p1_throw: Phaser.Input.Keyboard.KeyCodes.SPACE, // Auto Throw Stone

        // Player 2 Throw Key
        p2_throw: Phaser.Input.Keyboard.KeyCodes.SLASH  // Auto Throw Stone ("/" key)
    });

    // Create group for stones
    stoneGroup = this.physics.add.group();

    // Collision between stones and players
    this.physics.add.overlap(stoneGroup, player1, hitPlayer1, null, this);
    this.physics.add.overlap(stoneGroup, player2, hitPlayer2, null, this);

    // Add ground to physics for stones
    this.physics.add.collider(stoneGroup, ground, stoneHitGround, null, this);

    // Initialize health bars
    createHealthBars();
}

// Update loop
function update() {
    // --- Player 1 Controls (S, E, D, F) ---
    // Move Left (S)
    if (keys.p1_left.isDown) {
        player1.setVelocityX(-300);
    }
    // Move Right (F)
    else if (keys.p1_right.isDown) {
        player1.setVelocityX(300);
    }
    else {
        player1.setVelocityX(0);
    }

    // Jump (E)
    if (keys.p1_jump.isDown && player1.body.touching.down) {
        player1.setVelocityY(-400);
        // (Optional) Play jump sound
        // this.jumpSound.play();
    }

    // Move Down (D)
    if (keys.p1_moveDown.isDown) {
        player1.setVelocityY(200); // Move downwards
    }

    // Throw Stone (Spacebar)
    if (Phaser.Input.Keyboard.JustDown(keys.p1_throw)) {
        throwStone(this, player1, 'right'); // Player 1 throws towards Player 2 (right)
        // (Optional) Play throw sound
        // this.throwSound.play();
    }

    // --- Player 2 Controls (Arrow Keys) ---
    // Movement flags
    let p2MovingLeft = false;
    let p2MovingRight = false;
    let p2Jump = false;
    let p2MoveDown = false;

    // Arrow Keys for Player 2
    if (cursors.left.isDown) {
        p2MovingLeft = true;
    }
    if (cursors.right.isDown) {
        p2MovingRight = true;
    }
    if (cursors.up.isDown && player2.body.touching.down) {
        p2Jump = true;
    }
    if (cursors.down.isDown) {
        p2MoveDown = true;
    }

    // Apply Movement for Player 2
    if (p2MovingLeft) {
        player2.setVelocityX(-300);
    }
    else if (p2MovingRight) {
        player2.setVelocityX(300);
    }
    else {
        player2.setVelocityX(0);
    }

    // Apply Jump for Player 2
    if (p2Jump) {
        player2.setVelocityY(-400);
        // (Optional) Play jump sound
        // this.jumpSound.play();
    }

    // Apply Move Down for Player 2 (e.g., crouch or drop)
    if (p2MoveDown) {
        player2.setVelocityY(200); // Move downwards
    }

    // Throw Stone for Player 2 ("/" key)
    if (Phaser.Input.Keyboard.JustDown(keys.p2_throw)) {
        throwStone(this, player2, 'left'); // Player 2 throws towards Player 1 (left)
        // (Optional) Play throw sound
        // this.throwSound.play();
    }
}

// Function to throw stone
function throwStone(scene, player, direction) {
    // Create stone at player's position
    const stone = stoneGroup.create(player.x, player.y - 50, 'stone').setScale(0.5);
    stone.setBounce(0.2);
    stone.setCollideWorldBounds(true);
    stone.body.onWorldBounds = true;

    // Set velocity based on direction
    if (direction === 'left') {
        stone.setVelocityX(-500);
    } else if (direction === 'right') {
        stone.setVelocityX(500);
    }

    // Optional: Add gravity to stones
    stone.setGravityY(0); // Stones follow a straight path

    // Add lifespan to stone (destroy after 3 seconds)
    scene.time.delayedCall(3000, () => {
        if (stone.active) {
            stone.destroy();
        }
    }, [], scene);
}

// Handle stone hitting Player 1
function hitPlayer1(stone, player) {
    stone.destroy();
    health1 -= 10;
    updateHealthBar('player1', health1);
    // (Optional) Play hit sound
    // this.hitSound.play();
    checkGameOver();
}

// Handle stone hitting Player 2
function hitPlayer2(stone, player) {
    stone.destroy();
    health2 -= 10;
    updateHealthBar('player2', health2);
    // (Optional) Play hit sound
    // this.hitSound.play();
    checkGameOver();
}

// Handle stone hitting the ground
function stoneHitGround(stone, ground) {
    stone.destroy();
}

// Update health bars
function updateHealthBar(playerId, health) {
    const healthBar = document.getElementById(`health-bar-${playerId}`);
    const healthText = document.getElementById(`health-text-${playerId}`);

    // Ensure health doesn't drop below 0
    if (health < 0) health = 0;

    if (playerId === 'player1') {
        healthBar.style.width = `${health * 2}px`; // 100 * 2 = 200px max
        if (health > 60) {
            healthBar.style.background = 'green';
        } else if (health > 30) {
            healthBar.style.background = 'orange';
        } else {
            healthBar.style.background = 'red';
        }
    } else if (playerId === 'player2') {
        healthBar.style.width = `${health * 2}px`; // 100 * 2 = 200px max
        if (health > 60) {
            healthBar.style.background = 'green';
        } else if (health > 30) {
            healthBar.style.background = 'orange';
        } else {
            healthBar.style.background = 'red';
        }
    }

    // (Optional) Update health text if implemented
    // if (healthText) {
    //     healthText.innerText = `${health}/100`;
    // }
}

// Check for game over
function checkGameOver() {
    if (health1 <= 0) {
        alert('Player 2 Wins!');
        resetGame();
    }
    if (health2 <= 0) {
        alert('Player 1 Wins!');
        resetGame();
    }
}

// Reset game
function resetGame() {
    health1 = 100;
    health2 = 100;
    updateHealthBar('player1', health1);
    updateHealthBar('player2', health2);

    player1.setPosition(150, 450);
    player2.setPosition(850, 450);

    stoneGroup.clear(true, true);
}

// Create health bars
function createHealthBars() {
    const healthBarsContainer = document.getElementById('health-bars');

    // Player 1 Health Bar
    const p1HealthContainer = document.createElement('div');
    p1HealthContainer.className = 'health-bar-container';

    const p1HealthBar = document.createElement('div');
    p1HealthBar.id = 'health-bar-player1';
    p1HealthBar.className = 'health-bar';

    // (Optional) Add health text
    // const p1HealthText = document.createElement('div');
    // p1HealthText.id = 'health-text-player1';
    // p1HealthText.style.position = 'absolute';
    // p1HealthText.style.left = '20px';
    // p1HealthText.style.top = '10px';
    // p1HealthText.style.color = 'white';
    // p1HealthText.style.fontSize = '16px';
    // p1HealthText.innerText = `${health1}/100`;
    // p1HealthContainer.appendChild(p1HealthText);

    p1HealthContainer.appendChild(p1HealthBar);
    healthBarsContainer.appendChild(p1HealthContainer);

    // Player 2 Health Bar
    const p2HealthContainer = document.createElement('div');
    p2HealthContainer.className = 'health-bar-container';

    const p2HealthBar = document.createElement('div');
    p2HealthBar.id = 'health-bar-player2';
    p2HealthBar.className = 'health-bar';

    // (Optional) Add health text
    // const p2HealthText = document.createElement('div');
    // p2HealthText.id = 'health-text-player2';
    // p2HealthText.style.position = 'absolute';
    // p2HealthText.style.right = '20px';
    // p2HealthText.style.top = '10px';
    // p2HealthText.style.color = 'white';
    // p2HealthText.style.fontSize = '16px';
    // p2HealthText.innerText = `${health2}/100`;
    // p2HealthContainer.appendChild(p2HealthText);

    p2HealthContainer.appendChild(p2HealthBar);
    healthBarsContainer.appendChild(p2HealthContainer);
}
