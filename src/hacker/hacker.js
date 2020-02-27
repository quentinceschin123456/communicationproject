function getInputedText(){
    return document.getElementsByTagName("INPUT")[0];
}

function hackingScenario() {

    

    var text = getInputedText();
    
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
// ls -> cat info.txt + cat readme.md qui dit qu'il faut aller dans recrutement ... 
// cd /root/Desktop/Recrutement MAIS attaque
// 3 eme sequense de commande
// cd /root/Desktop/Recrutement + ls
// cat info.txt 
// scp root@192.168.1.156:/root/Desktop/Recrutement ~/root/Desktop/
// lien de téléchargement du fichier
