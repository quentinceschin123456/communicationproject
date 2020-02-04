but :  
le but du jeu c'est d'avoir le plus de pions sur le plateau
fin :
ça se termine quand le plateau est plein, ou quand un joueur n'a plus de pions

Config
Plateau de 8x8
la première ligne est remplie de pions du joueur 1
la dernière ligne est remplie de pions du joueur 2

Un joueur peut :
    dupliquer un pion en sélectionnant un de ses pions et en choisissant une case adjacente (vide) à ce pion
    La copie ça fait ça : 
        | O |    |    |
        Après copie
        | O | O |    |
    sauter une case, mais dans ce cas le pion se déplace ex : | O |    |    |
        Le pion O saute dans la 3eme case : 
        | O |    |    |
        après
        |     |    | O |
        
si y a un pion adverse dans le périmètre du pion dupliqué ou ayant  il est converti en pion du joueur ayant fait l'action :
    | O |     | X |
    copie : 
    | O | O | X |
    convertion :
    | O | O | O |

la copie, et la conversion ont un rayon de 1 case autour du pion acteur
le saut à un rayon de 2


|  1  |  2  |  3  |
|  4  |  5  |  6  |
|  7 | O |  8  |

Là le O peut se copier en 7, 4, 5, 6, 8
Il peut sauter en 1, 2, 3 seulement