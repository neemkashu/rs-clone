import { NonogramRaw, UserGameDataRaw } from '../gameUtils/types';
import { SERVER_ADDRESS } from './getNonogramByID';

export async function getGameState(id: string): Promise<UserGameDataRaw | null> {
    try {
        const url = `${SERVER_ADDRESS}users-games/${id}`;
        const options = {
            method: 'GET',
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('responce not ok!');
        }
        const userGame: UserGameDataRaw = await response.json();
        return userGame;
    } catch (error) {
        console.warn('error when fetching user game', id);
        return null;
    }
}
