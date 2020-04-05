/*------------------------*/
/*---- COMMON ENGINE -----*/
/*------------------------*/

/* SELECT GAMES SCENARIO */

function displayScenarioTextGame() {
    var htmlTextGame = "<strong>??? : </strong>\"J'ai entendu dire que vous êtes à la recherche d'informations sur... <i>Corentin</i>...<br><br>Nous savons tous les deux que moi : \"L'Informajoueur\" ; je suis votre unique chance d'obtenir ce que vous cherchez... Mais vais-je réellement vous donner ce que vous voulez sans contrepartie ? <br>Évidemment que non !<br><br>Néanmoins ce n'est pas d'argent dont nous parlerons... voyez vous, je suis plutôt joueur ;)<br><br>Venez donc tester vos limites et gagner, peut-être, les informations que vous êtes venu chercher...\""
    return htmlTextGame;
}

/* COMMANDS GAMES SCENARIO */

function commandsJeux(commandKey, commandOptions, state) {
    switch (commandKey) {
        case "ok-go": {
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
                    writeCommandResults("Sélectionnez le symbole que vous voulez jouer...");
                    break;
                }
                default: {
                    writeCommandResults("Commande inconnue, référez vous à la documentation sur la droite de l'écran.");
                    break
                }
            }
            break;
        }
        case "lock": {
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
        case "try-nb" : {
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
                state = restartShifumi(state);
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
            screen.innerHTML =  "<strong>L'informajoueur : </strong>\"Pour nous échauffer, rien de tel qu'une petite partie de <i>Morpion</i> !<br><br>Pour gagner, il suffit de remplir une ligne, une colonne ou une diagonale avec nos pions respectifs.<br><br>Comme je suis bon joueur, je vous laisse commencer. De toute manière il n'y a rien qui me dit que aucune raison pour que vous en ressortiez victorieuse...\"<br><br><br><br><i>Il pose un plateau de 3 par 3 cases sur la table basse qui vous sépare, et s'emploie à récupérer les neufs pions du jeu dans un tiroir.<br><br>Il se retourne vers vous une fois le matériel trouvé et n'attend plus que votre première action.</i>";
            break;
        }
        case "secondGameRules" : {
            screen.innerHTML = "<strong>L'informajoueur : </strong>\"Savez vous ce que l'on dit de moi dans les alentours ? Que je suis le meilleur pour cacher mes pensées... <br>Et j'ai justement un jeu où vous allez devoir deviner ce que je pense !<br><br><br><br>Le jeu est simple, je choisis un nombre dans un intervalle que je vais vous donner et vous devrez le retrouver. Pour vous aider, je vous indiquerai uniquement si le nombre que vous me proposez est plus petit ou plus grand. <br><br>/!\\ Attention, vous ne pourrez pas essayer indéfiniment de trouver la solution. Seules 7 tentatives vous seront accordées !\"<br><br><br><br><i>Il s'installe en tailleur et tient ses tempes avec chacune de ses mains en fermant les yeux.<br><br>Après un moment de concentration intense, il rouvre ses yeux et vous fixe de son regard perçant.<br><br><br><br>C'est à vous de faire votre première tentative de divination.</i>";
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
            var html = "<h2 class='gamesTextAlign'>PIERRE - FEUILLE - CISEAUX</h2>";
            html += "<br><br><br><br><div class='gamesTextAlign'><i id='shifumiLine' class='setVisible'>Saisissez votre choix pour le round à venir !</i>";
            html += "<div class='gamesTextAlign'>";
            html += "<img id='ppierre' class='imageSize setInvisible' src='/images/shifumi/ppierre.png'>";
            html += "<img id='pfeuille' class='imageSize setInvisible' src='/images/shifumi/pfeuille.png'>";
            html += "<img id='pciseaux' class='imageSize setInvisible' src='/images/shifumi/pciseaux.png'>";
            html += "<img id='ppuit' class='imageSize setInvisible' src='/images/shifumi/ppuit.png'>";
            html += "<span id='connector' class='setInvisible'> - contre - </span>";
            html += "<img id='pierre' class='imageSize setInvisible' src='/images/shifumi/pierre.png'>";
            html += "<img id='feuille' class='imageSize setInvisible' src='/images/shifumi/feuille.png'>";
            html += "<img id='ciseaux' class='imageSize setInvisible' src='/images/shifumi/ciseaux.png'></div>";
            html += "<br><br><br><br><div id='shifumiResult' class='gamesTextAlign'></div>";
            screen.innerHTML = html;
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
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Traits de personnalité : <br><br>D'après mes proches, j'ai globalement bon fond, je suis ainsi sympathique, gentil, protecteur, drôle, agréable, calme, patient, à l'écoute, intelligent, curieux, optimiste. On dit de moi que je suis plus extraverti qu'introverti, que la confiance que j'ai en moi peut se voir ce qui me permet d'être facilement sociable. D'après eux, j'ai aussi une personnalité forte, dans le sens où je me positionne naturellement facilement comme leader du groupe. Je sais faire preuve de sérieux, d'implication et de sang-froid lorsqu'il le faut. D'un autre coté je suis aussi quelqu'un de tétu et de fier. Je suis souvent maladroit, je manque d'habileté avec les mots lorsqu'il s'agit de m'exprimer oralement, je ne sais pas cacher mes émotions. Je suis aussi parfois égoïste. Malgré mon tempéramment calme, je peux être très sanguin sur certains sujets. Je travaille d'ailleurs cet aspect là de moi pour faire passer la réflexion avant les émotions lorsque j'explose de colère. Quand je ne me contrôle plus, je ne suis pas très sympathique ; j'envoie simplement balader le monde. Pour terminer, ma caractéristique, c'est d'apprendre de mes erreurs et de toujours voir le bon côté des situations passées, même des pires.</div>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Centres d'intérêts : <br><br>A une époque je faisais du théâtre, j'ai ensuite fais du dessin pendant 7 petites années. Entre temps j'ai fait un peu de basse et créé quelques musiques sur des logiciels dédiés. J'aime cuisiner et expérimenter des plats. Globalement j'aime toucher à tout, guidé par ma curiosité.<br>En terme de divertissement, comme beaucoup de monde, je profite des films et séries. Je lis aussi : Romans, BD, comics, mangas... Mais ce que j'aime par dessus tout, c'est jouer aux jeux vidéos. Parmi les jeux que j'affectionne on retrouvera principalement les jeux de stratégie et de gestion. Je joue aux jeux vidéos depuis très longtemps et de cette passion en a découlé une curiosité pour l'informatique. J'en ai finalement fait ma vocation. Je porte un intérêt particulier aux domaines de l'intelligence artificielle et de la robotique.</div>";
            screen.innerHTML += "<br><br><strong>L'informajoueur : </strong>\"Vous n'avez quand même pas cru que j'allais tout vous donner d'un coup, si ?! Hahaha et puis quoi encore ?! Si vous voulez vraiment toutes vos informations, va falloir encore vous friter avec moi... et gagner !\"</div>";
            break;
        }
        case "secondReward" : {
            screen.innerHTML = "<div><strong>L'informajoueur : </strong>\"Ce petit jeu était bien trop simple ! Même un enfant pourrait y arriver !\"<br><br><i>Il ouvre violemment un second tiroir et en sort une petite fiche qu'il vous jette à nouveau sous les yeux et que vous lisez attentivement.</i>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Itinéraire professionnel passé : <br><br>Je pense que ce qu'il est important de retenir, c'est que j'ai commencé à m'orienter dans l'informatique durant le lycée. J'ai eu la chance en Terminale Scientifique de pouvoir accéder à cette option \"Informatique et Sciences du Numérique\" qui m'a rendu confiant dans le fait que l'informatique pouvait me plaire. S'en est suivi un passage à l'Université Toulouse III Paul Sabatier. J'étais ainsi dans la filiaire Sciences Fondamentales Appliquées spécialité Informatique. J'ai redoublé à deux reprises ma première année pour finalement orienter ma formation vers le BTS Services Informatiques aux Organisations (SIO), avec en seconde année la spécialité Solutions Logicielles et Applications Métiers (SLAM). Ce BTS offre de nombreuses informations et permet d'approcher plusieurs domaines liés à l'informatique. Je pensais alors m'arrêter à BAC+2 ayant perdu une certaine confiance en moi lors du passage à la faculté. <br><br>Finalement j'ai été parmi le podium de la promo du BTS ce qui m'a fait envisager de continuer, au moins pour une année, mes études. Ainsi j'ai mis le cap sur une Licence Professionnelle (APSIO) en alternance. L'idée c'était de développer mon expérience professionnelle (réduite aux mois de stage réalisés en BTS) tout en continuant d'étudier. Le but final étant d'avoir un diplôme BAC+3 et 1 an d'expérience pour rentrer dans la vie active.<br><br> Bon, si vous me lisez là, vous vous doutez bien de la suite... J'ai été parmi le top de la promo de la Licence Professionnelle. Et ça, ça ouvre des portes que je n'envisageais plus atteindre après la faculté. Ainsi, poussé par ma réussite, je me suis accordé le droit de penser que je pouvais avoir accès à un Master, afin de finalement réaliser un BAC+5, être \"ingénieur\" et ainsi faciliter ma vie future. Je n'avais pas beaucoup de choix à ce moment là, puisque reprendre un Master à formation continue m'aurait privé de mes ressources financières dont je dépendais. Mon dévoulu s'est donc jeté sur le Master ICE, réalisable en alternance, disponible sur Toulouse. Et je suis vraiment heureux d'avoir réalisé ce parcours pour le moins marginal.</div>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Incidents de parcours : <br><br>Depuis tout petit, j'use de mes facilités pour réussir. Au collège j'avais de bonnes notes sans travailler. Arrivé au lycée, mes facilités n'ont plus compensé les connaissances nécessaires pour être \"bon\" scolairement parlant. J'ai sauvé mon bac de justesse et je me suis tourné automatiquement vers la faculté sans réfléchir à d'autres options. Si on remonte à mon année de Première, c'est durant les vacances de Toussaint que mon père et ma mère, jusqu'alors mariés, se sont séparés, non sans complications et violences (verbales et psychologiques). Notre père a quitté le domicile familial avant la fin des vacances, nous laissant la maison à ma mère, mon petit frère et moi. Entre frères, nous avions une relation conflictuelle. Notre mère n'avait pas énormément d'autorité, puisque c'était notre père qui assumait ce rôle. Bref, arrivé la fin de la Terminale, je me suis littéralement enfui de là-bas. Une fois sur Toulouse, j'ai été d'abord en collocation avec des amis, puis en couple dans un appartement. C'est aussi là que j'ai compris que je ne pourrais plus avoir confiance en mon père, que je ne pourrais plus compter sur lui. Mais c'est surtout durant ces deux années de faculté que je me suis reconstruit, que j'ai gagné en maturité, que j'ai profité de cette nouvelle vie pour l'apppréhender et pour fermement la prendre en main. Je n'ai pas perdu deux ans de ma vie, c'était une passe nécessaire à mon accomplissement.</div>";
            screen.innerHTML += "<br><br><strong>L'informajoueur : </strong>\"Un conseil ne prenez pas la confiance trop vite. Vous m'avez peut-être battu sur deux de mes jeux, mais j'ai encore une carte dans ma manche ! Un jeu où vous ne pourrez jamais, ô grand jamais me vaincre ! Dites \"adieu\" au reste de vos précieuses informations... héhéhé...\"<br><br><br><br><i>Il se frotte les mains tout en ricanant de manière malsaine.<br><br>Cela ne vous laisse présager rien de bon...</i>";
            break;
        }
        case "thirdReward" : {
            screen.innerHTML = "<div><strong>L'informajoueur : </strong>\"Je n'en reviens pas... Moi BATTU ?!\"<br><br><i>Plein de mauvaise foi, il refuse clairement de vous donner le reste des informations. Même pire, il met bien en évidence la fiche que vous étiez censée gagner, et il commence à la déchirer !<br><br><br><br> Ni une, ni deux, vous vous jetez sur lui pour l'empêcher de réduire à néant vos efforts. Vous l'empoignez par le col et intimidé il lâche la fiche.</i>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Compétences professionnelles : <br><br>Je pense que mes années de formation et d'expérience m'ont apporté les compétences techniques nécessaires pour m'épanouir techniquement dans mon travail. En outre, je suis quelqu'un d'autonome, je sais m'adapter aux situations que je rencontre, je m'implique beaucoup et j'irai jusqu'à dire que j'ai un souci du détail. Mon chef de projet dit de moi que j'apprends vite les choses, que je me les approprie vite. Je fais énormément attention à mon attitude. J'essaie de gérer les conflits au mieux, sans laisser mes émotions prendre le dessus (étant sanguin sur certains sujets c'est primordial pour éviter les conséquences fâcheuses d'actes et de paroles démesurés et peu intelligents). On est là pour faire avancer les choses intelligemment. Jusqu'à présent je réagissais mal aux changements, aux critiques, et au fait de m'ouvrir à de nouvelles choses. Je travaille aussi énormément cet aspect là pour modifier ce comportement enfantin, néfaste pour mon évolution personnelle et professionnelle. Je garde une attitude rigoureuse lors de mes échanges avec les autres collaborateurs, même avec ceux que je n'apprécie pas. Travailler en équipe ne me pose aucuns souci tant que l'honnêté prime. J'essaie d'être rapide et efficace dans mes réalisations, l'idée étant de répondre aux besoins dans le temps imparti.</div>";
            screen.innerHTML += "<br><br><div class='gamesTextFontFamily'>Attentes professionnelles et personnelles : <br><br>J'ai un projet ambitieux, de monter ma propre société de jeux vidéos indépendants. Pour ce faire, il faut absolument que mon expérience professionnelle se fasse dans un premier temps sur le plan technique, puis managerial.<br><br>A court terme, je souhaite continuer de faire évoluer mes connaissances techniques dans le domaine que je côtoie aujourd'hui. A moyen terme je souhaite développer des compétences de chef de projet et de relation client. Entre ces objectifs, mon envie personnelle est de réaliser un long voyage en solitaire, m'obligeant à sortir de ma zone de confort et à me dépasser afin de revenir en France (ou pas ?) avec une meilleure version de moi.</div>";
            screen.innerHTML += "<br><br><i>Vous le regardez dans les yeux et lui faites comprendre qu'il a intérêt à passer à table. Par peur de perdre ses dernières dents, il s'exclame : </i><br><br><strong>L'informajoueur : </strong>\"J'ai un dernier papier à vous montrer ! Ne soyez pas violente s'il vous plait !\"<br><br><br><br><i>Vous le lâchez et il vous tend l'ultime papier... Un CV !</i>";
            break;
        }
        case "end" : {
            document.getElementById('gamesText').style.display = "flex";
             document.getElementById('gamesText').style.flexDirection = "column";
            var innerHTML = "<object id='objData' data='/Grandchamps_C_CV.pdf' type='application/pdf'>";
            innerHTML +=  "<embed src='/Grandchamps_C_CV.pdf' type='application/pdf' />";
            innerHTML +=  "</object>";
            innerHTML += "<div>Le lien suivant vous permettra d'accéder à nos <a id='informationLinkGames' href='./informations.html'>Informations</a>.</div>";
            screen.innerHTML = innerHTML;
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
            writeCommandResults("//--- Règles du jeu n°1 ---//")
            // 3 Afficher les commandes utilisables
            docmnt.innerHTML += "<strong>ok-go : </strong>Dérouler le scénario<br>";
            break;
        }
        case "firstGame": {
            state = restartMorpionGame(state);
            writeCommandResults("//--- Jeu n°1 ---//")
            docmnt.innerHTML += "<strong>lock : </strong>Valider l'action<br>";
            docmnt.innerHTML += "<strong>restart : </strong>Recommencer la partie<br>";
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "firstReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeu n°1 ---//")
            docmnt.innerHTML += "<strong>ok-go : </strong>Dérouler le scénario<br>";
            break;
        }
        case "secondGameRules": {
            displayGameRules(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Règles du jeu n°2 ---//")
            docmnt.innerHTML += "<strong>ok-go : </strong>Dérouler le scénario<br>";
            break;
        }
        case "secondGame": {
            state = restartGuessGame(state);
            writeCommandResults("//--- Jeu n°2 ---//");
            docmnt.innerHTML += "<strong>try-nb X: </strong>Proposer le nombre X<br>";
            docmnt.innerHTML += "<strong>restart : </strong>Recommencer la partie<br>";
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "secondReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeu n°2 ---//")
            docmnt.innerHTML += "<strong>ok-go : </strong>Dérouler le scénario<br>";
            break;
        }
        case "thirdGameRules": {
            displayGameRules(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Règles du jeu n°3 ---//")
            docmnt.innerHTML += "<strong>ok-go : </strong>Dérouler le scénario<br>";
            break;
        }
        case "thirdGame": {
            state = restartShifumi(state);
            writeCommandResults("//--- Jeu n°3 ---//")
            writeCommandResults("Sélectionnez le symbole que vous voulez jouer...");
            docmnt.innerHTML += "<strong>play pierre : </strong>Jouer la pierre<br>";
            docmnt.innerHTML += "<strong>play feuille : </strong>Jouer la feuille<br>";
            docmnt.innerHTML += "<strong>play ciseaux : </strong>Jouer les ciseaux<br>";
            docmnt.innerHTML += "<strong>restart : </strong>Recommencer la partie<br>";
            docmnt.innerHTML += "<strong>skip-game : </strong>Passer la phase de jeu<br>";
            break;
        }
        case "thirdReward": {
            displayGameRewards(state.scenarioJeuxState.currentState);
            writeCommandResults("//--- Récompenses du jeu n°3 ---//")
            docmnt.innerHTML += "<strong>ok-go : </strong>Dérouler le scénario<br>";
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
    if (state.scenarioJeuxState.gameState.playerSelection && state.scenarioJeuxState.gameState.informajoueurSelection) {

        var imageJoueur = document.getElementById("p" + state.scenarioJeuxState.gameState.playerSelection);
        var connector   = document.getElementById("connector"); 
        var imageEnnemi = document.getElementById(state.scenarioJeuxState.gameState.informajoueurSelection);
        var shifumiLine = document.getElementById("shifumiLine");
        imageJoueur.classList.toggle("setInvisible");
        imageJoueur.classList.toggle("setVisible");
        connector.classList.toggle("setInvisible");
        connector.classList.toggle("setVisible");
        imageEnnemi.classList.toggle("setInvisible");
        imageJoueur.classList.toggle("setVisible");
        shifumiLine.classList.toggle("setInvisible");
        shifumiLine.classList.toggle("setVisible");
    }
    return state;
}

function shifumiPLayerSelection(state, selectedMove) {
    switch(selectedMove) {
        case "pierre" : {
            state.scenarioJeuxState.gameState.playerSelection = "pierre";
            state = shifumiInformajoueurSelection(state);
            state = resolveShifumi(state);
            state = displayShifumiResult(state);
            break;
        }
        case "feuille" : {
            state.scenarioJeuxState.gameState.playerSelection = "feuille";
            state = shifumiInformajoueurSelection(state);
            state = resolveShifumi(state);
            state = displayShifumiResult(state);
            break;
        }
        case "ciseaux": {
            state.scenarioJeuxState.gameState.playerSelection = "ciseaux";
            state = shifumiInformajoueurSelection(state);
            state = resolveShifumi(state);
            state = displayShifumiResult(state);
            break;
        }
        case "puit": {
            state.scenarioJeuxState.gameState.playerSelection = "puit";
            state = shifumiInformajoueurSelection(state);
            state = resolveShifumi(state);
            state = displayShifumiResult(state);
            break;
        }
        default : {
            writeCommandResults("Seuls les termes \"pierre\", \"feuille\", \"ciseaux\" (ou en trichant \"puit\") sont utilisables...");
            state = restartShifumi(state);
            writeCommandResults("Sélectionnez le symbole que vous voulez jouer...");
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

    var imageJoueur = document.getElementById("p" + state.scenarioJeuxState.gameState.playerSelection);
    var connector   = document.getElementById("connector"); 
    var imageEnnemi = document.getElementById(state.scenarioJeuxState.gameState.informajoueurSelection);
    var shifumiLine = document.getElementById("shifumiLine");

    imageJoueur.classList.toggle("setInvisible");
    imageJoueur.classList.toggle("setVisible");
    connector.classList.toggle("setInvisible");
    connector.classList.toggle("setVisible");
    imageEnnemi.classList.toggle("setInvisible");
    imageJoueur.classList.toggle("setVisible");
    shifumiLine.classList.toggle("setInvisible");
    shifumiLine.classList.toggle("setVisible");

    
    setTimeout(() => {
        var resultHtmlElement = document.getElementById('shifumiResult');
        var resultHtmlContent = "";
        var timeToWait = 3000;
        switch (state.scenarioJeuxState.gameState.isFinished) {
            case "equality" : {
                resultHtmlContent = "<div class='gamesTextAlign gamesTextUnderline'>Égalité</div><br><br><strong>L'informajoueur :</strong> \"La victoire ne vous appartient toujours pas... Il en va de même pour les informations qu'il vous reste à découvrir !\"</div>";
                writeCommandResults("//--- Ex aequo ---//")
                break;
            }
            case "lost": {
                resultHtmlContent = "<div class='gamesTextAlign gamesTextUnderline'>Perdu</div><br><br><strong>L'informajoueur :</strong> \"Vous n'êtes vraiment pas de taille... Me délecter de vos défaites m'accorde un plaisir que vous n'imaginez même pas héhé...\"</div>";
                writeCommandResults("//--- Vous avez perdu ---//")
                break;
            }
            case "won": {
                if (state.scenarioJeuxState.gameState.playerSelection === "puit") {
                    resultHtmlContent = "<div class='gamesTextAlign gamesTextUnderline'>L'intervention mystique d'un Merlin sauvage vous fait gagner !</div><br><br><strong>L'informajoueur :</strong> \"Ce maudit vieillard vient encore perturber mes affaires !\"</div>";
                    timeToWait = 5000;
                } else {
                    resultHtmlContent = "<div class='gamesTextAlign gamesTextUnderline'>Gagné</div><br><br><strong>L'informajoueur :</strong> \"C'est impossible !\"</div>";
                }
                setTimeout(() => {
                    state = launchGameStep(skipCurrentState(state));
                }, timeToWait);
                break;
            }
            default: {
                break;
            }
        }
        resultHtmlElement.innerHTML = resultHtmlContent;
    }, 1500);
    return state;
}

/* COMMON FUNCTIONS */

function getRandom(multiplicator) {
    return Math.floor(Math.random() * multiplicator);
}