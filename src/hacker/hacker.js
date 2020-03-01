function getInputedText() {
    return document.getElementsByTagName("INPUT")[0].value;
}

function hackingScenario(commandKey, commandOptions, scenarioState) {
    switch (scenarioState.name) {
        case "intialisation":
            {
                scenarioState = "defend1";
                break;
            }
        case "defend1":
            {
                scenarioState = matchCommande(commandKey, commandOptions, scenarioState)
                break;
            }
        case "recovery1":
            {
                scenarioState = matchCommandeDefend1(commandKey, commandOptions, scenarioState);
                break;
            }
        case "defend2":
            {
                scenarioState = "recovery2";
                break;
            }
        case "recovery2":
            {
                scenarioState = "defend3";
                break;
            }
        case "defend3":
            {
                scenarioState = "recovery3";
                break;
            }
        case "recovery3":
            {
                scenarioState = "end";
                break;
            }

        case "end":
            {
                break;
            }
        default:
            console.log("hackingScenario - invalid scenario state");
            scenarioState.name = "intialisation";
            break;
    }
    console.log(scenarioState)
    return scenarioState;
}


function matchHackingSubState(commandKey, commandOptions, scenarioState) {
    switch (scenarioState.name) {
        case value:

            break;

        default:
            break;
    }
}

function matchCommandeDefend1(commandKey, commandOptions, scenarioState) {

    if (!isPreviousCmdSucced) {
        return scenarioState;
    }
    // première réponse
    if (isPreviousCmdSucced && scenarioState.previousCmd == "") {
        scenarioState.previousCmd = "block";
    }
    if (isPreviousCmdSucced && scenarioState.previousCmd == "block") {
        scenarioState.previousCmd = "changeIp";
    }
    if (isPreviousCmdSucced && scenarioState.previousCmd == "changeIp") {
        scenarioState.previousCmd = "delete";
    }
    if (isPreviousCmdSucced && scenarioState.previousCmd == "delete") {
        scenarioState.previousCmd = "";
    }

    return scenarioState;
}

function documentationHack1() {

}

function documentationHack2() {

}

function documentationHack3() {

}

function documentationHackGeneral() {

}

function commandsHacking(commandKey, commandOptions, applicationState) {
    switch (commandKey) {
        case "bypass":
            {
                applicationState = "scenariosSelection";
                document.getElementById("menu").style.display = "flex";
                document.getElementById("displayScreenTitle").style.display = "flex";
                displayAvailableCommands(applicationState);
                writeCommandResults("Retour à l'écran principal de l'application.");
                break;
            }

    }
    return applicationState;
}

// au lancement afficher un texte pour indiquer que le pc est hacké
// 1 ensemble de commande défensif
// netscan + ssh --forcePassword root@192.168.1.156
// message success
// cat info.txt
// mais avant d'être arrivé à lister les fichiers -> deuxieme attaque
// 2 ensemble de commande
// ls -aR -> cat info.txt + cat readme.md qui dit qu'il faut aller dans recrutement ... 
// cd /root/Desktop/Recrutement MAIS attaque
// 3 eme sequense de commande
// cd /root/Desktop/Recrutement + ls
// cat info.txt 
// scp root@192.168.1.156:/root/Desktop/Recrutement ~/root/Desktop/
// lien de téléchargement du fichier