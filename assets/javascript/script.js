/////////////////////////////////////////////
// Global Variables
/////////////////////////////////////////////
var characters = [],
    gameData = {};


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
            attack: [
                {
                    name: "Pika Lightning",
                    damage: randomNum(20, 50)
                }
            ],
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
            attack: [
                {
                    name: "Charmander Fire",
                    damage: randomNum(20, 50)
                }
            ],
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
            attack: [
                {
                    name: "Squirtle Squirt",
                    damage: randomNum(20, 50)
                }
            ],
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
            attack: [
                {
                    name: "Bulba Bur",
                    damage: randomNum(20, 50)
                }
            ],
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
    }
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
    } else if (alignment == "enemy") {
        $("#enemy-hp-div").addClass("hp-stat");
        $("#enemy-hp-div").append("<p id='enemy-name' class='m-0'>" + gameData.enemy.name + "</p><progress id='enemy-progress' max='" + gameData.enemy.hp.current + "'></progress><div id='enemy-hp'></div>");
        $("#enemy-hp").text(gameData.enemy.hp.current + "/" + gameData.enemy.hp.total);

    }
}

function showAttackBTN() {
    $("#attack-div").append("<button id='attack-btn' class='btn btn-danger'>Attack that shit!</button>")
}


/////////////////////////////////////////////
// Start Game
/////////////////////////////////////////////
varInit();
populateCharSelect();

$(".char-container").on("click", function () {

    // get the image alt name which is a child of .char-container
    var name = $(this).children("img").attr("alt");

    switch (gameData.step) {

        case 1:
            // give the character to the gameData var
            heroAlignment(name, "hero");

            // remove the image after click
            $(this).remove();

            //create arena then
            $("#arena").addClass("arena-set");
            // move the image to the arena
            populateArena($("#hero"), "hero");
            // add hero hp bar to the arena
            createHPbar("hero");

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
    }


    console.log(gameData.hero.name)
    console.log(gameData.hero.attack[0].name)

    console.log(gameData.enemy.name)
    console.log(gameData.enemy.attack[0].name)
});