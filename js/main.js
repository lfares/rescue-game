function start() {
    $("#start").hide();

    $("#background-game").append("<div id='player' class='animation-player'></div>");
    $("#background-game").append("<div id='enemy1' class='animation-enemy1'></div>");
    $("#background-game").append("<div id='enemy2'></div>");
    $("#background-game").append("<div id='friend' class='animation-friend'></div>");

    // Declaration of variables
    var game = {}
    var keywords = {
        up: 38,
        down: 40,
        shoot: 83
    }
    var enemy1Velocity = 5;
    var enemy2Velocity = 3;
    var friendVelocity = 1;
    var shootVelocity = 10;
    var enemy1PositionY = parseInt(Math.random() * 330);
    var canShoot = true;

    function loop() {
        moveBackground();
        movePlayer();
        moveEnemy1();
        moveEnemy2();
        moveFriend();
    }
    
    function moveBackground() {
        left = parseInt($("#background-game").css("background-position"));
        $("#background-game").css("background-position", left-1);
    }
    // Check if any key is pressed
    game.keywordPress = [];
    $(document).keydown(function(e){
        game.keywordPress[e.which] = true;
    });
    $(document).keyup(function(e){
        game.keywordPress[e.which] = false;
    });

    function movePlayer() {
        if (game.keywordPress[keywords.up]) {
            var top = parseInt($("#player").css("top"));
            $("#player").css("top", top-10);
            if (top <= 0) { // let the player inside the container of game
                $("#player").css("top", top+10);
            }
        }

        if (game.keywordPress[keywords.down]) {
            var top = parseInt($("#player").css("top"));
            $("#player").css("top", top+10);
            if (top >= 410) { // let the player inside the container of game
                $("#player").css("top", top-10);
            }
        }

        if (game.keywordPress[keywords.shoot]) {
            shoot();
        }
    }

    function shoot() {
        if (canShoot == true) {
            canShoot = false;

            playerY = parseInt($("#player").css("top"));
            playerX = parseInt($("#player").css("left"));
            shootY = playerY + 37;
            shootX = playerX + 190;

            $("#background-game").append("<div id='shoot'></div>");
            $("#shoot").css("top", shootY);
            $("#shoot").css("left", shootX);

            var timeShooting = window.setInterval(executeShooting, 30);
        }
        function executeShooting() {
            shootX = parseInt($("#shoot").css("left"));
            $("#shoot").css("left", shootX+shootVelocity);
    
            if (shootX > 900) {
                window.clearInterval(timeShooting);
                timeShooting = null;
                $("#shoot").remove();
                canShoot = true;
            }
        }
    }

    function moveEnemy1() {
        positionX = parseInt($("#enemy1").css("left"));
        $("#enemy1").css("left", positionX-enemy1Velocity);
        $("#enemy1").css("top", enemy1PositionY);

        if (positionX <= 150) {
            $("#enemy1").css("left", 694);
            // Restart position y
            enemy1PositionY = parseInt(Math.random() * 330);
            $("#enemy1").css("top", enemy1PositionY);
        }
    }

    function moveEnemy2() {
        positionX = parseInt($("#enemy2").css("left"));
        $("#enemy2").css("left", positionX-enemy2Velocity);

        if (positionX <= 150) {
            $("#enemy2").css("left", 755);
        }
    }

    function moveFriend() {
        positionX = parseInt($("#friend").css("left"));
        $("#friend").css("left", positionX+friendVelocity);

        if (positionX > 906) {
            $("#friend").css("left", 0);
        }
    }

    game.timer = setInterval(loop, 30);

}