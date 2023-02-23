export function ErrorItem({
    messageTitle,
    messageBody,
}: {
    messageTitle: string;
    messageBody: string;
}): JSX.Element {
    return (
        <div className="border border-danger border-2 rounded p-1 text-danger">
            {messageTitle}
            <br />
            {messageBody}
        </div>
    );
}
