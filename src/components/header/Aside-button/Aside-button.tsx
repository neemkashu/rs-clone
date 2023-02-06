export function AsideButton(): JSX.Element {
    function handleBurgerBtnClick() {
        const aside = document.body.querySelector('#aside') as HTMLDivElement;
        aside.style.left = '0';
    }

    return (
        <button
            type="button"
            onClick={handleBurgerBtnClick}
            id="burgerButton"
            className="btn btn-outline-secondary"
        >
            ☰
        </button>
    );
}
