import { GameStatus, UserGameData, UserGameDataRaw } from './types';

export const userNonogramData = {
    data: {
        currentGame: {
            state: 'started',
            currentUserSolution: [
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [0, 1, 2, 2, 2, 2, 2, 1, 0],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null],
            ],
            currentTime: 200,
            currentUserRows: [
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }, { isCrossedOut: false }],
                [{ isCrossedOut: true }, { isCrossedOut: true }, { isCrossedOut: true }],
                [
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                ],
                [
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                ],
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
            ],
            currentUserColumns: [
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }, { isCrossedOut: false }],
                [
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                ],
                [
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                ],
                [
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                ],
                [
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                ],
                [
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                    { isCrossedOut: false },
                ],
                [{ isCrossedOut: false }, { isCrossedOut: false }],
                [{ isCrossedOut: false }],
            ],
        },
    },
};

export const nonogram = {
    id: '1ayVkqWTUxx0EAG3IUOb',
    nonogram: {
        height: 35,
        width: 30,
        title: {
            de: '',
            en: 'Charlie',
            ru: '',
        },
        colorMapping: {
            '1': '#000000',
        },
        goal: [
            [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
                0, 0, 0, 0, 0,
            ],
            [
                0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 0, 0, 0,
            ],
            [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1,
            ],
            [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1,
            ],
            [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1,
            ],
            [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1,
            ],
            [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1,
            ],
            [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1,
            ],
            [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1,
            ],
        ],
        rows: [
            [
                {
                    hint: 7,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 10,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 11,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 12,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 12,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 12,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 9,
                    color: 1,
                },
            ],
            [
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 11,
                    color: 1,
                },
            ],
            [
                {
                    hint: 21,
                    color: 1,
                },
            ],
            [
                {
                    hint: 23,
                    color: 1,
                },
            ],
            [
                {
                    hint: 6,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 6,
                    color: 1,
                },
            ],
            [
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
            ],
            [
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
            ],
            [
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
            ],
            [
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
            ],
            [
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 5,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
            ],
            [
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
            ],
            [
                {
                    hint: 6,
                    color: 1,
                },
                {
                    hint: 6,
                    color: 1,
                },
            ],
            [
                {
                    hint: 7,
                    color: 1,
                },
                {
                    hint: 7,
                    color: 1,
                },
                {
                    hint: 8,
                    color: 1,
                },
            ],
            [
                {
                    hint: 9,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 10,
                    color: 1,
                },
            ],
            [
                {
                    hint: 13,
                    color: 1,
                },
                {
                    hint: 14,
                    color: 1,
                },
            ],
            [
                {
                    hint: 10,
                    color: 1,
                },
                {
                    hint: 5,
                    color: 1,
                },
                {
                    hint: 11,
                    color: 1,
                },
            ],
            [
                {
                    hint: 10,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 11,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 11,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 12,
                    color: 1,
                },
            ],
            [
                {
                    hint: 12,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 13,
                    color: 1,
                },
            ],
        ],
        columns: [
            [
                {
                    hint: 7,
                    color: 1,
                },
            ],
            [
                {
                    hint: 7,
                    color: 1,
                },
            ],
            [
                {
                    hint: 7,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 8,
                    color: 1,
                },
            ],
            [
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 8,
                    color: 1,
                },
            ],
            [
                {
                    hint: 6,
                    color: 1,
                },
                {
                    hint: 8,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
                {
                    hint: 9,
                    color: 1,
                },
            ],
            [
                {
                    hint: 13,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 9,
                    color: 1,
                },
            ],
            [
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 5,
                    color: 1,
                },
                {
                    hint: 13,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 6,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
            ],
            [
                {
                    hint: 7,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
            ],
            [
                {
                    hint: 7,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 12,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 12,
                    color: 1,
                },
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 5,
                    color: 1,
                },
            ],
            [
                {
                    hint: 12,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
            ],
            [
                {
                    hint: 10,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
                {
                    hint: 2,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 6,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
                {
                    hint: 13,
                    color: 1,
                },
            ],
            [
                {
                    hint: 13,
                    color: 1,
                },
                {
                    hint: 4,
                    color: 1,
                },
                {
                    hint: 9,
                    color: 1,
                },
            ],
            [
                {
                    hint: 11,
                    color: 1,
                },
                {
                    hint: 9,
                    color: 1,
                },
            ],
            [
                {
                    hint: 5,
                    color: 1,
                },
                {
                    hint: 8,
                    color: 1,
                },
            ],
            [
                {
                    hint: 3,
                    color: 1,
                },
                {
                    hint: 8,
                    color: 1,
                },
            ],
            [
                {
                    hint: 1,
                    color: 1,
                },
                {
                    hint: 8,
                    color: 1,
                },
            ],
            [
                {
                    hint: 8,
                    color: 1,
                },
            ],
            [
                {
                    hint: 7,
                    color: 1,
                },
            ],
            [
                {
                    hint: 7,
                    color: 1,
                },
            ],
            [
                {
                    hint: 7,
                    color: 1,
                },
            ],
        ],
    },
};

export const martini = {
    id: '123456789abc',
    nonogram: {
        height: 11,
        width: 9,
        title: {
            en: 'Martini',
            ru: 'Мартини',
            de: 'Martini',
        },
        colorMapping: {
            '1': '#000000',
            '2': '#c91414',
        },
        goal: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 1, 2, 2, 2, 2, 2, 1, 0],
            [0, 0, 1, 2, 2, 2, 1, 0, 0],
            [0, 0, 0, 1, 2, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0],
        ],
        rows: [
            [{ hint: 9, color: 1 }],
            [
                { hint: 1, color: 1 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 5, color: 2 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 3, color: 2 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 1, color: 2 },
                { hint: 1, color: 1 },
            ],
            [{ hint: 1, color: 1 }],
            [{ hint: 1, color: 1 }],
            [{ hint: 1, color: 1 }],
            [{ hint: 1, color: 1 }],
            [{ hint: 1, color: 1 }],
            [{ hint: 5, color: 1 }],
        ],
        columns: [
            [{ hint: 2, color: 1 }],
            [
                { hint: 1, color: 1 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 1, color: 2 },
                { hint: 1, color: 1 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 2, color: 2 },
                { hint: 1, color: 1 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 1, color: 2 },
                { hint: 6, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 2, color: 2 },
                { hint: 1, color: 1 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 1, color: 2 },
                { hint: 1, color: 1 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 1, color: 1 },
            ],
            [{ hint: 2, color: 1 }],
        ],
    },
};

