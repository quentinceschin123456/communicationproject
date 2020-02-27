function getInputedText(){
    return document.getElementsByTagName("INPUT")[0].value;
}

function hackingScenario() {
    var text = getInputedText();
    console.log(text)
    // switch (text) {
    //     case "menu": {
    //         document.getElementById("menu").style.display = "flex";
    //         document.getElementById("displayScreenTitle").style.display = "flex";
    //         displayAvailableCommands("scenariosSelection");
    //         writeCommandResults("Retour à l'écran principal de l'application.");
    //         break;
    //     }
    //     case "bypass": {
    //         document.getElementById("menu").style.display = "flex";
    //         document.getElementById("displayScreenTitle").style.display = "flex";
    //         displayAvailableCommands("scenariosSelection");
    //         writeCommandResults("Retour à l'écran principal de l'application.");
    //         break;
    //     }
    
    //     default:
    //         break;
    // }
}


function nextCommand(currentState){

}

function documentationHack1() {

}

function documentationHack2() {
    
}

function documentationHack3() {
    
}

function documentationHackGeneral(){
    
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
