export function Button({
    caption,
    buttonClass,
    handler,
    isActive,
}: {
    caption: string;
    buttonClass: string;
    handler: () => void;
    isActive?: boolean;
}) {
    return (
        <button
            type="button"
            className={`btn btn-toolbar btn-outline-primary ${buttonClass}`}
            onClick={handler}
            disabled={isActive}
        >
            {caption}
        </button>
    );
}
