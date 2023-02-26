import { CSSProperties } from 'react';
import './Sakura.scss';

const MAX_DELAY = 10;
const MIN_DELAY = 0.3;

const getPetalStyle = (n: number) => {
    const order3 = n % 3;

    const animation: CSSProperties = {
        animation: `falling${order3 + 1} 10s 0s infinite`,
    };
    const size: CSSProperties = {
        height: `${15 + 5 * order3}px`,
        width: `${18 + 6 * order3}px`,
    };
    const delay: CSSProperties = {
        animationDelay: `${Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY}s`,
    };
    return {
        ...animation,
        ...size,
        ...delay,
    };
};

export function Sakura() {
    return (
        <div className="sakura">
            {Array.from({ length: 25 }).map((_, index) => {
                const key = `${index}-index`;
                return <div key={key} style={getPetalStyle(index)} />;
            })}
            ;
        </div>
    );
}
