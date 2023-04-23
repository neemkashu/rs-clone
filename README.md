# RS Clone: Nonograms

## Deploy 

[nlb-nonograms.netlify.com](https://nlb-rs-nonogram.netlify.app/)

## Application functionality

This application is a clone of the website [nonograms.org](https://www.nonograms.org), which is dedicated to Paint-By-Numbers puzzles, also known as `nonograms`. The app features a `catalog` of puzzles, an intuitive `game interface`, and `settings` for both gameplay and appearance. There's also a handy `game guide` included. When you register with the app, you can `save your game progress` and continue playing on another device. Additionally, the app tracks your progress for each puzzle in the catalog. For more information, see the detailed description below.

1.  [Main page](modules/main-page.md)
2.  [Game](modules/playground.md)
3.  [Catalog](modules/catalogue.md)
4.  [Settings](modules/settings.md)
5.  [Header, Aside, Footer](modules/header.md)
6.  [How to solve](modules/how-to-solve.md)
7.  [Registration/autorization](modules/register.md)

## Backend

1.  [Backend](modules/backend.md)

Backend Repository (https://github.com/binary-apple/rs-clone-back-end/tree/develop)

## Technical requirements

-   The application should have a consistent `style`.
-   Single-Page Application (`SPA`)
-   `Routing`
-   The code is written in `TypeScript`.
-   Code formatted with `Prettier`
-   Code is checked with `ESLint` using the `Airbnb` style guide.

## Technical stack

-   Frontend
    -   react, react-router-dom
    -   redux, redux-thunk, redux-undo
    -   i18next
    -   firebase
    -   Typescript
    -   Bootstrap
    -   Canvas
    -   LocalStorage
    -   html2canvas
    -   Prettier
    -   Eslint
-   Backend
    -   Typescript
    -   body-parser
    -   cors
    -   dotenv
    -   express
    -   firebase
    -   firebase-admin
    -   png-to-matrix
    -   Eslint
