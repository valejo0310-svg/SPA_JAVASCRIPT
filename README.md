# Rick and Morty SPA

SPA construida con JavaScript Vanilla que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/). Permite visualizar personajes, episodios y ubicaciones, con operaciones CRUD persistidas en `localStorage`.

---

## Estructura del proyecto

```
example-spa/
├── index.html
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        ├── app.js              
        ├── router.js 
        ├── components/
        │   ├── navbar.js
        │   ├── characterCard.js
        │   ├── episodeCard.js  
        │   └── locationCard.js  
        ├── pages/
        │   ├── home.js         
        │   ├── episodes.js   
        │   ├── location.js
        │   ├── add.js
        │   ├── about.js
        │   └── contacts.js
        ├── services/
        │   ├── api.js   
        │   └── httpClient.js  
        ├── utils/
        │   └── helpers.js   
        └── views/      
```

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

> Requiere Node.js >= 18

---

## Rutas disponibles

| Ruta | Vista |
|---|---|
| `/` | Personajes |
| `/episodes` | Episodios |
| `/locations` | Ubicaciones |
| `/new` | Crear personaje |
| `/about` | Acerca de |
| `/contacts` | Contacto |

---

## Funcionalidades CRUD

Todas las operaciones se aplican sobre `localStorage` y **no modifican la API pública**.

| Operación | Descripción |
|---|---|
| **Crear** | Formulario en `/new` — el personaje se agrega al `localStorage` y coexiste con los de la API |
| **Leer** | Al cargar la app, los datos se obtienen de la API una sola vez y se guardan localmente |
| **Editar** | Desde la card del personaje — permite modificar nombre, especie y estado |
| **Eliminar** | Desde la card — elimina del DOM y del `localStorage` con confirmación previa |

### Persistencia

La primera carga llama a la API y guarda los datos en `localStorage`. Las cargas siguientes usan los datos locales, por lo que **las eliminaciones y ediciones sobreviven a la recarga**.

```
Primera visita  →  API de Rick and Morty  →  localStorage
Visitas siguientes  →  localStorage (sin llamar a la API)
```

---

## Arquitectura SPA

La navegación usa `history.pushState` para cambiar la URL sin recargar la página. El router lee `window.location.pathname` y ejecuta la función de renderizado correspondiente.

```
Click en nav  →  navigateTo(url)  →  pushState  →  router()  →  renderVista()
```

Los links usan `data-link` para ser interceptados por el router en lugar de seguir el comportamiento nativo del navegador.
