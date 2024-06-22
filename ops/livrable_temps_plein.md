# Rapport PS6 : Livraison semaine à temps plein

## Partie 1 : Tests playwright
Cette partie concerne les tests avec playwright qui vont nous permettre de simuler des actions (comme le click sur un bouton par exemple) sur notre site et ainsi de pouvoir tester nos scénarios automatiquement.

Tous les tests sont lancables directement à partir de notre docker au lancement du docker compose.

### Critères de priorisation de vos tests
Pour la priorisation de nos tests, nous nous sommes basés sur différents critères tels que : 
    - La fréquence d'utilisation du scénario
    - L'importance du scénario pour l'accueilli (pour jouer)
    - L'importance du scénario pour les professionnels de santé (pour la préparation des quizzes et la visualisation des statistiques)

Pour donner une priorité à chacun de nos scénarios, nous avons choisi d'utiliser un système de points, nous partons du principe que nous avons 40 points (10 par membre du groupe) au début de la semaine et que nous allons donner un certain nombre de points à chaque scénario, plus un scénario aura des points et plus il sera important.

### Scénarios de tests

#### Scénario 1 : Création d'un quiz

##### État d’implémentation à la livraison :
> [!NOTE]
> DONE

##### Ordre de priorité du scénario en fonction de vos critères

Score pour chacun des critères (/10) :
- Fréquence d'utilisation : 9
- Importance pour l'accueilli : 4
- Importance pour les professionnels de santé : 9

> [!IMPORTANT]
> Nombre de points d'importance attribués à ce scénario : 7

##### Justification de l’importance scénario 

La création d'un quiz est primordiale, car c'est là que nous allons configurer les différents paramètres des quizs pour s'adapter à chaque accueilli et pour permettre la meilleure expérience utilisateur. Et surtout, sans création du quiz, les accueillis ne pourraient pas jouer.

<br/>

#### Scénario 2 : Création d'un utilisateur

##### État d’implémentation à la livraison : 

> [!NOTE]
> DONE

##### Ordre de priorité du scénario en fonction de vos critères

Score pour chacun des critères (/10) :
- Fréquence d'utilisation : 7
- Importance pour l'accueilli  : 3
- Importance pour les professionnels de santé : 8

> [!IMPORTANT]
> Nombre de points d'importance attribués à ce scénario : 6

##### Justification de l’importance scénario 

La création d'un utilisateur est très importante, car ce sont eux qui vont jouer le quiz et c'est dans cette création que les paramètres spécifiques à l'utilisateur vont pouvoir être définis. La création d'un utilisateur n'est pas la fonctionnalité la plus utilisée, mais sans elle, personne ne pourra jouer.

<br/>

#### Scénario 3 : Consulter les statistiques d'un utilisateur

##### État d’implémentation à la livraison :
> [!NOTE]
> DONE

##### Ordre de priorité du scénario en fonction de vos critères

Score pour chacun des critères (/10):
- Fréquence d'utilisation : 9
- Importance pour l'accueilli : 1
- Importance pour les professionnels de santé : 9


> [!IMPORTANT]
> Nombre de points d'importance attribués à ce scénario : 6

##### Justification de l’importance scénario 
Les statistiques d'un utilisateur sont très importantes pour les professionnelles de santé, car elles vont permettre à ces dernières de préparer des ateliers pertinents et efficaces en fonction des quizs déjà joués. De plus, son utilisation est très fréquente pour cette même raison. Cependant, pour l'utilisateur, ce n'est pas important vu qu'on ne lui montre jamais ses statistiques.

<br/>

#### Scénario 4 : Jouer un Quiz avec seulement des questions

##### État d’implémentation à la livraison :
> [!NOTE]
> DONE

##### Ordre de priorité du scénario en fonction de vos critères

Score pour chacun des critères (/10) :
- Fréquence d'utilisation : 8
- Importance pour l'accueilli : 9
- Importance pour les professionnels de santé : 2

> [!IMPORTANT]
> Nombre de points d'importance attribués à ce scénario : 6

