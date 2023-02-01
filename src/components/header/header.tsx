import { Link } from 'react-router-dom';

export function Header(): JSX.Element {
    return (
        <header className="container p-2 border-bottom border-start border-end border-3 rounded-bottom">
            <div className="row flex-wrap">
                <div className="col d-flex justify-content-center justify-content-sm-start gap-2 py-1"></div>
                <div className="col d-flex justify-content-center justify-content-sm-end gap-2 py-1">
                    <a href="#" className="btn btn-outline-secondary">
                        {' '}
                        Sing In
                    </a>
                    <a href="#" className="btn btn-outline-primary">
                        Sign Up
                    </a>
                </div>
            </div>
        </header>
    );
}
