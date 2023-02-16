export default function EnglishFlag(): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0,0 25,15"
        >
            <desc>Switch page language to english</desc>
            <rect width="25" height="15" fill="#00247d" />
            <path d="M 0,0 L 25,15 M 25,0 L 0,15" stroke="#fff" strokeWidth="3" />
            <path d="M 12.5,0 V 15 M 0,7.5 H 25" stroke="#fff" strokeWidth="5" />
            <path d="M 12.5,0 V 15 M 0,7.5 H 25" stroke="#cf142b" strokeWidth="3" />
        </svg>
    );
}
