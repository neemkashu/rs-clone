export function Footer(): JSX.Element {
    return (
        <footer className="footer container p-2 d-flex flex-wrap justify-content-center justify-content-sm-between border-3 border-secondary">
            <div className="d-flex flex-wrap justify-content-between gap-3 p-1">
                <a
                    className="col-auto text-decoration-none"
                    href="https://github.com/neemkashu"
                >
                    neemkashu
                </a>
                <a
                    className="col-auto text-decoration-none"
                    href="https://github.com/liestreadt"
                >
                    liestreadt
                </a>
                <a
                    className="col-auto text-decoration-none"
                    href="https://github.com/binary-apple"
                >
                    binary-apple
                </a>
            </div>
            <div className="text-center p-1">2023</div>
            <div className="d-flex justify-content-end p-1">
                <a href="https://rs.school/js/">
                    <img
                        className="rss-image"
                        src="https://rs.school/images/rs_school_js.svg"
                        alt="RSS-logo"
                    />
                </a>
            </div>
        </footer>
    );
}
