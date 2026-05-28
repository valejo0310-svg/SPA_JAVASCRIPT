import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';

/**
 * Renderiza Home
 */
export async function renderHome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    const container = document.getElementById(
        'characters-container'
    );
    const keycharacters = localStorage.getItem('db_characters')
    const characters = JSON.parse(keycharacters)
    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');
}
