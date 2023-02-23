import { useAppSelector } from './hooks';

const getTwoDigitIndicator = (time: number): string => {
    const isOneDigit = time < 10;
    const converted = isOneDigit ? `0${time}` : `${time}`;
    return converted;
};

export function Clock({ userTime }: { userTime: number }): JSX.Element {
    const isVisible = useAppSelector((state) => state.settings.view.showGuessTime);
    const date = new Date(userTime);
    const hours = getTwoDigitIndicator(date.getUTCHours());
    const minutes = getTwoDigitIndicator(date.getUTCMinutes());
    const seconds = getTwoDigitIndicator(date.getUTCSeconds());

    const component = isVisible ? (
        <div className="p-1 border border-success chronometer">
            {hours}:{minutes}:{seconds}
        </div>
    ) : (
        <div />
    );

    return component;
}
