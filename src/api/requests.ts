import { NonogramObject, UserWinsObject } from '../utils/types';

const SERVER = 'https://rs-clone-backend-1hqs.onrender.com';

export async function getCatalogDB(): Promise<NonogramObject[]> {
    try {
        const response = await fetch(`${SERVER}/nonograms`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('this error occurred while fetching the catalog database');
        }
        return await response.json();
    } catch (e) {
        console.warn(e);
        return [];
    }
}

export async function getSolvedGames(): Promise<UserWinsObject> {
    try {
        const response = await fetch(`${SERVER}/users-games`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('this error occurred while fetching user games');
        }
        return await response.json();
    } catch (e) {
        console.warn(e);
        return { data: [] };
    }
}

export async function getRandomNonogramId(): Promise<string | null> {
    try {
        const response = await fetch(`${SERVER}/nonograms/random`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('this error occurred while fetching user games');
        }
        const data = await response.json();
        return data.id;
    } catch (e) {
        console.warn(e);
        return null;
    }
}
