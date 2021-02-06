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
    var enemy1PositionY = parseInt(Math.random() * 330);

    function loop() {
        moveBackground();
        movePlayer();
        moveEnemy1();
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

    game.timer = setInterval(loop, 30);

}