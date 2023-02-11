import { NonogramObject } from '../utils/types';

export async function getCatalogDB(): Promise<NonogramObject[]> {
    try {
        const response = await fetch('http://localhost:3000/nonograms', {
            method: 'GET',
        });
        return await response.json();
    } catch (e) {
        console.error(e);
        console.warn('this error occurred while fetching the catalog database');
        return [];
    }
}
