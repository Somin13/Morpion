// Initialisation du plateau de jeu avec un tableau 2D représentant une grille vide de 3x3
let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];


let playerTour = 'X'; // Définit le joueur actuel ("X" ou "O"). "X" commence toujours.
let cpuMode = false
let messageGame = document.querySelector("#message");
let lock = false;
let gameOver = false

//--------- Bouton commencé

let startBtn = document.querySelector("#start-button").addEventListener("click", () => {
    document.querySelector("#morpion").style.display = "grid";
    startBtn.style.display = "none"
    displayBoard()
})



//--------- Fonction pour permettre à l'ordinateur de jouer un coup en tant que joueur "O"
function choiceGame() {
    let playerChoice = document.createElement("button"); // ajout de 'document'
    playerChoice.textContent = "Player vs Player";
    playerChoice.classList.add("buttonChoix");
    messageGame.appendChild(playerChoice);
    playerChoice.addEventListener("click", () => {
        cpuMode = false
        makeMove()
    })

    let randomChoice = document.createElement("button");
    randomChoice.textContent = " Player vs IA";
    randomChoice.classList.add("ButtonChoix");
    messageGame.appendChild(randomChoice);
    randomChoice.addEventListener("click", () => {
        cpuMode = true
        makeMove()
    }) 
}

function playerRandom() {
    let emptyCells = [];

    // Parcourt le plateau pour trouver les cellules vides
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === ' ') {
                // Ajoute les coordonnées sous forme de tableau [row, col]
                emptyCells.push([row, col]);
            }
        }
    }
    
    const randomIndex = Math.floor(Math.random() * emptyCells.length); // Choisit une cellule vide au hasard
    const [chosenRow, chosenCol] = emptyCells[randomIndex]; // Récupère directement les coordonnée
   

    setTimeout(() => {
        makeMove(chosenRow, chosenCol);
    }, 300);
}

// Fonction pour effectuer un mouvement dans une cellule spécifique
function makeMove(row, col) {
    if (gameOver) return;
    
    if (board[row][col] === ' ') { // Vérifie si la cellule est vide avant d'effectuer le mouvement
        board[row][col] = playerTour; // Place le symbole du joueur actuel dans la cellule
    
        displayBoard(); // Met à jour l'affichage du plateau

        
        if (checkWin(playerTour)) { // Vérifie si le joueur actuel a gagné après son mouvement
            messageGame.textContent = ("Le joueur " + playerTour + " a gagné !"); // Affiche un message de victoire
            resetGame(); // Réinitialise le jeu après une victoire
            gameOver = true;
            return;
            
        }

        
        if (checkDraw()) { // Vérifie si la partie est un match nul (aucune case vide restante)
            messageGame.textContent = ("Match nul !"); // Affiche un message de match nul
            gameOver = true;
            return;
        }

        playerTour = (playerTour === 'X') ? 'O' : 'X'; // Passe au tour de l'autre joueur

        if (playerTour === 'O' && cpuMode === true) { // Si c'est le tour de l'ordinateur ("O"), appelle `makeAIMove`
            playerRandom();
            
        }
    }
}


function checkWin(player) {
    for (let row = 0; row < board.length; row++) { 
        if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
            gameOver = true;
            return true; // Retourne true si victoire sur une ligne
        }
    }

    for (let col = 0; col < board.length; col++) { 
        if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
            gameOver = true;
            return true; // Retourne true si victoire sur une colonne
        }
    }

    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) { 
        gameOver = true;
        return true; // Retourne true si victoire sur la diagonale principale
    }

    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        gameOver = true;
        return true; // Retourne true si victoire sur la diagonale secondaire
    }
    
    return false; // Retourne false si aucune combinaison gagnante n'est trouvée
}

// Fonction pour vérifier si le plateau est plein (c'est-à-dire un match nul)
function checkDraw() {
    // Parcourt toutes les cellules du plateau
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            // Si une cellule est vide, retourne faux (le jeu n'est pas terminé)
            if (board[row][col] === ' ') {
                return false;
            }
        }
    }
    return true; // Si aucune cellule vide, retourne vrai (match nul)
}

// Fonction pour afficher le plateau de jeu dans le DOM
function displayBoard() {
    const boardContainer = document.querySelector("#board");  // Sélectionne l'élément contenant le plateau
    boardContainer.innerHTML = ''; // Réinitialise le contenu du plateau

    // Boucles pour parcourir chaque cellule du plateau
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const cell = document.createElement("div"); // Crée un élément <div> pour chaque cellule
            cell.classList.add("cell"); // Ajoute une classe CSS pour le style
          
            if (board[row][col] === "X") {
                const img = document.createElement('img')
                img.classList.add("img-cell")
                cell.appendChild(img)
                img.src = "./assets/image/fileRed.png";
            } else if (board[row][col] === "O") {
                const img = document.createElement('img')
                img.classList.add("img-cell")
                cell.appendChild(img)
                img.src = "./assets/image/file.png";
            }
            
            // Ajoute un écouteur d'événement pour chaque cellule, permettant de jouer un coup
            cell.addEventListener("click", function () {
                makeMove(row, col); // Appelle la fonction makeMove avec les coordonnées de la cellule
            });
            boardContainer.appendChild(cell); // Ajoute la cellule dans le conteneur du plateau
        }  
    }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
