const getTwoDigitIndicator = (time: number): string => {
    const isOneDigit = time < 10;
    const converted = isOneDigit ? `0${time}` : `${time}`;
    return converted;
};

export function Clock({ userTime }: { userTime: number }) {
    const date = new Date(userTime);
    const hours = getTwoDigitIndicator(date.getUTCHours());
    const minutes = getTwoDigitIndicator(date.getUTCMinutes());
    const seconds = getTwoDigitIndicator(date.getUTCSeconds());

    return (
        <div className="p-1 border border-success chronometer">
            {hours}:{minutes}:{seconds}
        </div>
    );
}
