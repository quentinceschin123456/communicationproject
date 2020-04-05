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
        writeCommandResults("Vous avez passez un bout du scénario.")
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

function displayBypassCommand() {
    document.getElementById('DocBypass').style.display = "block";
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

function documentationHackBypass() {

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
        textQuentinHeader() +
        textQuentinWishes() +
        textQuentinPersonality() +
        '</div><br>Taper la commande suivante pour continuer.';
}

function getSecondBlocQuentin() {
    hideAllImg();
    return "<h2>Contenu du fichier info.txt:</h2><div class='fileLaF'>" +
        textQuentinHeader() +
        textQuentinAbilities() +
        textQuentinInterest() +
        '</div><br>Taper la commande suivante pour continuer.';
}

function getThirdFirstBlocQuentin() {
    hideAllImg();
    return "<h2>Contenu du fichier info.txt:</h2><div class='fileLaF'>" +
        textQuentinHeader() +
        textQuentinHistoric() +
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

function textQuentinWishes() {
    return '&nbsp;&nbsp;&nbsp;&nbsp;<u>Mes attentes professionnelles et personnelles : </u><br><br>J’aimerais atteindre le statut de cadre ou de chef d’équipe car le management d’une petite équipe autant sur le plan humain que technique me ' +
        'semble très intéressant et formateur. Je souhaite cependant garder une majorité de mon temps pour développer et vraiment faire partie de l’équipe. Je souhaite me placer en tant qu’expert métier car cela nécessite beaucoup de connaissance ' +
        'et de recherche, deux aspects que je trouve important de maîtriser pour se considérer comme un bon informaticien.';
}

function textQuentinAbilities() {
    return '&nbsp;&nbsp;&nbsp;&nbsp;<u></u>Mes compétences professionnelles : </u><br><br>Dans le monde du développement, je me place en tant que développeur fullstack, c’est-à-dire que mes compétences sont réparties un peu partout dans le' +
        ' domaine du logiciel. En effet côté back-end (Traitement métiers) : <br>Mes formations passées étaient fortement axées sur ce domaine. J’y ai appris à coder en Java, C#, Python et PHP. Comme vous pouvez le voir avec ces technologies,' +
        ' je suis surtout formé autour de la programmation orientée objet. Ce concept est de plus en plus populaire et ce n’est pas pour me déplaire car j’adore tout simplement ça. Une grande partie de mon travail repose sur ma capacité' +
        ' à bien programmer selon cette philosophie, ce qui garantit une bonne qualité de développement. <br>Coté front-end, c’est en entreprise que j’ai pu vraiment découvrir cet univers notamment via l’apprentissage de Web (HTML/CSS/JS)' +
        ' et surtout la découverte du framework Vue.js. De ce fait j’ai appris à monter des sites internet complexes, sécurisés et maintenables.<br>De plus j’ai été sensibilisé via mes cours au devops et entrainé grâce à des projets personnels' +
        ' qui m’ont permis d’apprendre à mettre en place le CI/CD (Continious Integration / Continious Delivery) et bien comprendre cet univers. <br>Coté compétence humaine, j’ai l’habitude de travailler en équipe (souvent agile) et j’apprécie' +
        ' beaucoup le travail à plusieurs. Je sais comment me comporter en entreprise, autant sur le plan professionnel que sur le plan humain, et comment me montrer volontaire afin de communiquer ma motivation à tout le reste de l’équipe.' +
        ' Je suis bon communicant et j’arrive à tisser des liens professionnels avec tous mes collègues afin de pouvoir collaborer dans de bonne conditions.';
}

function textQuentinHistoric() {
    return '&nbsp;&nbsp;&nbsp;&nbsp;<u>Mon itinéraire professionnel/scolaire passé : </u><br><br>Suite à mon baccalauréat scientifique, je me destinais à des études de chimie. Dans cette optique, j’ai intégré l’IUT de Castres. Cependant cette ' +
        'première année post-bac ne s’est pas bien passée. En effet, je manquais un peu de maturité et surtout de connaissance sur le monde des études supérieures.De plus, j\'ai pu m\'apercevoir que cette voie ne me plaisait pas du tout.' +
        '<br>Je me suis donc réorienté vers un nouveau domaine, l’informatique. Je suis alors entré en première année de DUT informatique à l’IUT de Blagnac. En découvrant ce domaine, j’ai fait la connaissance d’un monde qui me passionne ' +
        'aujourd’hui. <br>Dans l’optique de faire un parcours jalonné, j’ai fait une licence professionnelle APSIO, situé à l’IUT de Blagnac, en alternance qui est spécialisée dans le développement logiciel. J’ai choisi Synapse Développement ' +
        'comme entreprise de par son expertise en intelligence artificielle appliquée au langage naturel et de son cadre. Cette année s’est très bien passé. Puis j’ai poursuivi avec le Master ICE à l’université Toulouse II Jean Jaurès en ' +
        'alternance dans la même entreprise que la licence professionnelle, dans l’optique de terminer mon cursus et d’avoir un avis sur la recherche informatique qui est très bien représentée dans ce master.';
}

function textQuentinInterest() {
    return '&nbsp;&nbsp;&nbsp;&nbsp;<u>Mes centres d\'intérêt : </u><br><br>Je suis un grand passionné de jeux vidéo, notamment des jeux rôles et d’aventure. Ils me permettent de voyager dans des contrées irréelles aux lois propres. Cette évasion' +
        ' permet de faire travailler mon imaginaire et stocker des bonnes idées pour mes futures applications. <br>J’apprécie beaucoup les jeux en équipe et en coopération, car s’amuser avec ses amis permet de nouer des liens qui, mêmes' +
        ' à distance, resteront solide. De plus la gestion d’une équipe, ainsi que du conflit et du mental sont des aspects que j’apprécie beaucoup car ce sont pour moi des notions presque aussi importantes qu’avoir un bon niveau de jeu.' +
        ' <br>Bien sûr comme tout bon informaticien, j’aime bien les nouvelles technologies dont je surveille les avancées. Qui sait, peut-être que le programme ultime est à portée de main. Notamment les progrès en intelligence artificielle' +
        ' ou la robotique qui sont pour moi les deux axes prometteurs. <br>Quand j’ai un peu plus de temps libre, je retrouve une bande de copains, pour aller faire de l’escalade en salle. Il s’agit d’une activité sportive que j’apprécie' +
        ' énormément notamment par la présence de mes amis mais aussi car cette discipline demande un certain niveau de dépassement de soi. La progression se fait par à-coup mais reste très satisfaisante et l’entraide permet de ne pas rester' +
        ' bloquer sur un obstacle trop longtemps.';
}

function textQuentinPersonality() {
    return "&nbsp;&nbsp;&nbsp;&nbsp;<u>Mes traits de personnalités : </u><br><br> Après avoir demandé à mon entourage comment il me voit, il en est ressorti plusieurs grands axes :" +
        "<ul>" +
        "<li>La gentillesse et la bienveillance, notamment via mes conseils et ma capacité d’écoute. Peu importe le cadre, je suis là pour les aider, collègues ou amis, afin de ne laisser personnes se faire dépasser par ses difficultés." +
        "</li>" +
        "<li>Les actions réfléchies, je fais des choix très logiques voir pragmatiques et raisonnés car la logique fait entièrement partie de ma personne. Elle est cependant originale de par la vision qu’elle apporte, ce qui peut sembler " +
        "être non adapté au premier abord. Mais son exercice, mes compagnons s’aperçoivent que mes actions ont un but qu’ils n’avaient pas vu.</li>" +
        "<li>La capacité à prendre le lead, c’est une chose que je fais quand il est nécessaire de prendre des décisions et que personne ne souhaite s’en occuper. J’exploite mes capacités en conception ainsi que des principes managériaux " +
        "simples, que j’ai pu observer en entreprise ou apprendre en cours.</li>" +
        "<li>Je suis de nature stressé, le sachant je fais des efforts pour le contrebalancer mieux mais je travaille mal sous la pression. Malheureusement, je n’ai pas choisi la profession la plus calme et j’apprends au travers de la vie " +
        "en entreprise à le gérer. J’ai tendance à m’enfermer sur moi-même dans les situations tendues par soucis de ne pas vouloir perturber mes camarades qui subissent, eux aussi, cette pression. </li>" +
        "</ul>";
}

function textQuentinHeader() {
    return "<br>Informations pourtant sur Quentin CESCHIN.<br>";
}