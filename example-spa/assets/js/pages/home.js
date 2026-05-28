import { loadHTML } from '../utils/helpers.js';
import { getCharacters } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { deleteCharacter } from '../services/api.js';

/**
 * Renderiza Home
 */
export async function renderHome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/home.html'
    );
    renderCharacters(); // función separada para poder re-renderizar

    // Delegación de eventos: un solo listener para todos los botones
    const container = document.getElementById('characters-container');
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action="delete"]');
        if (!btn) return;

        const id = Number(btn.dataset.id);
        deleteCharacter(id);
        renderCharacters(); // re-renderiza sin recargar la página
    });
}
function renderCharacters() {
    const container = document.getElementById('characters-container');
    const characters = JSON.parse(localStorage.getItem('db_characters') || '[]');
    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');
}
