/*------------------------*/
/*---- COMMON ENGINE -----*/
/*------------------------*/

/* SELECT GAMES SCENARIO */

function displayScenarioTextGame() {
    var htmlTextGame = "<strong>??? : </strong>\"J'ai entendu dire que vous êtes à la recherche d'informations sur... <i>Corentin</i>...<br><br>Nous savons tous les deux que moi : \"L'Informajoueur\" ; je suis votre unique chance d'obtenir ce que vous cherchez... Mais vais-je réellement vous donner ce que vous voulez sans contre partie ? <br>Evidemment que non !<br><br>Néanmoins ce n'est pas d'argent dont nous parlerons... voyez vous, je suis plutôt joueur ;)<br><br>Venez donc tester vos limites et gagner, peut être, les informations que vous êtes venue chercher...\""
    return htmlTextGame;
}

/* COMMANDS GAMES SCENARIO */

function commandsJeux(commandKey, commandOptions, state) {
    switch (commandKey) {
        case "continue": {
            state = launchGameStep(skipCurrentState(state));
            break;
        }
        case "skip-game": {
            state = launchGameStep(skipCurrentState(state));
            break;
        }
        case "restart": {
            switch(state.scenarioJeuxState.currentState) {
                case "firstGame" : {
                    state = restartMorpionGame(state);
                    break;
                }
                case "secondGame" : {
                    state = restartGuessGame(state);
                    break;
                }
                case "thirdGame" : {
                    state = restartShifumi(state); 
                    break;
                }
                default: {
                    writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
                    break
                }
            }
            break;
        }
        case "lock-movement": {
            switch(state.scenarioJeuxState.currentState) {
                case "firstGame" : {
                    state = lockMovement(state);
                    break;
                }
                default: {
                    writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
                    break
                }
            }
            break;
        }
        case "try-number" : {
            if (state.scenarioJeuxState.currentState === "secondGame") {
                state = guessWithThisNumber(state, commandOptions[0]);
                state = endGuessGame(state);
            } else {
                writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
            }
            break;
        }
        case "play" : {
            if (state.scenarioJeuxState.currentState === "thirdGame") {
                state = shifumiPLayerSelection(state, commandOptions[0]);
            } else { 
                writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
            }
            break;
        }
        default: {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
            break;
        }
    }
    return state;
}

/* DISPLAY GAMES SCENARIO */

function displayGameRules(currentState) {
    var screen = document.getElementById('gamesText');
    switch(currentState) {
        case "firstGameRules" : {
            screen.innerHTML =  "<strong>L'informajoueur : </strong>\"Pour nous échauffer, rien de tel qu'une petite partie de <i>Morpion</i> !<br><br>Pour gagner, il suffit de remplir une ligne, une colonne ou une diagonale avec nos pions respectifs.<br><br>Comme je suis bon joueur, je vous laisse commencer. De toutes manières il n'y a aucunes raisons pour que vous en ressortiez victorieuse héhéhé...\"<br><br><br><br><i>Il pose un plateau de 3 par 3 cases sur la table basse qui vous sépare, et s'emploie à récupérer les neufs pions du jeu dans un tiroir.<br><br>Il se retourne vers vous une fois le matériel trouvé et n'attend plus que votre première action.</i>";
            break;
        }
        case "secondGameRules" : {
            screen.innerHTML = "<strong>L'informajoueur : </strong>\"Savez vous ce que l'on dit de moi dans les alentours ? Que je suis le meilleur pour cacher mes pensées... <br>Et j'ai justement un jeu où vous allez devoir deviner ce que je pense !<br><br><br><br>Le jeu est simple, je choisis un nombre dans un interval que je vais vous donner et vous devrez le retrouver. Pour vous aider, je vous indiquerez uniquement si le nombre que vous me proposez est plus petit ou plus grand. <br><br>/!\\ Attention, vous ne pourrez pas essayer indéfiniment de trouver la solution. Seules 7 tentatives vous seront accordées !\"<br><br><br><br><i>Il s'installe en tailleur et tient ses tempes avec chacune de ses mains en fermant les yeux.<br><br>Après un moment de concentration intense, il rouvre ses yeux et vous fixe de son regard perçant.<br><br><br><br>C'est à vous de faire votre première tentative de divination.</i>";
            break;
        }
        case "thirdGameRules" : {
            screen.innerHTML = "<strong>L'informajoueur : </strong>\"Sur ce jeu là vous allez transpirer c'est moi qui vous le dit !\"<br><br><i>Il vous sourit à pleines dents avec ce qui lui reste de son dentier.</i><br><br><br><br><strong>L'informajoueur : </strong>\"Nous allons donc jouer à un jeu japonais, appelé le \"Shifumi\".<br>Dans votre langue natale, il me semble qu'on appelle ce jeu le \"Pierre - Feuille - Ciseaux\"...<br><br><br><br>Chaque élément a une force et une faiblesse. Voici toutes les combinaisons possibles : <br> - la Pierre gagne contre les Ciseaux, mais elle perd contre la Feuille <br> - les Ciseaux gagnent contre la Feuille et perdent contre la Pierre <br> - la Feuille gagne contre la Pierre et perd contre les Ciseaux <br> C'est pas bien compliqué dit comme ça, mais y a toute une réflexion tactique derrière à avoir !\"<br><br><br><br><i>Il semble vous attendre de pied ferme sur cette épreuve.</i>";
            break;
        }
    }
}