##### Justification de l’importance scénario
Il s'agit de la fonctionnalité principale du projet, l'expérience centrale du site à laquelle les utilisateurs seront confrontés lors de leur parcours. La capacité à jouer un quiz de manière fluide et efficace est cruciale pour la satisfaction des utilisateurs. Étant donné que cette fonctionnalité est utilisée fréquemment et est d'une importance capitale pour les utilisateurs, elle doit être impeccable pour garantir une expérience utilisateur optimale. Assurer la qualité de cette fonctionnalité est donc prioritaire pour le succès du projet.

<br/>

#### Scénario 5 : Création d'une question

##### État d’implémentation à la livraison :
> [!NOTE]
> DONE

##### Ordre de priorité du scénario en fonction de vos critères

Score pour chacun des critères (/10) :
- Fréquence d'utilisation : 5
- Importance pour l'accueilli : 2
- Importance pour les professionnels de santé : 7

> [!IMPORTANT]
> Nombre de points d'importance attribués à ce scénario : 4

##### Justification de l’importance scénario 
La création de questions est essentielle pour le site et pour la création du quiz. Mais il n'est pas souvent utilisé, car une fois que l'on a créé beaucoup de questions, on peut se contenter de celles déjà créées.

<br/>

#### Scénario 6 : Jouer un Quiz avec seulement un Memory
> [!NOTE]
> DONE

##### Ordre de priorité du scénario en fonction de vos critères

Score pour chacun des critères (/10) :
- Fréquence d'utilisation : 4
- Importance pour l'accueilli : 5
- Importance pour les professionnels de santé : 2

> [!IMPORTANT]
> Nombre de points d'importance attribués à ce scénario : 4

##### Justification de l’importance scénario

Jouer un memory n'est pas le scénario le plus important du projet, car il est possible de réaliser toutes les autres tâches du site sans avoir un memory, il est tout de même intéressant de le réaliser pour être sûr que le memory soit fonctionnel et qu'on puisse l'intégrer à des quizs sans tout casser.

<br/>

#### Scénario 7 : Jouer un Quiz avec seulement un Simon

##### État d’implémentation à la livraison :
> [!NOTE]
> DONE

##### Ordre de priorité du scénario en fonction de vos critères
- Fréquence d'utilisation : 4
- Importance pour l'accueilli : 5
- Importance pour les professionnels de santé : 2

> [!IMPORTANT]
> Nombre de points d'importance attribués à ce scénario : 4

##### Justification de l’importance scénario 
Cette tâche n'est pas une fonctionnalité principale du projet, ce mini-jeu (comme le memory) est optionnelle et peut-être ajoutée ou non à un quiz. Il est cependant nécessaire de le tester pour assurer le bon fonctionnement et la stabilité de ce composant technique.

<br/>

#### Scénario 8 : Jouer un Quiz avec des questions et les 2 mini-jeux

##### État d’implémentation à la livraison :
> [!NOTE]
> DONE

##### Ordre de priorité du scénario en fonction de vos critères


Score pour chacun des critères (/10):
- Fréquence d'utilisation : 3
- Importance pour l'accueilli : 5
- Importance pour les professionnels de santé : 1


> [!IMPORTANT]
> Nombre de points d'importance attribués à ce scénario : 3

##### Justification de l’importance scénario 

Toutes les composantes du quiz sont déjà testées indépendamment, ce scénario est utile tout de même pour tester que tous les jeux fonctionnent correctement ensemble. De plus, ce n'est pas forcément important pour l'accueilli d'avoir un mélange des 3 jeux. On peut les avoir indépendamment.



## Partie 2 : Docker
Cette section traite de la dockerisation de l'application et des tests, ce qui nous permettra de faciliter le déploiement de notre application et d'isoler les dépendances...
Cela nous permet notamment d'avoir une isolation et de pouvoir vérifier que l'environnement de tests et de production sont fonctionnels et ceux,dans n'importe quel environnement présent sur l'hôte.
Cela permet également de pouvoir partage les images docker plus facilement et ainsi pouvoir lancer notre application plus facilement, partout et en étant persuadé que cette dernière tourne dans les meilleures conditions.

Nous avons réussi à mettre en place ces étapes de conteneurisation avec succès pendant la semaine.

### Docker étape 1
Dans cette première étape, qui est fonctionnelle, nous avions besoin de conteneurs Docker indépendants pour le front-end et le back-end, exposant respectivement le port 80 et le port 9428. Nous les avons liés en utilisant les commandes `docker run -p 8080:80` pour le front-end et `docker run -p 8081:9428` pour le back-end.

