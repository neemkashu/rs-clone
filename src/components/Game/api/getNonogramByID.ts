import { NonogramRaw } from '../gameUtils/types';

// const SERVER_ADDRESS = 'http://127.0.0.1:3000/';
export const SERVER_ADDRESS = 'https://rs-clone-backend-1hqs.onrender.com/';

export async function getNonogramByID(id: string): Promise<NonogramRaw | null> {
    try {
        const url = `${SERVER_ADDRESS}nonograms/${id}`;
        const options = {
            method: 'GET',
        };
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('responce not ok!');
        }
        const nonogram: NonogramRaw = await response.json();
        return nonogram;
    } catch (error) {
        console.warn('error when fetching id', id);
        return null;
    }
}