function displayGame(state) {
    var screen = document.getElementById('gamesText');

    switch (state.scenarioJeuxState.currentState) {
        case "firstGame" : {
            screen.innerHTML = "<h2 class='gamesTextAlign'>MORPION</h2>";
            screen.innerHTML += state.scenarioJeuxState.gameState.htmlMatrice;
            screen.innerHTML += "<br><br><br><br><div class='gamesTextAlign'>Astuce : Cliquez sur la case dans laquelle vous souhaitez placer votre pion, puis validez votre coup en saisissant la commande appropriée.</div>"
            break;
        }
        case "secondGame" : { 
            screen.innerHTML = "<h2 class='gamesTextAlign'>DEVINE LE NOMBRE</h2>";
            screen.innerHTML += "<br><br><br><br><div class='gamesTextAlign'><strong>Information</strong> : Le nombre est situé entre 0 et 100</div>";
            screen.innerHTML += "<br><br><br><br><div id='guessInfos' class='gamesTextAlign'><i>Ici sera indiqué si le nombre est inférieur ou supérieur à celui que vous me donnerez.</i></div>";
            break;
        }
        case "thirdGame" : {
            screen.innerHTML = "<h2 class='gamesTextAlign'>PIERRE - FEUILLE - CISEAUX</h2>";
            screen.innerHTML += "<br><br><br><br><div id='shifumiLine' class='gamesTextAlign'><i>Saisissez votre choix pour le round à venir !</i></div>";
            break;
        }
    }
}

function displayGameRewards(currentState) {
    console.log(currentState);
    var screen = document.getElementById('gamesText');
    switch(currentState) {
        case "firstReward" : {
            screen.innerHTML = "<div><strong>L'informajoueur : </strong>\"Ah ! Vous m'avez bien eu ! Mais je n'ai pas dit mon dernier mot !\"<br><br><i>Il fouille l'un de ses nombreux rangements et en sort une petite fiche qu'il vous jette sous les yeux que vous lisez attentivement.</i>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Textes 1</div>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Textes 2</div>";
            screen.innerHTML += "<br><br><strong>L'informajoueur : </strong>\"Vous avez quand même pas cru que j'allais tout vous donner d'un coup si ?! Hahaha et puis quoi encore ?! Si vous voulez vraiment toutes vos informations, va falloir encore vous friter avec moi... et gagner !\"</div>";
            break;
        }
        case "secondReward" : {
            screen.innerHTML = "<div><strong>L'informajoueur : </strong>\"Ce petit jeux était bien trop simple ! Même un enfant pourrait y arriver !\"<br><br><i>Il ouvre violemment un second tiroir et en sort une petite fiche qu'il vous jette à nouveau sous les yeux et que vous lisez attentivement.</i>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Textes 3</div>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Textes 4</div>";
            screen.innerHTML += "<br><br><strong>L'informajoueur : </strong>\"Un conseil ne prenez pas la confiance trop vite. Vous m'avez peut être battu sur deux de mes  jeux, mais j'ai encore une carte dans ma manche ! Un jeu où vous ne pourrez jamais, oh grand jamais me vaincre ! Dites \"adieu\" au reste de vos précieuses informations... héhéhé...\"<br><br><br><br><i>Il se frotte les mains tout en ricanant malsainement.<br><br>Çela ne vous laisse présager rien de bon...</i>";
            break;
        }
        case "thirdReward" : {
            screen.innerHTML = "Text 5 + Texte 6";
            break;
        }
        case "end" : {
            screen.innerHTML = "CV";
            break;
        }
    }
}

