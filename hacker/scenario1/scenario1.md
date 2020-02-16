# Hacker mod

### Scénario 1 :

#### Mise en contexte :

Vous êtes connecté au réseau wifi publique de votre boulangerie préférée quand tout à coup, votre ordinateur se mit à réagir bizarrement. Une console de saisi apparait. Vous êtes victime de piratage, mais vos compétence dans ce domaine vous pousse à contre-attaquer cette mystèrieuse personne.

##### Karma pour cet individu :

En saisissant une commdande (log par exemple), vous réalisier qu'il est en train de recupérer vos fichiers personnel.

Vous choisissez alors de connaitre l'adresse IP de cette personne : ```netscan```,

Bingo, vous connaissez son adresse IP.

Maintenant, vous allez vous connecter en "root" et utiliser un logiciel de froce brute pour obtenir son mot de passe (en 5 secs secondes seulement vous trouvez son mot de passe qui était "root").

```ssh --forcePassword root@192.168.1.156```


Puis, vous obtenez le retour suivant :


```ssh successfully connected, password is 'root'```

```root@192.168.1.156:/>```

##### Connaitre cette personne

Comme vous vous en doutiez, cet personne est un apprentis dans ce domaine au vu de la sécurité dans son système.
Apès tout, vous cherchier un apprentis dans ce domaine afin de former du nouveau personnel

Vous effectuez la commande ```cd /root/Desktop/```
Puis ```ls``` :
<pre>
root@192.168.1.156:/root/Destop>$ ls
    Issous.png
    Recrutement/
    ApprendreLeHacking/
</pre>

Vous faites ```cd Recrutement```

Puis ```ls```

<pre>
root@192.168.1.156:/root/Destop/Recrutement/>$ ls
    CV.pdf
    LettreMotivation.pdf
</pre>

Vous vous empressez de télécharger ces fichiers directement sur votre ordinateur :

```exit```

Puis ```scp root@192.168.1.156:/root/Desktop/Recrutement ~/root/Desktop/```

Là le dossier se téléchage. Et apparait sur votre bureau.

La prof peut maintenant visualiser les fichiers.

## Comment le faire :

https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/

https://ash.ms/2019-10-02/retro-website-launch/


***