// Sélectionne le bouton de réinitialisation
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click",() => {
let cells = document.querySelectorAll(".cell")

cells.forEach(cell => {
cell.textContent = ""
});

// for (let i = 0; i < cells.length; i++) { // pareil que forEach
//     cells[i].textContent = ""
    
// }

    // Réinitialise le plateau de jeu à un état vide
    board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    // Remet le joueur actuel à "X"
    playerTour = 'X';
    messageGame.textContent = ""
    cpuMode = false
    gameOver = false;
})
  
    // Met à jour l'affichage du plateau
    displayBoard();
}

// Affiche le plateau initial
function start(){
    resetGame()
    displayBoard();
    choiceGame()

}
start()





//---------- Puissance 4

let tableau = [
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' '],
]

let pionTour = "red"
let msgPuissance = document.querySelector("#msg-puissance")

//----- Bouton Puissance 4

document.querySelector("#puissFor").addEventListener("click", () => {
    document.querySelector("#puissanceQuatre").style.display = "grid";
    document.querySelector("#puissFor").style.display = "none"
    puissanceGame()
})

//----- Creation des grilles cliquable

function puissanceGame() {
    const tableauContainer = document.querySelector("#tableau")
    tableauContainer.innerHTML = '';

    for (let row = 0; row < tableau.length; row++) {
        for (let col = 0; col < tableau[row].length; col++) {
            const cellule = document.createElement("div")
            cellule.classList.add("cellule")

            if (tableau[row][col] === "red") {
                const pic = document.createElement('img')
                pic.classList.add("puissancePic")
                cellule.appendChild(pic)
                pic.src = "./assets/image/fileRed.png";

            } else if (tableau[row][col] === "yellow") {
                const pic = document.createElement('img')
                pic.classList.add("puissancePic")
                cellule.appendChild(pic)
                pic.src = "./assets/image/file.png";
            }
            cellule.addEventListener("click", function () {
                movePuissance(row, col);
            });
            tableauContainer.appendChild(cellule);
        } 
    }
}

//------ Verification des espaces jouable

function movePuissance(row, col) {
    if (tableau[row][col] === ' ') {
        tableau[row][col] = pionTour;
        puissanceGame();

        if (winCheck(pionTour)) {
            msgPuissance.textContent = "Le joueur " + pionTour + " a gagné !";
            resetGame();
            return;
        }

        if (drawcheck()) {
            msgPuissance.textContent = ''
            return;
        }

        pionTour = (pionTour === 'red') ? 'yellow' : 'red';

        if (pionTour === 'yellow') {
            randomPuissance()
        }
    }
}

//----- Verification des différentes possibilités de gagner

function winCheck(gamer) {
    const rows = tableau.length;
    const cols = tableau[0].length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col <= cols - 4; col++) {
            if (tableau[row][col] === gamer && tableau[row][col + 1] === gamer && tableau[row][col + 2] === gamer && tableau[row][col + 3] === gamer) {
                return true;
            }
        }
    }

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row <= rows - 4; row++) {
            if (tableau[row][col] === gamer && tableau[row + 1][col] === gamer && tableau[row + 2][col] === gamer && tableau[row + 3][col] === gamer) {
                return true;
            }
        }
    }

    for (let row = 0; row <= rows - 4; row++) {
        for (let col = 0; col <= cols - 4; col++) {
            if (tableau[row][col] === gamer && tableau[row + 1][col + 1] === gamer && tableau[row + 2][col + 2] === gamer && tableau[row + 3][col + 3] === gamer) {
                return true;
            }
        }
    }

    for (let row = 3; row < rows; row++) {
        for (let col = 0; col <= cols - 4; col++) {
            if (tableau[row][col] === gamer && tableau[row - 1][col + 1] === gamer && tableau[row - 2][col + 2] === gamer && tableau[row - 3][col + 3] === gamer) {
                return true;
            }
        }
    }
    return false
}

//----- Verification du match nul

function drawcheck() {
    for (let row = 0; row < tableau.length; row++) {
        for (let col = 0; col < tableau[row].length; col++) {
            if (tableau[row][col] === ' ') {
                return false
            }
        }
    }
    return true;
}


function randomPuissance() {
    let emptyCellule = []

    for (let row = 0; row < tableau.length; row++) {
        for (let col = 0; col < tableau.length; col++) {
            if (tableau[row][col] === ' ') {
                emptyCellule.push([row, col])
            }
        } 
    }

    const indexRandom = Math.floor(Math.random() * emptyCellule.length)
    const [choseRow, choseCol] = emptyCellule[indexRandom]

    setTimeout(() => {
        movePuissance(choseRow, choseCol);
    }, 300);
}