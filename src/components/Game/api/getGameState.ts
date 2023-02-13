import { userCat, userNonogramData } from '../gameUtils/mochas';
import { UserGameDataRaw } from '../gameUtils/types';

export async function getGameState(id: string): Promise<UserGameDataRaw | null> {
    // mocha before implementing request

    return new Promise((resolve) => {
        const data = null;
        // const data = userCat;
        resolve(data);
    });

    // return new Promise((resolve, reject) => {
    //     const data = userNonogramData as UserGameDataRaw;
    //     reject(new Error('no data'));
    // });
}
