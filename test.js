// Initialisation du plateau de jeu avec un tableau 2D représentant une grille vide de 3x3
let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];


// Définit le joueur actuel ("X" ou "O"). "X" commence toujours.
let playerTour = 'X';

// Sélectionne l'élément HTML pour afficher les messages de jeu
let messageGame = document.querySelector("#message");

// Sélectionne le bouton de réinitialisation
const resetButton = document.querySelector("#reset-button");

// Fonction pour effectuer un mouvement dans une cellule spécifique
function makeMove(row, col) {
    // Vérifie si la cellule est vide avant d'effectuer le mouvement
    if (board[row][col] === ' ') {
        // Place le symbole du joueur actuel dans la cellule
        board[row][col] = playerTour;
        if (playerTour === '0') {
            playerRandom()
            
        }
        
        // Met à jour l'affichage du plateau
        displayBoard();

        // Vérifie si le joueur actuel a gagné après son mouvement
        if (checkWin(playerTour)) {
            // Affiche un message de victoire
            messageGame.textContent = ("Le joueur " + playerTour + " a gagné !");
            // Réinitialise le jeu après une victoire
            resetGame();
            return;
        }
       

       
        // Vérifie si la partie est un match nul (aucune case vide restante)
        if (checkDraw()) {
            // Affiche un message de match nul
            messageGame.textContent = ("Match nul !");
            return;
        }

        
    }
}

function playerRandom() {

    let emptyCell = [];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === '') {
                emptyCell.push([row][col]);   
            } 
        }
    }

    const randomIndex = Math.floor(Math.random() * emptyCell.length);
    const chosenCells = emptyCell[randomIndex]

    makeMove(chosenCells.row, chosenCells.col);
}

// Fonction pour vérifier si le joueur donné a gagné
function checkWin(player) {
    // Vérification des lignes pour trois symboles identiques
    for (let row = 0; row < board.length; row++) {
        if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
            return true;
        }    
    }

    // Vérification des colonnes pour trois symboles identiques
    for (let col = 0; col < board.length; col++) {
        if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
            return true;
        }  
    }

    // Vérification des diagonales pour trois symboles identiques
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) { // Diagonale principale
        return true;
    } 

    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) { // Diagonale secondaire
        return true;
    } 
    return false; // Retourne faux si aucune combinaison gagnante n'est trouvée
}

// Fonction pour vérifier si le plateau est plein (c'est-à-dire un match nul)
function checkDraw() {
    // Parcourt toutes les cellules du plateau
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
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
    // Sélectionne l'élément contenant le plateau
    const boardContainer = document.querySelector("#board");
    boardContainer.innerHTML = ''; // Réinitialise le contenu du plateau

    // Boucles pour parcourir chaque cellule du plateau
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            const cell = document.createElement("div"); // Crée un élément <div> pour chaque cellule
            cell.classList.add("cell"); // Ajoute une classe CSS pour le style

            const img = document.createElement('img')
            img.classList.add("img-cell")
            cell.appendChild(img)
            if (board[row][col]=== "X") {
                img.src = "./assets/image/file.png"
                
            }else if(board[row][col]=== "O") {
                img.src = "./assets/image/oeufRED.png"
            }
            // Ajoute un écouteur d'événement pour chaque cellule, permettant de jouer un coup
            cell.addEventListener("click", function () {
                // Passe le tour au joueur suivant : si c'était "X", on passe à "O", sinon, c'est "X"
        playerTour = (playerTour === 'X') ? 'O' : 'X';

        
        
        makeMove(row, col); // Appelle la fonction makeMove avec les coordonnées de la cellule
        });
            boardContainer.appendChild(cell); // Ajoute la cellule dans le conteneur du plateau
        }  
    }
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    // Réinitialise le plateau de jeu à un état vide
    board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];
    // Remet le joueur actuel à "X"
    playerTour = 'X';
    // Met à jour l'affichage du plateau
    displayBoard();
}
playerTour = 'X';
displayBoard()
// Affiche le plateau initial




