/////////////////////////////////////////////
// Global Variables
/////////////////////////////////////////////
var characters = [],
    gameData = {},
    progressIntHero,
    progressIntEnemy;


/////////////////////////////////////////////
// Initialize Variables
/////////////////////////////////////////////
function varInit() {

    characters = [
        { // PIka
            name: "Pikachu",
            hp: {
                current: 500,
                total: 500
            },
            attack: {
                name: "Pika Lightning",
                damage: randomNum(50, 100)
            },
            image: {
                icon: "./assets/images/pika.png",
                front: "./assets/images/pika-front.gif",
                back: "./assets/images/pika-back.gif"
            }
        }, // End of Pika

        { // Char
            name: "Charmander",
            hp: {
                current: 500,
                total: 500
            },
            attack: {
                name: "Charmander Fire",
                damage: randomNum(50, 100)
            },
            image: {
                icon: "./assets/images/char.png",
                front: "./assets/images/char-front.gif",
                back: "./assets/images/char-back.gif"
            }
        }, // End of Char

        { // Squirtle
            name: "Squirtle",
            hp: {
                current: 500,
                total: 500
            },
            attack: {
                name: "Squirtle Squirt",
                damage: randomNum(50, 100)
            },
            image: {
                icon: "./assets/images/tur.png",
                front: "./assets/images/tur-front.gif",
                back: "./assets/images/tur-back.gif"
            }
        }, // End of Squirt

        { // Bulba
            name: "Bulbasaur",
            hp: {
                current: 500,
                total: 500
            },
            attack: {
                name: "Bulba Bur",
                damage: randomNum(50, 100)
            },
            image: {
                icon: "./assets/images/bulba.png",
                front: "./assets/images/bulba-front.gif",
                back: "./assets/images/bulba-back.gif"
            }
        } // End of Bulba
    ];
    gameData = {
        step: 1,
        hero: {},
        enemy: {}
    };
    progressIntHero = null;
    progressIntEnemy = null;
}

/////////////////////////////////////////////
// Game Functions
/////////////////////////////////////////////
function randomNum(min, max) {
    // generate random number from the range of min to max
    return Math.floor(Math.random() * (max - min) + min);
}

function heroAlignment(name, alignment) {
    if (alignment === "hero") {
        for (i in characters) {
            if (characters[i].name == name) {
                gameData.hero = characters[i];
            }
        }
    } else {
        for (i in characters) {
            if (characters[i].name == name) {
                gameData.enemy = characters[i];
            }
        }
    }

}

function attackTheEnemy() {
    gameData.enemy.hp.current -= gameData.hero.attack.damage;
    //gameData.enemy.hp.current -= 200;

    if (gameData.enemy.hp.current <= 0) {
        //remove dead
        $("#enemy-hp-div").empty();
        $("#enemy-hp-div").removeClass("hp-stat");
        $("#enemy").empty();

        //show character select
        $("#char-select").addClass("char-select");
        $(".char-container").show();

        // change instruction
        $("#instructions").html("<h3>Choose your Enemy!</h3>");

        clearInterval(progressIntEnemy);

        // enemy is dead
        gameData.step = 2;

    } else {
        // enemy is still alive, kill!

        // animate hero
        animateAttack("hero");

        //animate health bar
        progressIntEnemy = setInterval(function () {

            // get the value of enemys health bar
            var val = $("#enemy-progress").val();
            val--;

            // update the health bar value
            $("#enemy-progress").val(val);
            $("#enemy-hp").text(gameData.enemy.hp.current + "/" + gameData.enemy.hp.total);

            // stop animation after the attack
            if (val == gameData.enemy.hp.current) {
                clearInterval(progressIntEnemy);

            }
        }, 1);
    }
    $("#attack-btn").prop("disabled", true);
}

function attackTheHero() {
    $("#attack-btn").prop("disabled", false);

    if (gameData.enemy.hp.current <= 0) {
        gameData.hero.hp.current -= 1;
    } else {
        gameData.hero.hp.current -= gameData.enemy.attack.damage;
    }


    if (gameData.hero.hp.current <= 0) {
        // hero is dead game over
        gameOver();

        //remove dead
        $("#hero-hp-div").empty();
        $("#hero-hp-div").removeClass("hp-stat");
        $("#hero").empty();

        //show character select
        $("#char-select").addClass("char-select");
        $(".char-container").show();

        clearInterval(progressIntHero);
    } else {
        // hero is still alive

        // animate enemy
        animateAttack("enemy");

        //animate health bar
        progressIntHero = setInterval(function () {

            // get the value of enemys health bar
            var val = $("#hero-progress").val();
            val--;

            // update the health bar value
            $("#hero-progress").val(val);
            $("#hero-hp").text(gameData.hero.hp.current + "/" + gameData.hero.hp.total);

            // stop animation after the attack
            if (val == gameData.hero.hp.current) {
                clearInterval(progressIntHero);

            }
        }, 1);
    }
}

