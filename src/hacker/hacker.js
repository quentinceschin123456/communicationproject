function getInputedText() {
    return document.getElementsByTagName("INPUT")[0].value;
}

function hackingScenario(scenarioState) {
    // var text = getInputedText();
    console.log(scenarioState)
    switch (scenarioState) {
        case "intialisation":
            {
                scenarioState = "defend1";
                break;
            }
        case "defend1":
            {
                scenarioState = "recovery1";
                break;
            }
        case "recovery1":
            {
                scenarioState = "defend2";
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
            scenarioState = "intialisation";
            break;
    }
    console.log(scenarioState)
    return scenarioState;
}


function nextCommand(currentState) {

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