#### Côté dockerfile du front
Pour cette image, nous devions construire la version de production du front-end Angular et le servir via NGinx en deux étapes distinctes. Nous avons donc utilisé la première image de node comme "builder" et la seconde, celle de NGinx comme image de résultat.

Dans la première partie du Dockerfile : 
- Nous sommes partie de l'image Docker contenant NodeJS en version 18 LTS (18.20.3) et alpine pour avoir une image plus petite ayant le strict minimum.
- Pour changer la configuration d'Angular nous avons créé un argument d'environnement que nous passons à la création du docker qui va influencer la configuration d'Angular.
- Dans le Angular.json nous avons une configuration spéciale pour Docker qui va modifier des variables dites d'environnements qui sont utilisés dans le site pour gérer les différentes URLs.
- Nous avons fait en sorte d'être en utilisateur non-root pour éviter au plus possible les failles de sécurité. De plus nous avons essayé d'effacer au maximum nos traces lors des `npm install` pour optimiser la taille de l'image. Toujours dans le but d'optimiser, nous avons ordonné les layers du Docker de manière à ne pas réinstaller ou copier les éléments de base de l'image.
- Nous n'avons pas utilisé le `--omit=dev` pour retirer les dépendances de développement car le composant `ng build` a besoin des `devDependencies`.

Dans la seconde partie du Docker :
- Nous sommes parties de l'image de base de NGinx en alpine
- Nous avons créé les dossiers et fichiers nécessaires en tant que normal-user.
- Nous avons utilisé la configuration donnée en ressources
- Et nous avons copié depuis notre image de "build" la version optimisé, donné par le `npm run build` dans notre image NGinx.
- À la fin nous exposons le port 80 par défaut et nous lançons la commande NGinx.

#### Côté dockerfile du back
Pour la partie back-end nous sommes partie sur la même version de NodeJS que le front-end, ici nous installons tout simplement les dépendances (en nettoyant le cache) et nous exposons le port par défaut et bien sûr nous lançons le serveur avec `npm run start`.

### Docker étape 2
Dans cette étape il nous était demandé de faire un fichier docker-compose permettant de faire tourner le back-end et le front-end.
- Nous avons donc créé deux services, un pour chacun.
- Le code suivant nous permet de préciser à docker que l'image doit être construite localement si elle ne l'est pas déjà et que le fichier à utiliser doit avoir le nom de Dockerfile dans le dossier front-end. Cela est encore plus important quand dans la partie teste nous utiliserons un fichier différent dans ce même dossier. Nous passons aussi l'argument 'ENVIRONMENT' avec la valeur 'docker' qui va être utilisée par l'image au moment de la compilation et utiliser la bonne configuration dans le angular.json.
```yml
    build:
      context: ../front-end
      dockerfile: Dockerfile
      args:
        ENVIRONMENT: docker
``` 

- Nous précisons les ports à utiliser avec `    ports:
      - "8080:80"` pour remapper le port 80 interne au Docker au port 8080 qui sera disponible sur l'hôte.
- Dans le but d'avoir une persistance des données pour la partie back-end et plus précisément de la database, nous utilisons un volume comme suit : 
```yml
volumes:
      - ./database:/app/database
```
qui va donc créée/utiliser un dossier `database` de l'hôte (adjacent au docker-compose.yml) et le liait dans le Docker dans /app/database, pour être utilisé normalement par le serveur backend.
- Dans un dernier temps, nous vérifions avec 
```yml
depends_on:
      back:
        condition: service_healthy
```
que le back-end est bien fonctionnel avant de lancer le front-end, nous vérifions pour cela que l'healthcheck est concluant.
Note : La définition des volumes et du réseau sont optionnels mais pour des raisons de clarté nous avons préférer les précisés quand cela nous paraissait nécessaire.

### Docker étape 3
Pour l'étape 3, nous devions conteneuriser les tests, pour cela nous avons dû créer un nouveau fichier Dockerfile, une nouvelle configuration Angular et pour finir un nouveau Docker-compose.yml fortement inspirer de l'ancien.

