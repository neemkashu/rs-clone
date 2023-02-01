import './Stopwatch.scss';

const NONOGRAM_INFO = {
    // temp const before getting info from back-end
    name: 'Apple',
    width: 30,
    height: 20,
    difficulty: 3.2,
    status: 'new',
    id: 234,
    userTime: 375570842,
};

const { userTime } = NONOGRAM_INFO;

const getTwoDigitIndicator = (time: number) => {
    const isOneDigit = time < 10;
    const converted = isOneDigit ? `0${time}` : `${time}`;
    return converted;
};

function Stopwatch(): JSX.Element {
    const date = new Date(userTime);
    const hours = getTwoDigitIndicator(date.getHours());
    const minutes = getTwoDigitIndicator(date.getMinutes());
    const seconds = getTwoDigitIndicator(date.getSeconds());
    return (
        <div className="container game-timer">
            {hours}:{minutes}:{seconds}
        </div>
    );
}

export default Stopwatch;
