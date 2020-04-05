var hackerDocElement = document.getElementById("docScenarioHacking");

function launcherHack(state) {

    // document.getElementById("hackingTextBox").display = "flex";
    switch (state.scenarioHackingState.name) {
        case "initialisation":
            {
                document.getElementById("hackingTextBox").innerHTML = textInitialisation();
                break;
            }
        case "defend1":
            {
                document.getElementById("hackingTextBox").innerHTML = textDefend1();
                break;
            }
        case "recovery1":
            {
                document.getElementById("hackingTextBox").innerHTML = textRecovery1();
                break;
            }
        case "defend2":
            {
                document.getElementById("hackingTextBox").innerHTML = textDefend2();
                break;
            }
        case "recovery2":
            {
                document.getElementById("hackingTextBox").innerHTML = textRecovery2();
                break;
            }
        case "defend3":
            {
                document.getElementById("hackingTextBox").innerHTML = textDefend3();
                break;
            }
        case "recovery3":
            {
                document.getElementById("hackingTextBox").innerHTML = textRecovery3();
                break;
            }

        case "end":
            {
                document.getElementById("hackingTextBox").innerHTML = textEnd();
                break;
            }
        default:
            console.log("hackingScenario - invalid scenario state");
            state.scenarioHackingState.name = "initialisation";
            break;
    }
    return state;
}


function hackingScenario(commandKey, commandOptions, state) {
    if (commandKey != "bypass") {
        switch (state.scenarioHackingState.name) {
            case "initialisation":
                {
                    state = matchCommandeInit(commandKey, commandOptions, state);
                    break;
                }
            case "defend1":
                {
                    state = matchCommandeDefend1(commandKey, commandOptions, state);
                    break;
                }
            case "recovery1":
                {
                    state = matchCommandeRecovery1(commandKey, commandOptions, state);

                    break;
                }
            case "defend2":
                {
                    state = matchCommandeDefend2(commandKey, commandOptions, state);
                    break;
                }
            case "recovery2":
                {
                    state = matchCommandeRecovery2(commandKey, commandOptions, state);
                    break;
                }
            case "defend3":
                {
                    state = matchCommandeDefend3(commandKey, commandOptions, state);
                    break;
                }
            case "recovery3":
                {
                    state = matchCommandeRecovery3(commandKey, commandOptions, state);
                    break;
                }

            case "end":
                {
                    state = matchCommandeEnd(commandKey, commandOptions, state);
                    break;
                }
            default:
                console.log("hackingScenario - invalid scenario state");
                state.scenarioHackingState.name = "initialisation";
                break;
        }
    } else {
        bypass(state);
    }
    console.log(state.scenarioHackingState);
    return state;
}

function bypass(state) {
    switch (state.scenarioHackingState.name) {
        case "initialisation":
            {
                state.scenarioHackingState.name = "recovery1";
                document.getElementById("hackingTextBox").innerHTML = textRecovery1();
                break;
            }
        case "defend1":
            {
                state.scenarioHackingState.name = "recovery1";
                document.getElementById("hackingTextBox").innerHTML = textRecovery1();
                break;
            }
        case "recovery1":
            {
                state.scenarioHackingState.name = "recovery2";
                document.getElementById("hackingTextBox").innerHTML = textRecovery2();
                break;
            }
        case "defend2":
            {
                state.scenarioHackingState.name = "recovery2";
                document.getElementById("hackingTextBox").innerHTML = textRecovery2();
                break;
            }
        case "recovery2":
            {
                state.scenarioHackingState.name = "recovery3";
                document.getElementById("hackingTextBox").innerHTML = textRecovery3();
                break;
            }
        case "defend3":
            {
                state.scenarioHackingState.name = "recovery3";
                document.getElementById("hackingTextBox").innerHTML = textRecovery3();
                break;
            }
        case "recovery3":
            {
                state.scenarioHackingState.name = "end";
                document.getElementById("hackingTextBox").innerHTML = textEnd();
                break;
            }

        case "end":
            {
                writeCommandResults("Vous vous trouvez déjà à la fin du scénario. Vous ne pouvez pas allez plus loin.");
                break;
            }
        default:
            console.log("error in bypass");
            break;
    }
    return state;
}