#### Le Dockerfile
- Ce conteneur utilise l'image officielle de Playwright qui contient déjà toutes les dépendances et les navigateurs nécessaires au fonctionnement des tests.

- Nous avons inséré dans l'image nos sources qui contiennent les fixtures, les scénarios présents dans le dossier `e2e` et les fichiers de configuration playwright et typescript.

- Nous avons également passé notre fichier d'environnement pour avoir les bonnes URLs (http://front et http://back:9428/api)

- Dans un dernier temps nous lançons la commande de test en précisant la config et le dossier où seront stockés les artéfactes (images et vidéo), ainsi que le rapport de conclusion.

- Dans cette image nous utilisons l'utilisateur `root`, car comme le dit la documentation de Playwright sur le sujet : 
>"On trusted websites, you can avoid creating a separate user and use root for it since you trust the code which will run on the browsers."
#### Le Docker-compose
Pour le docker-compose.yml nous sommes parti de la version précédente.
- Nous avons passé pour le back une nouvelle commande à exécuter avec `    command: ["npm", "run", "start:e2e"]` qui permet de lancer le serveur du back en mode de test avec une base de données spécifique.
- Nous avons rajouté un service `playwright` qui comme les autres images, se construit à partir du Dockerfile si besoin
- Toutes ces images partagent le même network (optionnel) et le service playwright possède un volume qui va permettre de récupérer les artefacts et le rapport généré par playwright.
- Playwright dépend du lancement du front pour être exécuté.


### Healthchecks
#### Healthcheck front 
Pour le healtcheck du front, on utilise curl, qui sert à se connecter au conteneur et récupérer le contenu de la page web fourni par ce dernier, avec l'option -f qui va permettre de modifier le comportement de curl en faisant échouer la commande en cas de réponse HTTP non réussie . Par défaut, curl ne considère pas les codes de réponse HTTP 4xx et 5xx comme des erreurs et télécharge quand même le contenu, même s'il s'agit d'une page d'erreur HTML. On teste sur l'URL suivante "http://front:80/" et à un intervalle de 10 secondes.


#### Healthcheck back 
On fait pareil que le front sauf que l'URL sur lequel on curl est : "http://back:9428/api/status"  et pas seulement "http://back:9428/" vu que c'est du back et que ce dernier ne marche pas.


Enfin, en cas d'échec d'un healthcheck, les conteneurs qui dépendent du conteneur en échec s'arrêteront avec la condition "service_healthy" dans depends_on.

## Problèmes rencontrés

### Système de connexion
- Lorsque nous avons mis en place les tests dans le Docker, nous avons eu une erreur lors des lancements de ces derniers dans cet environnement conteneurisé. Cependant, ces teste fonctionnaient tous dans un environnement classique.

- Nous avons d'abord pensé à un bug venant de notre configuration Docker qui aurait pu être défaillante, mais après analyse des erreurs et des artéfacts, nous avons trouvé que le bug venait de notre système de connexion. Effectivement ce dernier effectue des redirections vers une page de connexion si on tente d'accéder a des pages nécessitant une autorisation administrateur. Nous pensons que le problème venait de cette redirection dans cet environnement de test en particulier.

- Nous avons donc pris la décision de désactiver ce système dans l'environnement de test, car sur la version Docker de production, cette fonctionnalité fonctionne correctement tout comme sur la version classique du site. Suite à cela les tests sont passés sans erreur.
- Dans un souci de temps, nous avons préféré continuer sur d'autres tâches jugées plus importantes et de désactiver ce système de connexion dans l'environnement Docker et les tests, cette fonctionnalité reste présente dans les environnements de production et de développement (et dans les tests non dockerisé).

### Tests du drag n' drop avec playwright

Durant les tests avec playwright, nous avons dû tester le glisser-déposer de la partie création du quiz qui est utile pour ajouter des questions, cette partie nous a posés de nombreux problèmes car nous avons testé différentes méthodes de glisser déposer qui ne marchait pas avant de réussir à en faire fonctionner une. Il y avait aussi un problème quant à l'obtention des différents éléments qui vont être glissés où sur lesquels on va glisser l'élément.

Finalement, nous avons réglé tous les problèmes quant au drag n' drop, non sans difficulté mais c'est désormais fonctionnel.
