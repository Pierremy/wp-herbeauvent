![ws-starter-2020 - Documentation banner](https://user-images.githubusercontent.com/39372814/88466880-3459ab80-ced1-11ea-898b-e93b9461807a.png)

<!--
    RESSOURCES POUR LA REDACTION:
    - https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46
    - https://gist.github.com/vinkla/dca76249ba6b73c5dd66a4e986df4c8d
    - https://tree.nathanfriend.io/
 -->

# WS-Starter
Ce document a pour objectif premier de documenter le fonctionnement de notre starter. Il a pour objectif second de répertorier l'ensemble des évolutions techniques et fonctionnelles qui seront à prévoir dans un futur plus ou moins proche.


## Introduction
### Outils & Technologies
La liste ci-dessous est volontairement non-exhaustive, sont unique intérêt est de lister les différents outils et technologies qui composent notre starter. Pour plus de détails, rendez-vous dans la section `documentation`.

- **Yarn `v1`** → https://classic.yarnpkg.com/fr/
- **Composer** → https://getcomposer.org/
- **SCSS** → https://sass-lang.com/documentation
- **Webpack `v4`** → https://webpack.js.org/concepts/
- **Timber `v1`** → https://timber.github.io/docs/
- **BarbaJS `v1`** → https://barba.js.org/v1/
- **GSAP `v3`** → https://greensock.com/docs/v3
- **Sniffer** → https://github.com/watsondg/sniffer
- **Fastclick** → https://github.com/ftlabs/fastclick

### Arborescence du thème
```md
📦 WS-Starter/
   ├── 📁 cli
   ├── 📁 dist
   ├── 📁 node_modules
   ├── 📁 src
   ├── 📁 vendor
   ├── 📄 .gitignore
   ├── 📄 composer.json
   ├── 📄 composer.lock
   ├── 📄 package.json
   ├── 📄 README.md
   ├── 📄 webpack.common.js
   ├── 📄 webpack.dev.js
   ├── 📄 webpack.prod.js
   └── 📄 yarn.lock
```

#### 📁 cli
Ce dossier regroupe quelques scripts bash relatif à l'installation et à l'initialisation du starter.

---
#### 📁 dist `génération-automatique`
Le dossier dist est créé automatiquement lors de la compilation de notre application en mode de developpement ou de production. C'est ce dossier que WordPress utilisera lorsque vous activerez le thème depuis l'inteface d'administration.

**🚨 Ne modifiez jamais votre code dans ce dossier ! L'unique moment où vous pourrez le manipuler sera lors de la mise en production.**

---
#### 📁 node_modules `génération-automatique`
Vous connaissez sans aucun doute les node_modules, inutile donc d'en parler ici 😉.

---
#### 📁 src
C'est ici que toute la magie opère ! Le dossier src est le plus important de tous, puisqu'il contient l'entièreté du thème non compilé. Autrement dit, c'est votre dossier de travail.

Vous passerez ~99.99% de votre temps à travailler ici, et si par mégarde vous venez à en sortir, il y aura de forte chance que vous vous soyez perdu.

---
#### 📁 vendor `génération-automatique`
Même principe que le dossier node_modules mais pour les dépendances PHP.

---
#### 📄 .gitignore
Ce fichier contient la liste de tous les fichiers, types de fichier, dossiers, etc... que Git devra ignorer lorsqu'il versionnera votre code.

---
#### 📄 webpack.(common/dev/js).js
Ces 3 fichiers permettent la configuration de Webpack.

Le fichier "common" permet de définir la configuration générale qui sera appliquée à la fois pour la production et pour le développement.

Les fichiers "dev et "prod", comme vous pouvez vous en douter, contiennent les réglages spécifiques qui dépendent de l'environnement d'execution de Webpack.

---
#### 📄 package.json & composer.json
Ces deux fichiers contienent entre autres, la liste des dépendances JS `package.json` et PHP `composer.json`

---
#### 📄 yarn.lock & composer.lock
Les fichiers .lock stockent la version de chacune de vos dépendances. Cela vous permet récupérer la même version d'une dépendance à chaque fois que vous executez un `composer install` ou `yarn install`. 



## Plan de documentation
- Introduction
    - Outils et Technologies
    - Arborescence du starter
- Installation
    - Les prérequis (Composer / npm / yarn)
    - Configuration (browser-sync, webpack, etc...)
    - Initialisation du thème (CLI init & build + Windows & Unix OS)
- Documentation
    - Introduction
    - Webpack
        - Babel
        - Terser
        - BrowserSync
        - ...
    - JS
        - Arborescence (+Détails)
        - L'objet APP
        - SPA & BarbaJS
        - Gestion des vues (relation twig/js via le namespace)
        - GSAP
        - Polyfills (Polyfill.io)
        - ...
    - CSS
        - Ressources (documentation de SASS) 
        - Arborescence (+Détails)
        - Les variables
        - La grille
        - Les medias queries
        - ...
    - Timber/Twig
        - Ressources (documentation de timber/twig) 
        - Le contexte (add_to_twig/get_context)
        - Les filters
        - ...
    - WordPress
        - Ressources (Codex de WordPress)
        - Les Custom Post Types
        - Les Taxonomies 
        - Les Custom Fields 
        - Les requetes AJAX
        - ...
    - Déliverabilité des E-mails
        - Ressources (mail-tester, gmail) 
        - Configuration de la function wp_mail (sender_email/sender_name)
        - DKIM
- Mise en production
    - VPS
    - Mutualisé


## Évolutions
### Global
- [ ] Chargement des images au format avif avec fallback en webp et jpeg/png
    - https://reachlightspeed.com/blog/using-the-new-high-performance-avif-image-format-on-the-web-today/

### JavaScript
- [ ] Migration Yarn `v1` → Yarn `v2`
- [ ] Migration BarbaJS `v1` → BarbaJS `v2` ou Swup ou HighwayJS
- [ ] Refactoriser / Réorganiser le code JavaScript après avoir éffectué les migrations ci-dessus
- [ ] Mettre en place un linter (ESLint par exemple) avec des règles spécifiques de sorte que tout le monde code plus ou moins de la même façon dans l'équipe.

### PHP
- [ ] Voir si il serait intéressant de mettre en place des tests unitaires (au moins pour le core du starter)
- [ ] Créer le dossier `/inc/twig` avec à l'intérieur des classes PHP pour gérer Timber/Twig (ex: TwigManager TwigContextManager, TwigFilterManager, TwigExtensionManager) sans avoir à passer par le functions.php

## Bugs
- [ ] Pour signaler un bug dans le starter, utiliser les issues directement dans GitHub pour s'y retrouver plus simplement et avoir une meilleur traçabilité des bugs corrigés et à corriger.