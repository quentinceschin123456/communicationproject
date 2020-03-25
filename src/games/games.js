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
                    state = restartGame(state);
                    break;
                }
                case "secondGame" : {
                    
                    break;
                }
                case "thirdGame" : {
                   
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
                case "secondGame" : {
                    
                    break;
                }
                case "thirdGame" : {
                   
                    break;
                }
                default: {
                    writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
                    break
                }
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

function skipCurrentState(state) {
    var indice = state.scenarioJeuxState.stateArray.indexOf(state.scenarioJeuxState.currentState) + 1;
    if (indice < state.scenarioJeuxState.stateArray.length) {
        state.scenarioJeuxState.currentState = state.scenarioJeuxState.stateArray[indice];
    } else {
        state.scenarioJeuxState.currentState = state.scenarioJeuxState.stateArray[state.scenarioJeuxState.stateArray.length - 1];
    }
    return state;
}

function displayScenarioTextGame() {
    var htmlTextGame = "<strong>??? : </strong>\"J'ai entendu dire que vous êtes à la recherche d'informations sur... <i>Corentin</i>...<br><br>Nous savons tous les deux que moi : \"L'Informajoueur\" ; je suis votre unique chance d'obtenir ce que vous cherchez... Mais vais-je réellement vous donner ce que vous voulez sans contre partie ? <br>Evidemment que non !<br><br>Néanmoins ce n'est pas d'argent dont nous parlerons... voyez vous, je suis plutôt joueur ;)<br><br>Venez donc tester vos limites et gagner, peut être, les informations que vous êtes venue chercher...\""
    return htmlTextGame;
}

function displayGame(currentState, htmlMatrice) {
    var screen = document.getElementById('gamesText');

    switch(currentState) {
        case "firstGame" : {
            screen.innerHTML = "<h2 class='gamesTextAlign'>MORPION</h2>";
            screen.innerHTML += htmlMatrice;
            screen.innerHTML += "<br><br><br><br><div class='gamesTextAlign'>Astuce : Cliquez sur la case dans laquelle vous souhaitez placer votre pion, puis validez votre coup en saisissant la commande appropriée.</div>"
            break;
        }
        case "secondGame" : { 
            screen.innerHTML = "DAMES";
            break;
        }
        case "thirdGame" : {
            screen.innerHTML = "CONTAMINATION";
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
            screen.innerHTML = "Texte 3 + Texte 4";
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

function displayGameRules(currentState) {
    var screen = document.getElementById('gamesText');
    switch(currentState) {
        case "firstGameRules" : {
            screen.innerHTML =  "<strong>L'informajoueur : </strong>\"Pour nous échauffer, rien de tel qu'une petite partie de <i>Morpion</i> !<br><br>Pour gagner, il suffit de remplir une ligne, une colonne ou une diagonale avec nos pions respectifs.<br><br>Comme je suis bon joueur, je vous laisse commencer. De toutes manières il n'y a aucunes raisons pour que vous en ressortiez victorieuse héhéhé...\"<br><br><br><br><i>Il pose un plateau de 3 par 3 cases sur la table basse qui vous sépare, et s'emploie à récupérer les neufs pions du jeu dans un tiroir.<br><br>Il se retourne vers vous une fois le matériel trouvé et n'attend plus que votre première action.</i>";
            break;
        }
        case "secondGameRules" : {
            screen.innerHTML = "Expliquer règles dames yolo";
            break;
        }
        case "thirdGameRules" : {
            screen.innerHTML = "Expliquer règles contamination yolo";
            break;
        }
    }
}

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
            state = restartGame(state);
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
            displayGame(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Jeux n°2 ---//")
            docmnt.innerHTML += "<strong>lock-movement : </strong>Valider l'action<br>";
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
            displayGame(state.scenarioJeuxState.currentState);
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


// PLATEAU //

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

// PIONS //

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


function buildGameObject(size) {
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

function updateHTMLMatrice(caseCell, pion) {
    caseCell.innerHTML = pion;
}

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
            var ligneRandom = Math.floor(Math.random() * 3);
            var colonneRandom = Math.floor(Math.random() * 3);
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

function endMorpionGame(state) {

    var diagonalLeftCountJ1 = 0;
    var diagonalRightCountJ1 = 0;
    var lignCountJ1 = 0;
    var columnCountJ1 = 0;    
    
    var diagonalLeftCountJ2 = 0;
    var diagonalRightCountJ2 = 0;
    var lignCountJ2 = 0;
    var columnCountJ2 = 0;    
    
    console.log("APRES COMPTEUR DE LIGNE");
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
        console.log("Ligne", i);
        console.log("LIJ1",lignCountJ1);
        console.log("LIJ2",lignCountJ2);
        lignCountJ1 = 0;
        lignCountJ2 = 0;
    }

    
    console.log("APRES COMPTEUR DE COLONNE");
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
            console.log("Colonne", i);
            console.log("COJ1",columnCountJ1);
            console.log("COJ2",columnCountJ2);
            columnCountJ1 = 0;
            columnCountJ2 = 0;
        }
    }
    
    console.log("APRES COMPTEUR DE DIAGONALE");
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
        console.log("DLJ1",diagonalLeftCountJ1);
        console.log("DRJ1",diagonalRightCountJ1);
        console.log("DLJ2",diagonalLeftCountJ2);
        console.log("DRJ2",diagonalRightCountJ2);
    }



    return state;
}

function restartGame(state) {
    state.scenarioJeuxState.gameState = buildGameObject(3);
    displayGame(state.scenarioJeuxState.currentState, state.scenarioJeuxState.gameState.htmlMatrice);
    bindClickMatrice();
    writeCommandResults("Nettoyage du plateau...");
    return state;
}