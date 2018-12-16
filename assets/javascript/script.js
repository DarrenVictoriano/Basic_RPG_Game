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



/////////////////////////////////////////////
// Game Interface
/////////////////////////////////////////////
function populateCharSelect() {
    for (i in characters) {
        $("#char-select").append(
            "<div class='char-container img-fluid text-center mx-5'><img class='characters' src=" + characters[i].image.icon + " alt=" + characters[i].name + " /><h4 class='char-text'>" + characters[i].name + "</h4></div>"
        );
    }
}

function populateArena(container, alignment) {
    var facing = 'front';

    if (alignment == "hero") {
        facing = "back"
    }

    container.append("<img src=" + gameData[alignment].image[facing] + " />");
}


/////////////////////////////////////////////
// Start Game
/////////////////////////////////////////////
varInit();
populateCharSelect();
$(".characters").on("click", function () {
    var x = $(this).attr("alt");
    for (i in characters) {
        if (characters[i].name == x) {
            gameData.hero = characters[i];
        }
    }
    console.log(gameData.hero.name)
    console.log(gameData.hero.attack[0].name)
});