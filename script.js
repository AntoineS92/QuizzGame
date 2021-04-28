
// =========== PAGE D'ACCUEIL ===============

const playerButton = document.getElementById("button-player");
const playerInput = document.querySelector("#input-player");

let playerList = [];

let playerStorage = localStorage.setItem(playerList);

class Player {
    constructor(name){
        this.name = name;
        this.lives = 3;
        this.currentTurn = false;
    }
}

function addPlayer(){
    const boxValue = playerInput.value;
    console.log("clicked");
    playerList.push(new Player(playerInput.value))
    console.log(playerList);
    playerInput.value = "";
}

console.log(playerButton);
playerButton.addEventListener("click", addPlayer);

// addPlayer("Antoine", 3);
console.log(Player)
console.log(playerList);
console.log(playerStorage)




// =========== PAGE D'ACCUEIL ===============






