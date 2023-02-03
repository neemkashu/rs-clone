export default function Cell(hint: string, ...styles: string[]): JSX.Element {
    return (
        <td className="cell-square">
            <div className={`square ${styles.join(' ')}`}>{hint ?? ''}</div>
        </td>
    );
}
