export type a = 'filled' | 'empty' | 'crossed';

export type fieldPlace = 'header' | 'aside' | 'area' | 'miniature';

export type NonogramObject = {
    id: string;
    nonogram: {
        height: number;
        width: number;
        title: {
            en: string;
            ru: string;
            de: string;
        };
        colorMapping: {
            1: string;
            2: string;
        };
        goal: Array<number[]>;
        rows: Array<
            {
                hint: number;
                color: number;
            }[]
        >;
        columns: Array<
            {
                hint: number;
                color: number;
            }[]
        >;
    };
};