function matchCommandeInit(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "initialisation") {
        return state;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced && state.scenarioHackingState.previousCmd == "") {
        if (commandKey == "start" && commandOptions == "--debugger-sys") {
            writeCommandResults("Vous venez de débloquer le debugger avancé système. Vous pouvez utiliser l'ensemble des commandes systèmes");
            state.scenarioHackingState.previousCmd = "";
            state.scenarioHackingState.name = "defend1";
            // hackerDocElement.style.display = "flex";
            // hackerDocElement.innerHTML = documentationHackDefend1();
            document.getElementById("hackingTextBox").innerHTML = textDefend1();
            setSkullImg();
        } else {
            state = commandsScenariosUtilities(commandKey, commandOptions, state);
        }
    }

    return state;
}

function matchCommandeDefend1(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "defend1") {
        return state;
    }
    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "block" && commandOptions == "--all-port") {
                writeCommandResults("Tous les ports de connexions ont bien été fermés.")
                state.scenarioHackingState.previousCmd = "block";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "block":
            if (commandKey == "changeIp") {
                writeCommandResults("Nouvelle Ip allouée : 197.12.68.49");
                state.scenarioHackingState.previousCmd = "changeIp";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "changeIp":
            if (commandKey == "rm" && commandOptions[0] == "-rf" && commandOptions[1] == "/root/spy/*") {
                writeCommandResults("Les fichiers espions ont bien été effacés.");
                state.scenarioHackingState.previousCmd = "delete";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "delete":
            if (commandKey == "open" && commandOptions == "--all-port") {
                writeCommandResults("Tout les ports de connexions ont bien été ouverts.")
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "recovery1";
                document.getElementById("hackingTextBox").innerHTML = textRecovery1();
                setRobotImg();
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }
    return state;
}

function matchCommandeDefend2(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "defend2") {
        return state;
    }

    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "restore" && commandOptions[0] == "--all" && commandOptions[1] == "firewall") {
                writeCommandResults("Tout les ports de connexions ont bien été fermés.")
                state.scenarioHackingState.previousCmd = "restore";
            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "restore":
            if (commandKey == "rsa" && commandOptions[0] == "-gc" && commandOptions[1] == "--new-key") {
                writeCommandResults("Régénration des clées privées rsa. Les clées publiques restent inchangées")
                state.scenarioHackingState.previousCmd = "rsa";
            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "rsa":
            if (commandKey == "apply" && commandOptions[0] == "--rsa-key" && commandOptions[1] == "fireWall") {
                writeCommandResults("Encodage des sources des fireWall terminée.")
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "recovery2";
                // hackerDocElement.style.display = "flex";
                // hackerDocElement.innerHTML = documentationHackRecovery2();
                document.getElementById("hackingTextBox").innerHTML = textRecovery2();
                setRobotImg();
            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }

    return state;
}


function matchCommandeDefend3(commandKey, commandOptions, state) {

    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "defend3") {
        return state;
    }
    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "exec" && commandOptions == "windowsDefender.exe") {
                writeCommandResults("Windows Defender actif...")
                state.scenarioHackingState.previousCmd = "exec";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "exec":
            if (commandKey == "listen" && commandOptions == "-a") {
                writeCommandResults("Ecoute de tous les fichiers en attente d'une analyse.");
                state.scenarioHackingState.previousCmd = "listen";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "listen":
            if (commandKey == "start" && commandOptions[0] == "analysis") {
                writeCommandResults("Suppression de toutes les menaces terminées. Votre système est sécurisé.");
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "recovery3";
                // hackerDocElement.style.display = "flex";
                // hackerDocElement.innerHTML = documentationHackRecovery3();
                document.getElementById("hackingTextBox").innerHTML = textRecovery3();
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }
    return state;
}

function matchCommandeRecovery1(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "recovery1") {
        return state;
    }
    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "netscan") {
                writeCommandResults("IP : 192.168.1.156")
                state.scenarioHackingState.previousCmd = "netscan";
            } else {
                commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "netscan":
            if (commandKey == "ssh" && commandOptions[0] == "--forcePassword" && commandOptions[1] == "root@192.168.1.156") {
                writeCommandResults("Connexion ssh réussi, le mot de passe est 'root'");
                writeCommandResults("Les fichiers présents sont : <li>info.txt</li><li>root.pwd</li><li>issous.png</li></<li>");
                state.scenarioHackingState.previousCmd = "ssh";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "ssh":
            if (commandKey == "cat" && commandOptions == "info.txt") {
                writeCommandResults("Ouverture du fichier info.txt");

                //  TODO animation hack + new text
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "defend2";
                // hackerDocElement.style.display = "flex";
                // hackerDocElement.innerHTML = documentationHackDefend2();
                document.getElementById("hackingTextBox").innerHTML = textDefend2();
                setSkullImg();
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }
    return state;
}

// ls -aR -> cat info.txt + cat readme.md qui dit qu'il faut aller dans recrutement ... 
function matchCommandeRecovery2(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "recovery2") {
        return state;
    }

    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "ls" && commandOptions == "-aR") {
                // folder liste
                // one folder
                // file list
                // one folder
                // file list

                var cmdResult = "Listing du contenu du fichier :<ul><li>syteme/<ul><li>win32.exe</li><li>lib.c</li><li>daemon/</li></ul><ul><li>Recrutement/<ul><li>????</li></ul></li><li>info.txt</li><li>readme.md</li></ul>";

                writeCommandResults(cmdResult);
                document.getElementById("hackingTextBox").innerHTML = getHelpForLS();
                state.scenarioHackingState.previousCmd = "ls";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "ls":
            if (commandKey == "cat" && commandOptions == "info.txt") {
                writeCommandResults("Ouverture du fichier info.txt");
                document.getElementById("hackingTextBox").innerHTML = getFirstBlocQuentin();
                state.scenarioHackingState.previousCmd = "cat-info";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "cat-info":
            if (commandKey == "cat" && commandOptions == "readme.md") {
                writeCommandResults("Ouverture du fichier readme.md");
                document.getElementById("hackingTextBox").innerHTML = getReadMeText();
                state.scenarioHackingState.previousCmd = "cat";
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        case "cat":
            if (commandKey == "cd" && commandOptions == "Recrutement") {
                writeCommandResults("Déplacement vers /root/Desktop/Recrutement");
                document.getElementById("hackingTextBox").innerHTML = getReadMeText();
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "defend3";
                // hackerDocElement.style.display = "flex";
                // hackerDocElement.innerHTML = documentationHackDefend3();
                document.getElementById("hackingTextBox").innerHTML = textDefend3();
                setSkullImg();
            } else {
                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;
        default:
            break;
    }
    return state;
}

function matchCommandeRecovery3(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "recovery3") {
        return state;
    }
    // première réponse
    if (state.scenarioHackingState.isPreviousCmdSucced) {
        switch (state.scenarioHackingState.previousCmd) {
            case "":
                if (commandKey == "exit") {
                    writeCommandResults("Déconnexion de l'hôte distant.Retour sur localUser")
                    state.scenarioHackingState.previousCmd = "exit";
                } else {

                    state = commandsScenariosUtilities(commandKey, commandOptions, state);
                }
                break;
            case "exit":
                if (commandKey == "scp" && commandOptions[0] == "root@192.168.1.156:/root/Desktop/Recrutement" && commandOptions[1] == "~/root/Desktop/") {
                    writeCommandResults("Téléchargment des fichiers...")
                    writeCommandResults("Fichiers Récupérés.")
                    state.scenarioHackingState.previousCmd = "";
                    state.scenarioHackingState.name = "end";
                    // hackerDocElement.style.display = "flex";
                    // hackerDocElement.innerHTML = documentationHackEnd();
                    document.getElementById("hackingTextBox").innerHTML = textEnd();

                } else {

                    state = commandsScenariosUtilities(commandKey, commandOptions, state);
                }
                break;
        }
    }
    return state;
}

function matchCommandeEnd(commandKey, commandOptions, state) {
    if (!state.scenarioHackingState.isPreviousCmdSucced || state.scenarioHackingState.name != "end") {
        return state;
    }

    switch (state.scenarioHackingState.previousCmd) {
        case "":
            if (commandKey == "reset") {
                writeCommandResults("Le scenrario a bien été réinitialisé.")
                state.scenarioHackingState.previousCmd = "";
                state.scenarioHackingState.name = "initialisation";
                // hackerDocElement.style.display = "flex";
                // hackerDocElement.innerHTML = documentationHackInit();
                document.getElementById("hackingTextBox").innerHTML = textInitialisation();
            }
            if (commandKey == "getText") {
                writeCommandResults("Voici l'ensemble des paragraphes ainsi qu'un lien de téléchargement pour le CV.")
                state.scenarioHackingState.previousCmd = "";
                document.getElementById("hackingTextBox").innerHTML = textEnd();
            } else {

                state = commandsScenariosUtilities(commandKey, commandOptions, state);
            }
            break;

    }
    return state;
}

function documentationHackDefend1() {
    var str = "<h2>Bloquer une tentative d'accès pirate : </h2>";
    str += "<strong>block --all-port : </strong>Ferme tous les ports écoutant un réseau distant out local<br><br>";
    str += "<strong>changeIp : </strong>Change votre adresse virtuelle<br><br>";
    str += "<strong>rm -rf /root/spy/* : </strong>Efface le contenu du répertoire spy contenant des écouteurs de clavier<br><br>";
    str += "<strong>open --all-port : </strong>Ouvre tous les ports<br><br>";

    return str;
}

function documentationHackDefend2() {
    var str = "<h2>Régénérer ses ressources secrètes  : </h2>";
    str += "<strong>restore --all firewall : </strong>Ré-initialise les parefeux en d'une nouvelle génération<br><br>";
    str += "<strong>rsa -gc --new-key : </strong>Créé une clé publique et une clé privée selon le protocole RSA<br><br>";
    str += "<strong>apply --rsa-key fireWall : </strong>Génére les parties secrètes des parefeux grâce à une clé privée<br><br>";

    return str;
}

function documentationHackDefend3() {
    var str = "<h2>Lancement d'une analyse complète : </h2>";
    str += "<strong>exec windowsDefender.exe : </strong>Lance windows defender en mode administateur<br><br>";
    str += "<strong>listen -a : </strong>Ecoute le contenu du disque.<br><br>";
    str += "<strong>start analysis : </strong>Lance une analyse complète des fichiers selectionnés.<br><br>";

    return str;
}

function documentationHackRecovery1() {
    var str = "<h2>Manipulation distante : </h2>";
    str += "<strong>netscan : </strong> Affiche les adresses IPv4 connectées au client  <br><br>";
    str += "<strong>ssh --forcePassword root@192.168.1.156 : </strong>Connecte le terminal à l'hôte distant désigné.<br><br>";
    str += "<strong>cat info.txt : </strong>Lit le contenu du fichier désigné.<br><br>";

    return str;
}

function documentationHackRecovery2() {
    var str = "<h2>Manipulation distante : </h2>";
    str += "<strong>ls -aR : </strong>Liste tout les fichiers et les dossiers de l'arborescence<br><br>";
    str += "<strong>cat info.txt : </strong>Lit le contenu du fichier désigné.<br><br>";
    str += "<strong>cat readme.md : </strong>Lit le contenu du fichier désigné.<br><br>";
    str += "<strong>cd Recrutement : </strong>Déplacement vers le dossier ciblé.<br><br>";

    return str;
}

function documentationHackRecovery3() {
    var str = "<h2>Téléchargement distant : </h2>";
    str += "<strong>exit : </strong> Se déconnecte de la session ssh en cours. <br><br>";
    str += "<strong>scp root@192.168.1.156:/root/Desktop/Recrutement ~/root/Desktop/ : </strong>Télécharge le fichier depuis un hôte distant.<br><br>";

    return str;
}

function documentationHackEnd() {
    var str = "<h2>Téléchargement distant : </h2>";
    str += "<strong>reset : </strong> Recommence le scenério de hacking depuis le debut. <br><br>";
    str += "<strong>getText : </strong>Affiche un lien de téléchargement pour le cv ainsi que tous les textes.<br><br>";

    return str;
}

function documentationHackInit() {
    var str = "<h2>Lancement d'outil logiciel : </h2>";
    str += "<strong>start --debugger-sys : </strong> Lance le debugger système. <br><br>";

    return str;
}

function documentationHackGeneral() {

}

function getReadMeText() {
    hideAllImg();
    return "<h2>Contenu du fichier readme.md:</h2><div class='fileLaF'>" +
        'Toutes les informations personnelles sont dans le répertoire Recrutement' +
        '</div><br>Taper la commande suivante pour continuer.';
}

function textInitialisation() {
    setTasseImg();
    return '<strong>HACKING : </strong><br> <br>' +
        'Bienvenue au cybercafé "TrapedMouse", vous pouvez utiliser ce réseau comme bon vous semble.' +
        '<br>' +
        'Nous nous dédouanons de toute activité frauduleuse. ' +
        '<br><br><br>Erreur dans votre tentative de connexion.... Entrez la commande de deboggage. <br>';
}


function textDefend1() {
    return 'Bienvenue très chère victime, je suis Anonymous et je détiens un accès à l\'intégralité de vos données.' +
        '<br>' +
        '<br>' +
        'Donnez moi 500 bitcoins si vous ne souhaitez pas que je détruise vos précieuses informations.' +
        '<br>' +
        'N\'appeler aucun organisme de police, je contrôle aussi vos communications sur vos autres appareils.';
}

function textRecovery1() {
    return 'Bzzzzzz ..' +
        'Activé suspecte détectée..... <br>' +
        'Activation du protocole de sécurité A.L.Y.S ....<br><br>' +
        'Bonjour, je suis A.L.Y.S, une intelligence codée par un étudiant qui vient tuer le temps dans ce cyber café. <br>' +
        'A force de voir mon créateur travailler, j\'ai acquis des connaissances en informatique. ' +
        'Je connais votre situation et je vais vous aider. Regardez sur la droite de votre écran, j\'y ai déposé les instructions à suivre.<br> Exécutez les dans l\'ordre et tout se passera bien.'
}

function textDefend2() {
    return 'Que croyez vous faire. JE CONTROLE VOTRE POSTE. Abandonnez tout espoir et payez. Sinon mes représailles seront infinies.<br>' +
        'Toutes vos protections sont sous mon joug et je peux décider d\'ouvrir votre machine aux pirates du monde entier.<br>' +
        'Ils ne sont pas tous aussi patients que moi.';
}

function textRecovery2() {
    return 'Merci, apparemment ce malotru peut interrompre mon fonctionnement à tout instant. Profitons de ce court répit pour reprendre le contrôle de la situation. <br>' +
        'Par chance, il ne peut pas effacer mes instructions dans la documentation. Et heuresement. <br>' +
        'Bien, dans la séquence précédente, je me suis permis de vous faire accéder à l\'ordinateur de votre attaquant.<br>' +
        'Nous allons retourner ses armes contre lui. Commencez par lister ce qu\'il y a sur sa machine. Puis nous allons essayer de récupérer des informations sur cet humain.<br>';
}

function textDefend3() {
    return 'Comment avez vous fait pour vous introduire dans mon ordinateur.. Pfff, j\'aurais mieux fait d\'écouter pendant les cours de sécurtié. "root" comme mot de passe c\'est pas fou fou <br>' +
        'Bref je digresse, puisque je ne peux vous raisonner, je vais devoir déployer toute ma base de données de virus afin de m\'assurer qu\'il vous poursuivent jusqu\'en enfer.<br>' +
        'Dès qu\'ils pourront vous associer avec un appareil ce dernier sera tout simplement détruit.<br> CECI EST VOTRE DERNIERE CHANCE. Payez rapidement !!!! ' +
        'Il s\'agit ici de mon dernier avertissement.';
}

function textRecovery3() {
    return 'Bien joué, nous avons réussi à accéder à son ordinateur. nous pouvons tout savoir de lui. <br>' +
        'Lancez le téléchargement des données et quittez la connexion au plus vite, histoire de pouvoir lire tout ça au calme.';
}

function hideAllImg() {
    document.getElementById('img-tasse').style.display = "none";
    document.getElementById('img-robot').style.display = "none";
    document.getElementById('img-skull').style.display = "none";
}

function setSkullImg() {
    hideAllImg();
    document.getElementById('img-skull').style.display = "block";
}


function setTasseImg() {
    hideAllImg();
    document.getElementById('img-tasse').style.display = "block";
}

function setRobotImg() {
    hideAllImg();
    document.getElementById('img-robot').style.display = "block";
}


function textEnd() {
    // il faut récap tout les textes + lien du cv + dire que l'on veut reset
    return 'Merci d\'avoir joué à ce mini-jeux. Vous avez battu le hackeur et toucher du doigt l\'utilisation d\'une console, appelé aussi terminal.<br>En récompense voici une prévisualisation de mon CV qui est téléchargeable. Vous pouvez retrouver toutes les informations en suivant <a class="whiteLink" href="/informations" >ce lien</a>' + getPdfPreview();
}


function getFirstBlocQuentin() {
    hideAllImg();
    return "<h2>Contenu du fichier info.txt:</h2><div class='fileLaF'>" +
        '' +
        '</div><br>Taper la commande suivante pour continuer.';
}

function getSecondBlocQuentin() {
    hideAllImg();
    return "<h2>Contenu du fichier info.txt:</h2><div class='fileLaF'>" +
        '' +
        '</div><br>Taper la commande suivante pour continuer.';
}

function getThirdFirstBlocQuentin() {
    hideAllImg();
    return "<h2>Contenu du fichier info.txt:</h2><div class='fileLaF'>" +
        '' +
        '</div><br>Taper la commande suivante pour continuer.';
}

function getDescriptionHacking() {
    hideAllImg();
    return ' <strong>HACKING : </strong><br>' +
        '<br> Dans ce scénario vous allez devoir saisir des commandes afin de riposter face à un hackeur et lui dérober ses données.' +
        '<br> TeL est prit qui croyait prendre.' +
        '<br> Vous ne serez pas seule. Un allié de taille vous donnera des instructions pour réussir.' +
        '<br> Suivez scrupuleusement la documentation que cet adjuvant vous écrit.' +
        '<br> Les commandes sont à saisir dans l\'ordre d\'apparition dans la documentation.' +
        '<br> Restez bien attentif au résultat des commandes. (dans l\'encart juste au-dessus de la ligne de saisie.)';
}

function getPdfPreview() {

    // document.getElementById('hackingTextBox').style.display = "flex";
    var innerHTML = "<object id='objData' data='/quentin_ceschin_cv.pdf' type='application/pdf'>";
    innerHTML += "<embed src='/quentin_ceschin_cv.pdf' type='application/pdf' />";
    innerHTML += "</object>";
    return innerHTML;
}

function getHelpForLS() {
    return 'Parfait, nous connaissons une partie du contenue de son disque. Je vous conseille de lire le fichier <strong>info.txt</strong> ainsi que le fichier <strong>readme.md</strong> avec fouiller le reste des dossiers. <br>' +
        'Suivez les instructions dans la documentation.';
}