function gameOver() {
    //hide remaining characters
    $("#char-select").empty();
    $("#attack-div").empty();
    $("#arena").removeClass("arena-set");
    $("#hero-hp-div").empty();
    $("#hero").empty();
    $("#enemy-hp-div").empty();
    $("#enemy").empty();
    $("#instructions").html("<h2>Game Over!</h2>");
}

function resetGame() {
    // initialize variables
    varInit();

    // clear the arena
    $("#hero-hp-div").empty();
    $("#hero").empty();
    $("#enemy-hp-div").empty();
    $("#enemy").empty();

    // empty characters
    $("#char-select").empty();
    $("#char-select").removeClass("arena-set");

    // update instructions
    $("#instructions").html("<h3>Choose your poke!</h3>");

    populateCharSelect();
    gameData.step = 1;
    startGame();
}

/////////////////////////////////////////////
// Game Interface
/////////////////////////////////////////////
function populateCharSelect() {
    for (i in characters) {
        $("#char-select").append(
            "<div class='char-container justify-content-center align-self-center text-center'><img class='characters img-fluid' src=" + characters[i].image.icon + " alt=" + characters[i].name + " /><h4 class='char-text'>" + characters[i].name + "</h4></div>"
        );
    }
}

function populateArena(container, alignment) {
    var facing = 'front';
    var margin = 'mt-enemy'

    if (alignment == "hero") {
        facing = "back"
        margin = 'mt-hero';
    }

    container.append("<img src=" + gameData[alignment].image[facing] + " class='char-arena " + margin + "' />");
}

function createHPbar(alignment) {

    if (alignment == "hero") {
        $("#hero-hp-div").addClass("hp-stat");
        $("#hero-hp-div").append("<p id='hero-name' class='m-0'>" + gameData.hero.name + "</p><progress id='hero-progress' max='" + gameData.hero.hp.current + "'></progress><div id='hero-hp'></div>");
        $("#hero-hp").text(gameData.hero.hp.current + "/" + gameData.hero.hp.total);
        $("#hero-progress").val(gameData.hero.hp.current);
    } else if (alignment == "enemy") {
        $("#enemy-hp-div").addClass("hp-stat");
        $("#enemy-hp-div").append("<p id='enemy-name' class='m-0'>" + gameData.enemy.name + "</p><progress id='enemy-progress' max='" + gameData.enemy.hp.current + "'></progress><div id='enemy-hp'></div>");
        $("#enemy-hp").text(gameData.enemy.hp.current + "/" + gameData.enemy.hp.total);
        $("#enemy-progress").val(gameData.enemy.hp.current);
    }
}

function showAttackBTN() {
    $("#attack-div").html("<button id='attack-btn' class='btn btn-danger'>Attack that shit!</button>")
}

function animateAttack(who) {
    if (who == "hero") {
        $(".mt-hero").animate(
            {
                'height': '120px'
            },
            50,
            "swing"
        );
        $(".mt-hero").animate(
            {
                'height': '50px'
            },
            50,
            "swing"
        );
        $(".mt-hero").animate(
            {
                'height': '100px'
            },
            50,
            "swing"
        );
    } else {
        $(".mt-enemy").animate(
            {
                'height': '120px'
            },
            50,
            "swing"
        );
        $(".mt-enemy").animate(
            {
                'height': '50px'
            },
            50,
            "swing"
        );
        $(".mt-enemy").animate(
            {
                'height': '100px'
            },
            50,
            "swing"
        );
    }
}

/////////////////////////////////////////////
// Start Game
/////////////////////////////////////////////

function startGame() {
    $(".char-container").on("click", function () {

        // get the image alt name which is a child of .char-container
        var name = $(this).children("img").attr("alt");

        switch (gameData.step) {

            case 1:
                // give the chosen heros to the gameData var
                heroAlignment(name, "hero");

                // remove the image after click
                $(this).remove();

                //create arena then
                $("#arena").addClass("arena-set");
                // move the image to the arena
                populateArena($("#hero"), "hero");
                // add hero hp bar to the arena
                createHPbar("hero");

                // change instruction
                $("#instructions").html("<h3>Choose your Enemy!</h3>");
                gameData.step = 2;
                break;

            case 2:
                // give the character to the gameData var
                heroAlignment(name, "enemy");

                // remove the image after click
                $(this).remove();

                //hide remaining characters
                $("#char-select").removeClass("char-select");
                $(".char-container").hide();

                // move the image to the arena
                populateArena($("#enemy"), "enemy");
                // add enemy hp bar to the arena
                createHPbar("enemy");
                //show attack button
                showAttackBTN();

                // change instructions
                $("#instructions").html("<h3>Fight!</h3>");

                // update game step
                gameData.step = 3;
                break;
        }

    }); // end of characters clicks
};



$("#attack-div").on("click", "#attack-btn", function () {
    attackTheEnemy();

    setTimeout(attackTheHero, 1000);

});

$("#pokemon-logo").on("click", function () {
    resetGame();
});

varInit();
populateCharSelect();
startGame();