export const Cat = {
    id: '77777',
    nonogram: {
        height: 3,
        width: 5,
        title: {
            en: 'Cat',
            ru: 'Кошка',
            de: 'Das Cat',
        },
        colorMapping: {
            '1': '#000000',
        },
        goal: [
            [1, 0, 1, 0, 0],
            [0, 1, 0, 1, 1],
            [0, 1, 0, 0, 0],
        ],
        rows: [
            [
                { hint: 1, color: 1 },
                { hint: 1, color: 1 },
            ],
            [
                { hint: 1, color: 1 },
                { hint: 2, color: 1 },
            ],
            [{ hint: 1, color: 1 }],
        ],
        columns: [
            [{ hint: 1, color: 1 }],
            [{ hint: 2, color: 1 }],
            [{ hint: 1, color: 1 }],
            [{ hint: 1, color: 1 }],
            [{ hint: 1, color: 1 }],
        ],
    },
};
export const userCat: UserGameDataRaw = {
    data: {
        currentGame: {
            state: GameStatus.STARTED,
            currentUserSolution: [
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
            ],
            currentTime: 10000,
            currentUserRows: [
                [{ isCrossedOut: false }, { isCrossedOut: false }],
                [{ isCrossedOut: false }, { isCrossedOut: false }],
                [{ isCrossedOut: false }],
            ],
            currentUserColumns: [
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
                [{ isCrossedOut: false }],
            ],
        },
    },
};
