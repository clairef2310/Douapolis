# DOUAPOLI$

Projet réalisé dans le cadre de **LIFPROJET** (http://cazabetremy.fr/wiki/doku.php?id=projet:presentation) 

Nous avons utilisé :

- MongoDB (cloud)
- React
- Socket.io
- Local/Session Storage
- Nodejs
- Express.js
- Bootstrap


## Description

Ce projet s'intitule **Douapolis**, c'est un jeu de société similaire au **Monopoly** créé en utilisant **React**. Le but du jeu est d'acheter et de vendre des propriétés tout en collectant des loyers et en évitant les impôts et les dettes.


## Préparation/Lancement de l'App

/!\ Le projet ne peut pas se lancer sur les ordinateurs de l'université car ils n'ont pas node js d'installé.

1. Installer Nodejs sur l'ordinateur

1. Pour pouvoir lancer le client, il faut être dans le répertoire _./douapolis_, vous devez executer `npm install` afin de récuperer node_modules.

1. Pour pouvoir lancer le serveur, il faut se trouver dans _./douapolis/serveur_ et lancer également `npm install`

1. Une fois les _node_modules_ installés, se placer dans _./douapolis_ et lancez la commande `npm run launch`

## Navigation dans l'App

On arrive dans la page d'**Accueil**, déconnecté. On peut choisir soit de se connecter soit de rejoindre une partie en tant qu'invité.

Un utilisateur connecté a accès a son **profil**, peut **changer son pseudo et son mot de passe** si besoin, peut **ajouter des amis** et également **consulter ses statistiques** de partie.

Lorsque l'on rejoint une partie, on arrive dans une salle d'attente gérée par **socket.io**, l'hôte peut **lancer la partie** si il y a assez de joueurs.

Une fois une partie lancée les joueurs connectés dans la socket sont **redirigés** vers la page de **jeu** avec un **plateau en svg** et les pions.

Ici, ils pourront **lancer les dés** et se **déplacer**.

## Les differents dossiers

- maquette html : C'est de là que l'on est partit pour la base du site ;
- douapolis : Le dossier de l'Application React contenant :
    - server : Le serveur final qui gère la connection a la base de donnée et les sockets ;
    - serverlocal : le premier serveur que l'on a utilisé qui été géré en Local ;
    - src : qui contient tout les fichiers et les images de l'Application tels que :
        - Le plateau ;
        - L'authentification via localStorage
        - Les pages (Accueil,Profil,Connexion...)
        - Le CSS.

## Ce qu'il manque

- Mouvements des pions qui fonctionnent en décalé, gestion des 3 doubles d'affilé pas terminées;
- Gestion du tour par tour en partie à l'aide des sockets pas réussi/terminé;
- Par conséquent : pas de fin de partie;
- Gestion de la sécurité du site (bloquer l'accès à certaines pages);
- Cloture de la salle d'attente si l'hôte quitte (ou changement d'hôte);
- Cloture de la partie en cours si quelqu'un quitte.

## Ce projet a été fait à 4 personnes 
