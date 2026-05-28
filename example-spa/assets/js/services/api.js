/**
 * Servicio API Rick and Morty
 */

import httpClient from './httpClient.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */

export async function getCharacters() {
    try {
        const response = await httpClient.get('/character');
        return response.data.results;

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getEpisodes() {
    try {
        const response = await httpClient.get('/episode');
        return response.data.results;
    } catch (error) {
        console.error("Error al obtener episodios:", error);
        return [];
    }
}

export async function getLocations() {
    try {
        const response = await httpClient.get('/location');
        return response.data.results;
    } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
        return [];
    }
}


// se guardan en localstore
export async function saveAllData() {
    try {
        // Llamamos a las 3 APIs 
        const [personajes, episodios, ubicaciones] = await Promise.all([
            getCharacters(),
            getEpisodes(),
            getLocations()
        ]);

        // Guardamos cada lista en LocalStorage
        localStorage.setItem('db_characters', JSON.stringify(personajes));
        localStorage.setItem('db_episodes', JSON.stringify(episodios));
        localStorage.setItem('db_locations', JSON.stringify(ubicaciones));        
        
        // Devolvemos un objeto con toda la información unificada
        return { personajes, episodios, ubicaciones };

    } catch (error) {
        console.error('Hubo un error al guardar en localStorage', error);
        return { personajes: [], episodios: [], ubicaciones: [] };
    }
}
saveAllData()

export function deleteCharacter(id) {
    const data = localStorage.getItem('db_characters');
    if (!data) return false;

    const characters = JSON.parse(data);
    const filtered = characters.filter(c => c.id !== id);

    localStorage.setItem('db_characters', JSON.stringify(filtered));
    return true;
}
export function updateCharacter(id, updatedData) {
    const data = localStorage.getItem('db_characters');
    if (!data) return false;

    const characters = JSON.parse(data);
    const index = characters.findIndex(c => c.id === id);
    if (index === -1) return false;

    // Fusiona los datos originales con los nuevos
    characters[index] = { ...characters[index], ...updatedData };

    localStorage.setItem('db_characters', JSON.stringify(characters));
    return true;
}