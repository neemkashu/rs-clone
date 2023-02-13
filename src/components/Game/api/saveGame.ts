import { ResponseStatus, UserGameData } from '../gameUtils/types';

export const sendGameToServer = (
    userGameData: UserGameData | null,
    id: string
): Promise<string> => {
    return new Promise((resolve) => {
        console.warn('save game on server', userGameData);
        resolve(ResponseStatus.SUCCESS);
    });
};
