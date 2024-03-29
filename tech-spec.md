Максимальный балл за задание `+620`

## Функционал приложения

Приложение является клоном сайта https://www.nonograms.ru/ и тоже посвящено японским кроссвордам, или нонограммам. В приложении доступен каталог кроссвордов, реализован интерфейс игры, настройки игрового процесса и внешнего вида сайта, небольшое обучение. При регистрации в приложении становится возможно сохранить игру и продолжить её на другом устройстве, а также отмечается прогресс решения каждого кроссворда в каталоге. Подробное описание в ТЗ.

1.  [Главная страница](modules/main-page.md) _(максимальный балл - `+15`)_.
2.  [Страница с полем игры](modules/playground.md) _(максимальный балл - `+223`)_.
3.  [Страница каталога](modules/catalogue.md) _(максимальный балл - `+70`)_.
4.  [Модальное окно с настройками пользователя](modules/settings.md) _(максимальный балл - `+42`)_.
5.  [Header, Aside, Footer](modules/header.md) _(максимальный балл - `+85`)_.
6.  [How to solve](modules/how-to-solve.md) _(максимальный балл - `+20`)_.
7.  [Страницы с регистрацией/авторизацией](modules/register.md) _(максимальный балл - `+55`)_.

## Backend

1.  [Backend](modules/backend.md) _(масимальный балл - `+100`)_.

Репозиторий Backend (https://github.com/binary-apple/rs-clone-back-end/tree/develop)

## Технические требования

-   Приложение выполнено в едином стиле _(масимальный балл - `+10`)_.
-   SPA приложение
-   Роутинг
-   Использован Typescript
-   Код форматирован с помощью Prettier
-   Eslint вместе с Airbnb

## Технический стек

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
