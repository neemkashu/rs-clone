import { currentUserToken } from '../../../utils/enums';
import {
    ResponseStatus,
    UserGameData,
    UserGameDataRaw,
    UserGameForServer,
} from '../gameUtils/types';
import { SERVER_ADDRESS } from './getNonogramByID';

export const sendGameToServer = async (
    userGameData: UserGameForServer,
    id: string
): Promise<ResponseStatus> => {
    try {
        const url = `${SERVER_ADDRESS}users-games/${id}`;
        const options = {
            method: 'POST',
            body: JSON.stringify(userGameData),
            headers: {
                'Content-type': 'application/json',
                token: localStorage.getItem(currentUserToken) || '',
            },
        };
        if (userGameData) {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Response not ok while saving the game!');
            }
        }
        return ResponseStatus.SUCCESS;
    } catch (error) {
        console.warn('error when fetching user game', id);
        return ResponseStatus.ERROR;
    }
};
