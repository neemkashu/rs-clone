import './Aside.scss';
import { Link } from 'react-router-dom';
import { handleAsideCloseBtnClick } from '../../utils/helpers';

export function Aside(): JSX.Element {
    return (
        <aside id="aside" className="border-3 border-end">
            <button
                type="button"
                onClick={handleAsideCloseBtnClick}
                id="asideCloseBtn"
                className="btn btn-outline-secondary my-1"
            >
                ✕
            </button>
            <div id="aside-btns" className="container p-2 btn-group-vertical">
                <Link to="/" className="btn btn-outline-primary">
                    Main Page
                </Link>
                <Link to="/catalog" className="btn btn-outline-dark">
                    Catalog
                </Link>
                <Link to="/game" className="btn btn-outline-dark">
                    Random Game
                </Link>
                <Link to="/" className="btn btn-outline-dark">
                    How to solve?
                </Link>
                <Link to="/" className="btn btn-outline-dark">
                    Help
                </Link>
            </div>
        </aside>
    );
}
