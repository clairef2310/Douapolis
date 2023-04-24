# DOUAPOLI$

Projet réalisé dans le cadre de **LIFPROJET** par le groupe **CRIM**

Nous avons utilisé :

- MongoDB
- React
- Socket.io
- Local/Session Storage


## Description

Ce projet s'intitule **Douapolis**, c'est un jeu de société similaire au **Monopoly** créé en utilisant **React**. Le but du jeu est d'acheter et de vendre des propriétés tout en collectant des loyers et en évitant les impôts et les dettes.


## Préparation/Lancement de l'App

1. Pour pouvoir lancer le client, il faut être dans le répertoire _./douapolis_, vous devez executer `npm install` afin de récuperer node_modules.

1. Pour pouvoir lancer le serveur, il faut se trouver dans _./douapolis/serveur_ et lancer également `npm install`

> Une fois les _node_modules_ installés, toujours en se trouvant dans les bons dossiers pour le server et le client.

1. Il faut ensuite lancer le serveur avec `nodemon server.js` ou avec `node server.js`

4. Il faut ensuite lancer le serveur avec `npm start`

## Navigation dans l'App

On arrive dans la page d'**Accueil**, déconnecté. On peut choisir soit de se connecter soit de rejoindre une partie en tant qu'invité.

Un utilisateur connecté a accès a son **profil**, peut **changer son pseudo et son mot de passe** si besoin, peut **ajouter des amis** et également **consulter ses statistiques** de partie.

Lorsque l'on rejoint une partie, on arrive dans une salle d'attente gérée par **socket.io**, l'hôte peut **lancer la partie** si il y a assez de joueurs.

Une fois une partie lancée les joueurs connectés dans la socket sont **redirigés** vers la page de **jeu** avec un **plateau en svg** et les pions.

Ici, ils pourront **lancer les dés** et se **déplacer**.

## Ce qu'il manque


## Le groupe
- Claire Fernandes @p2005541
- Mathys Sambet @p2207653
- Romain Dieu--Guillot @p2207518
- Iona Sirach @p1810630
