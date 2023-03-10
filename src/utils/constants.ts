import { SettingsTimingsEnum } from './enums';
import { getEmptyCellSettingInCurrenLanguage } from './helpers';

export const NONOGRAM_INFO = {
    // temp const before getting info from back-end
    id: 234,
    title: 'Bowl',
    width: 3,
    height: 2,
    difficulty: 0.2,
    status: 'new',
    userTime: 0,
    rows: `
1,1
1`,
    columns: `
1
1
1`,
    goal: '000000000000001110000000000000000000000000001111100000000000000000000000000011110000000000000000000000000001111100000000000000000000000001111100000000000001111111111111111111000000000011111111111111111111110000000001111111111111111111111000000000000001111100000001111100000000000011111100000001111100000000000111110000111100011110000000001111110011111110001110000000111111100011111110001111000011111111100011111111001111000011111111100011111111001111001111110111110011111110001111011111100111110001111100011110111110000011111000000000011110111100000011111100000001111100011100000001111110000011111100000000000000111111111111111000000000000000001111111111110000000000000000000111111111000000000000000000000001111100000000000000000000000000111000000000',
};

export const cellClass = {
    filled: 'filled-square',
    empty: '',
    crossed: 'crossed-square',
};

export const standardSettingsState = {
    main: {
        showNonogramTitlesBeforeSolving: false,
        showNonogramThumbnailsBeforeSolving: false,
    },
    game: {
        highlightCellsWithError: SettingsTimingsEnum.NEVER,
        automaticallyCrossOutNumbers: SettingsTimingsEnum.NEVER,
        lastCrossedOutDigitFillsLineWithCrosses: false,
    },
    view: {
        markingAnEmptyCell: getEmptyCellSettingInCurrenLanguage(),
        showGuessTime: false,
    },
};

export const catalogDBLength = 75;