/* STATE GAMES SCENARIO */

function launchGameStep(state) {
    var docmnt = document.getElementById('docScenarioJeux');
    docmnt.innerHTML = "<h2>Commandes du scénario : </h2>";
    switch(state.scenarioJeuxState.currentState) {
        case "firstGameRules": {
            // 1 Modifier l'affichage principal
            displayGameRules(state.scenarioJeuxState.currentState);
            // 2 Ecrire dans le result command quelque chose
            writeCommandResults("//--- Règles du jeux n°1 ---//")
            // 3 Afficher les commandes utilisables
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "firstGame": {
            state = restartMorpionGame(state);
            writeCommandResults("//--- Jeux n°1 ---//")
            docmnt.innerHTML += "<strong>lock-movement : </strong>Valider l'action<br>";
            docmnt.innerHTML += "<strong>restart : </strong>Recommencer la partie<br>";
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "firstReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeux n°1 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "secondGameRules": {
            displayGameRules(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Règles du jeux n°2 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "secondGame": {
            state = restartGuessGame(state);
            writeCommandResults("//--- Jeux n°2 ---//");
            docmnt.innerHTML += "<strong>try-number X: </strong>Proposer le nombre X<br>";
            docmnt.innerHTML += "<strong>restart : </strong>Recommencer la partie<br>";
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "secondReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeux n°2 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "thirdGameRules": {
            displayGameRules(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Règles du jeux n°3 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "thirdGame": {
            state = restartShifumi(state);
            writeCommandResults("//--- Jeux n°3 ---//")
            docmnt.innerHTML += "<strong>lock-movement : </strong>Valider l'action<br>";
            docmnt.innerHTML += "<strong>restart : </strong>Recommencer la partie<br>";
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "thirdReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeux n°3 ---//")
            docmnt.innerHTML += "<strong>continue : </strong>Dérouler le scénario<br>";
            break;
        }
        case "end": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Super récompense ---//")
            docmnt.innerHTML = "";
            break;
        }
        default : {
            break;
        }
    }
    return state;
}

function skipCurrentState(state) {
    var indice = state.scenarioJeuxState.stateArray.indexOf(state.scenarioJeuxState.currentState) + 1;
    if (indice < state.scenarioJeuxState.stateArray.length) {
        state.scenarioJeuxState.currentState = state.scenarioJeuxState.stateArray[indice];
    } else {
        state.scenarioJeuxState.currentState = state.scenarioJeuxState.stateArray[state.scenarioJeuxState.stateArray.length - 1];
    }
    return state;
}

/*-----------------*/
/*---- MORPION ----*/
/*-----------------*/


/* INIT BOARDGAME MORPION */

function setBoardGame(size) {
    var matrice = new Array();
    matrice.length = size;

    for (var i = 0; i < matrice.length; i++) {
        for (var j = 0; j < matrice.length; j++) {
            if (!matrice[i]) matrice[i] = new Array();
            var case_courante = "";
            matrice[i][j] = case_courante;
        }
    }

    return matrice;
}

function buildHTMLMatrice(matrice) {
    var htmlMatrice = "<div id='morpionGameBoard'>";

    for (var i = 0; i < matrice.length; i++) {
        htmlMatrice += "<div id='lign-" + i + "' class='lign'>";
        for (var j = 0; j < matrice.length; j++) {
            htmlMatrice += "<div class='case'><div id='case-" + i + "-" + j + "' class='innerCase'>" + matrice[i][j] + "</div></div>";
        }
        htmlMatrice += "</div>";
    }

    htmlMatrice += "</div>";

    return htmlMatrice;
}

function retrieveHTMLMatrice(rawMatrice) {
    var htmlMatrice = buildHTMLMatrice(rawMatrice);
    return htmlMatrice;
}

function buildGameMorpion(size) {
    var rawMatrice = setBoardGame(size);
    var boardGame = {
        rawMatrice: rawMatrice,
        htmlMatrice: retrieveHTMLMatrice(rawMatrice),
        gamerTurn: true,
        isFinished: "not",
        errorMessage: '',
    }

    return boardGame;
}

/* LISTENERS BOARDGAME MORPION */

function bindClickMatrice() {
    var allCase = document.getElementsByClassName('case');
    Array.from(allCase).forEach(element => {
        element.addEventListener('click',() => {
            console.log(element);
            var selectedCase = document.getElementsByClassName('selectedCase')[0];
            if(selectedCase) {
                selectedCase.classList.remove('selectedCase');
            }
            element.firstChild.classList.add('selectedCase');
            document.getElementsByTagName('INPUT')[0].focus();
        });
    });
}

/* ENGINE MORPION */

function restartMorpionGame(state) {
    state.scenarioJeuxState.gameState = buildGameMorpion(3);
    displayGame(state);
    bindClickMatrice();
    writeCommandResults("Nettoyage du plateau...");
    return state;
}

// Player move
function lockMovement(state) {
    
    if (state.scenarioJeuxState.gameState.isFinished === "not") {
        var selectedCase = document.getElementsByClassName('selectedCase')[0];
        if(selectedCase.innerHTML === '') {
            writeCommandResults("Le pion est posé...");
            var caseCell = {
                ligne : selectedCase.id.split('-')[1], 
                colonne : selectedCase.id.split('-')[2]
            };
            var pion = (state.scenarioJeuxState.gameState.gamerTurn ? '<div class="marginAuto">X</div>' : '<div class="marginAuto">O</div>');
            state.scenarioJeuxState.gameState.rawMatrice[caseCell.ligne][caseCell.colonne] = 'X';
            updateHTMLMatrice(selectedCase, pion);
            state.scenarioJeuxState.gameState.gamerTurn = !state.scenarioJeuxState.gameState.gamerTurn;
            state = endMorpionGame(state);
            if (!state.scenarioJeuxState.gameState.gamerTurn && state.scenarioJeuxState.gameState.isFinished === "not") {
                state = morpionTurnIA(state);
                state = endMorpionGame(state);
            } 

            if (state.scenarioJeuxState.gameState.isFinished !== "not") {
                setTimeout(() => {
                var screen = document.getElementById('gamesText');
                screen.innerHTML = "<h2 class='gamesTextAlign'>MORPION</h2><br><br><br><br>";              
                if (state.scenarioJeuxState.gameState.isFinished === "yesPlayerOneWon") {
                    screen.innerHTML += "<div class='gamesTextAlign gamesTextUnderline'>Vous gagnez la partie !</div>";
                    setTimeout(() => {
                        state = launchGameStep(skipCurrentState(state));
                    }, 1500);
                } else if (state.scenarioJeuxState.gameState.isFinished === "yesPlayerTwoWon") {
                        screen.innerHTML += "<div class='gamesTextAlign gamesTextUnderline'>L'informajoueur gagne la partie !</div>";
                        screen.innerHTML += "<br><br><br><br>";
                        screen.innerHTML += "<div class='gamesTextAlign'><strong>L'informajoueur : </strong>\"Je suis vraiment imbattable héhé ! Si toutefois vous souhaitez prendre une autre dérouillée, faites vous plaisir !\"</div>"
                        writeCommandResults("//--- Vous avez perdu ---//");
                    } else if (state.scenarioJeuxState.gameState.isFinished === "yesWithoutWinner") {
                        screen.innerHTML += "<div class='gamesTextAlign gamesTextUnderline'>Égalité !</div>" ;
                        screen.innerHTML += "<br><br><br><br>";
                        screen.innerHTML += "<div class='gamesTextAlign'><strong>L'informajoueur : </strong>\"Égalité ?! Sacrebleu... Vous m'avez donné du fil à retordre, certes, mais rappelez vous que seule une victoire vous satisfera d'une récompense.\"</div>"
                        writeCommandResults("//--- Ex aequo ---//");
                    }
                }, 1500);
            }
        } else {
            writeCommandResults("Un joueur a déjà un pion sur cette case !");
        }
    }
    return state;
}

// AI move
function morpionTurnIA(state) {

    var hasAValidCase = false
    for (var i = 0; i < state.scenarioJeuxState.gameState.rawMatrice.length; i++) {
        for (var j = 0; j < state.scenarioJeuxState.gameState.rawMatrice.length; j++) {
            if (state.scenarioJeuxState.gameState.rawMatrice[i][j] === '') {
                hasAValidCase = true;
            }
        }
    }

    if(hasAValidCase) {
        var isCellEmpty = false;
        do {
            var ligneRandom = getRandom(3);
            var colonneRandom = getRandom(3);
            if (state.scenarioJeuxState.gameState.rawMatrice[ligneRandom][colonneRandom] === '') {
                isCellEmpty = true;
            }
        } while(!isCellEmpty);
        var pion = (state.scenarioJeuxState.gameState.gamerTurn ? '<div class="marginAuto">X</div>' : '<div class="marginAuto">O</div>');
        var selectedCase = document.getElementById('case-' + ligneRandom + '-' + colonneRandom);
        updateHTMLMatrice(selectedCase, pion);
        state.scenarioJeuxState.gameState.gamerTurn = !state.scenarioJeuxState.gameState.gamerTurn;
        state.scenarioJeuxState.gameState.rawMatrice[ligneRandom][colonneRandom] = 'O';
    } else {
        state.scenarioJeuxState.gameState.isFinished = "yesWithoutWinner";
    }
    return state;
}

function updateHTMLMatrice(caseCell, pion) {
    caseCell.innerHTML = pion;
}

function endMorpionGame(state) {

    var diagonalLeftCountJ1 = 0;
    var diagonalRightCountJ1 = 0;
    var lignCountJ1 = 0;
    var columnCountJ1 = 0;    
    
    var diagonalLeftCountJ2 = 0;
    var diagonalRightCountJ2 = 0;
    var lignCountJ2 = 0;
    var columnCountJ2 = 0;    
    
    for (var i = 0; i < state.scenarioJeuxState.gameState.rawMatrice.length; i++) {
        for (var j = 0; j < state.scenarioJeuxState.gameState.rawMatrice.length; j++) {   
            if (state.scenarioJeuxState.gameState.rawMatrice[i][j] === 'O') {
                lignCountJ2++;
            }
            if (state.scenarioJeuxState.gameState.rawMatrice[i][j] === 'X') {
                lignCountJ1++;
            }
            if (lignCountJ1 === 3) {
                state.scenarioJeuxState.gameState.isFinished = "yesPlayerOneWon";
            } else if (lignCountJ2 === 3) {
                state.scenarioJeuxState.gameState.isFinished = "yesPlayerTwoWon";
            }
        }
        lignCountJ1 = 0;
        lignCountJ2 = 0;
    }
    
    if (state.scenarioJeuxState.gameState.isFinished === "not") {
        for (var i = 0; i < state.scenarioJeuxState.gameState.rawMatrice.length; i++) {
            for (var j = 0; j < state.scenarioJeuxState.gameState.rawMatrice.length; j++) {
                if (state.scenarioJeuxState.gameState.rawMatrice[j][i] === 'O') {
                    columnCountJ2++;
                }
                if (state.scenarioJeuxState.gameState.rawMatrice[j][i] === 'X') {
                    columnCountJ1++;
                }
                if (columnCountJ1 === 3) {
                    state.scenarioJeuxState.gameState.isFinished = "yesPlayerOneWon";
                } else if (columnCountJ2 === 3) {
                    state.scenarioJeuxState.gameState.isFinished = "yesPlayerTwoWon";
                }
            }
            columnCountJ1 = 0;
            columnCountJ2 = 0;
        }
    }
    
    if (state.scenarioJeuxState.gameState.isFinished === "not") {
        for (var i = 0; i < state.scenarioJeuxState.gameState.rawMatrice.length; i++) {
            for (var j = 0; j < state.scenarioJeuxState.gameState.rawMatrice.length; j++) {
                if (((i === 0 && j === 0) || (i === 1 && j === 1) || (i === 2 && j === 2)) && state.scenarioJeuxState.gameState.rawMatrice[i][j] === 'O') {
                    diagonalLeftCountJ2++;
                }
                if (((i === 0 && j === 0) || (i === 1 && j === 1) || (i === 2 && j === 2)) && state.scenarioJeuxState.gameState.rawMatrice[i][j] === 'X') {
                    diagonalLeftCountJ1++;
                }
                if (diagonalLeftCountJ1 === 3) {
                    state.scenarioJeuxState.gameState.isFinished = "yesPlayerOneWon";
                } else if (diagonalLeftCountJ2 === 3) {
                    state.scenarioJeuxState.gameState.isFinished = "yesPlayerTwoWon";
                }
                if ( ((i === 0 && j === 2) || (i === 1 && j === 1) || (i === 2 && j === 0)) && state.scenarioJeuxState.gameState.rawMatrice[i][j] === 'O') {
                    diagonalRightCountJ2++;
                }
                if ( ((i === 0 && j === 2) || (i === 1 && j === 1) || (i === 2 && j === 0)) && state.scenarioJeuxState.gameState.rawMatrice[i][j] === 'X') {
                    diagonalRightCountJ1++;
                }
                if (diagonalRightCountJ1 === 3) {
                    state.scenarioJeuxState.gameState.isFinished = "yesPlayerOneWon";
                } else if (diagonalRightCountJ2 === 3) {
                    state.scenarioJeuxState.gameState.isFinished = "yesPlayerTwoWon";
                }
            }
        }
    }
    return state;
}

/*--------------------------*/
/*---- DEVINE UN NOMBRE ----*/
/*--------------------------*/

function buildGameGuess() {
    var gameState = {
        number: getRandom(100),
        nbAttempt: 0,
        isFinished: "not"
    };

    return gameState;
}

function restartGuessGame(state) {
    state.scenarioJeuxState.gameState = buildGameGuess();
    displayGame(state);
    writeCommandResults("Choix d'un nouveau nombre à trouver...");
    return state;
}

function guessWithThisNumber(state, typedNumber) {
    typedNumber = parseInt(typedNumber, 10);
    if (!isNaN(typedNumber) && typedNumber === parseInt(typedNumber, 10)) {
        state.scenarioJeuxState.gameState.nbAttempt++;
        
        var htmlInfo = document.getElementById('guessInfos');
        if(typedNumber < state.scenarioJeuxState.gameState.number) {
            if(state.scenarioJeuxState.gameState.nbAttempt < 7) {
                htmlInfo.innerHTML = "+ Le nombre est plus grand que " + typedNumber;
            } else {
                htmlInfo.innerHTML = "Vous n'avez pas réussi à trouver le nombre. C'était " + state.scenarioJeuxState.gameState.number;
                state.scenarioJeuxState.gameState.isFinished = "tooManyAttempts";
            }
        } else if (typedNumber > state.scenarioJeuxState.gameState.number) {
            if(state.scenarioJeuxState.gameState.nbAttempt < 7) {
                htmlInfo.innerHTML = "- Le nombre est plus petit que " + typedNumber;
            } else {
                htmlInfo.innerHTML = "Vous n'avez pas réussi à trouver le nombre. C'était " + state.scenarioJeuxState.gameState.number;
                state.scenarioJeuxState.gameState.isFinished = "tooManyAttempts";
            }
        } else {
            htmlInfo.innerHTML = "Bravo, le nombre est bel et bien " + typedNumber;
            state.scenarioJeuxState.gameState.isFinished = "numberFound";
        }
        writeCommandResults("Tentative n°" + state.scenarioJeuxState.gameState.nbAttempt);
    } else {
        writeCommandResults("Veuillez saisir un nombre s'il vous plait...");
    }
    return state;
}

function endGuessGame(state) {
    if(state.scenarioJeuxState.gameState.isFinished !== "not") {
        setTimeout(() => {
            var screen = document.getElementById('gamesText');
            screen.innerHTML = "<h2 class='gamesTextAlign'>DEVINE LE NOMBRE</h2><br><br><br><br>";              
            if (state.scenarioJeuxState.gameState.isFinished === "numberFound") {
                screen.innerHTML += "<div class='gamesTextAlign gamesTextUnderline'>Vous gagnez à nouveau contre l'informajoueur !</div>";
                setTimeout(() => {
                    state = launchGameStep(skipCurrentState(state));
                }, 1500);
            } else {
                screen.innerHTML += "<div class='gamesTextAlign gamesTextUnderline'>Le mental de l'informajoueur est trop fort !</div>" ;
                screen.innerHTML += "<br><br><br><br>";
                screen.innerHTML += "<div class='gamesTextAlign'><strong>L'informajoueur : </strong>\"Personne n'arrive à lire mes pensées les plus profondes ! Et ce n'est pas une amatrice en la matière qui réussira à m'extorquer mes pensées ! Pour vous le prouver, je vous laisse retenter si vous n'avez pas honte d'un énième échec héhéhé...\"</div>"
                writeCommandResults("//--- Vous avez perdu ---//");
            }
        }, 3000);
    } 

    return state;
}

/*--------------------------------*/
/*---- PIERRE FEUILLE CISEAUX ----*/
/*--------------------------------*/

function buildGameShifumi() {
    var gameState = {
        playerSelection : "",
        informajoueurSelection: "",
        isFinished: "not"
    };

    return gameState;
}

function restartShifumi(state) {
    state.scenarioJeuxState.gameState = buildGameShifumi();
    displayGame(state);
    writeCommandResults("Sélectionnez le symbole que vous voulez jouer...");
    return state;
}

function shifumiPLayerSelection(state, selectedMove) {
    switch(selectedMove) {
        case "pierre" : {
            state.scenarioJeuxState.gameState.playerSelection = "pierre";
            state = shifumiInformajoueurSelection(state);
            state = resolveShifumi(state);
            displayShifumiResult(state);
            // state = endShifumiGame(state);
            break;
        }
        case "feuille" : {
            state.scenarioJeuxState.gameState.playerSelection = "feuille";
            state = shifumiInformajoueurSelection(state);
            state = resolveShifumi(state);
            displayShifumiResult(state);
            // state = endShifumiGame(state);
            break;
        }
        case "ciseaux": {
            state.scenarioJeuxState.gameState.playerSelection = "ciseaux";
            state = shifumiInformajoueurSelection(state);
            state = resolveShifumi(state);
            displayShifumiResult(state);
            // state = endShifumiGame(state);
            break;
        }
        case "puit": {
            state.scenarioJeuxState.gameState.playerSelection = "puit";
            state = shifumiInformajoueurSelection(state);
            state = resolveShifumi(state);
            displayShifumiResult(state);
            // state = endShifumiGame(state);
            break;
        }
        default : {
            writeCommandResults("Seuls les termes \"pierre\", \"feuille\", \"ciseaux\" (ou en trichant \"puit\") sont utilisables...");
            state = restartShifumi(state);
            break;
        }
    }
    return state;
}

function shifumiInformajoueurSelection(state) {
    var listSelection = ["pierre", "feuille", "ciseaux"];
    var numberSelection = getRandom(3);
    state.scenarioJeuxState.gameState.informajoueurSelection = listSelection[numberSelection];
    return state;
}

function resolveShifumi(state) {
    switch(state.scenarioJeuxState.gameState.playerSelection) {
        case "pierre" : {
            switch (state.scenarioJeuxState.gameState.informajoueurSelection) {
                case "pierre": {
                    state.scenarioJeuxState.gameState.isFinished = "equality";
                    break;
                }
                case "feuille": {
                    state.scenarioJeuxState.gameState.isFinished = "lost";
                    break;
                }
                case "ciseaux": {
                    state.scenarioJeuxState.gameState.isFinished = "won";
                    break;
                }
                default: {
                    break;
                }
            }
            break;
        }
        case "feuille": {
            switch (state.scenarioJeuxState.gameState.informajoueurSelection) {
                case "pierre": {
                    state.scenarioJeuxState.gameState.isFinished = "won";
                    break;
                }
                case "feuille": {
                    state.scenarioJeuxState.gameState.isFinished = "equality";
                    break;
                }
                case "ciseaux": {
                    state.scenarioJeuxState.gameState.isFinished = "lost";
                    break;
                }
                default: {
                    break;
                }
            }
            break;
        }
        case "ciseaux": {
            switch (state.scenarioJeuxState.gameState.informajoueurSelection) {
                case "pierre": {
                    state.scenarioJeuxState.gameState.isFinished = "lost";
                    break;
                }
                case "feuille": {
                    state.scenarioJeuxState.gameState.isFinished = "won";
                    break;
                }
                case "ciseaux": {
                    state.scenarioJeuxState.gameState.isFinished = "equality";
                    break;
                }
                default: {
                    break;
                }
            }
            break;
        }
        case "puit": {
            switch (state.scenarioJeuxState.gameState.informajoueurSelection) {
                case "pierre": {
                    state.scenarioJeuxState.gameState.isFinished = "won";
                    break;
                }
                case "feuille": {
                    state.scenarioJeuxState.gameState.isFinished = "won";
                    break;
                }
                case "ciseaux": {
                    state.scenarioJeuxState.gameState.isFinished = "won";
                    break;
                }
                default: {
                    break;
                }
            }
            break;
        }
        default : {
            break;
        }
    }
    return state;
}

function endShifumiGame(state) {
    if (state.scenarioJeuxState.gameState.isFinished !== "won") {
        state = restartShifumi(state);
    } else {
        state = launchGameStep(skipCurrentState(state));
    }
    return state;
}

function displayShifumiResult(state) {
    var htmlElement = document.getElementById("shifumiLine");
    var htmlContent = "<div class='gamesTextAlign'><img class='imageSize' src='../../ressources/images/shifumi/p" + state.scenarioJeuxState.gameState.playerSelection + ".png'> - versus - <img class='imageSize' src='../../ressources/images/shifumi/" + state.scenarioJeuxState.gameState.informajoueurSelection + ".png'></div>";
    htmlContent += "<br><br><br><br><div id='shifumiResult' class='gamesTextAlign'></div>";
    


    
    htmlElement.innerHTML = htmlContent;
    setTimeout(() => {
        var resultHtmlElement = document.getElementById('shifumiResult');
        var resultHtmlContent = "";
        switch (state.scenarioJeuxState.gameState.isFinished) {
            case "equality" : {
                resultHtmlContent = "<div class='gamesTextAlign'>Égalité</div>";
                break;
            }
            case "lost": {
                resultHtmlContent = "<div class='gamesTextAlign'>Perdu</div>";
                break;
            }
            case "won": {
                resultHtmlContent = "<div class='gamesTextAlign'>Gagné</div>";
                break;
            }
            default: {
                break;
            }
        }
        resultHtmlElement.innerHTML = resultHtmlContent;
    }, 2000);
}

/* COMMON FUNCTIONS */

function getRandom(multiplicator) {
    return Math.floor(Math.random() * multiplicator);
}