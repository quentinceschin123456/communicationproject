function getInputedText(){
    return document.getElementsByTagName("INPUT")[0];
}

function hackingScenario() {
    var text = getInputedText();
    
}

// au lancement afficher un texte pour indiquer que le pc est hacker
// 1 enseble de commande défensif
// netscan +ssh --forcePassword root@192.168.1.156
// message success
// mais avant d'être arrivé à lister les fichiers -> deuxieme attaque
// 2 ensemble de commande
// ls -> cat readme.md qui dit qu'il faut aller dans recrutement ... 
// 