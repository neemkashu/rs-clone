export function Button({
    caption,
    buttonClass,
    handler,
}: {
    caption: string;
    buttonClass: string;
    handler: () => void;
}) {
    return (
        <button
            type="button"
            className={`btn btn-toolbar btn-outline-primary ${buttonClass}`}
            onClick={handler}
        >
            {caption}
        </button>
    );
}
