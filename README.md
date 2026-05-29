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

`/` Personajes 

`/episodes` :  Episodios 

`/locations` : Ubicaciones 

`/new` : Crear personaje 

`/about` : Acerca de 

`/contacts` : Contacto 

---

## Funcionalidades CRUD

Todas las operaciones se aplican sobre `localStorage` y **no modifican la API pública**.



**Crear** :Formulario en `/new` — el personaje se agrega al `localStorage` y coexiste con los de la API 

**Leer** : Al cargar la app, los datos se obtienen de la API una sola vez y se guardan localmente 

**Editar** :  Desde la card del personaje — permite modificar nombre, especie y estado 

**Eliminar** : Desde la card — elimina del DOM y del `localStorage` con confirmación previa 


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

## Preguntas de analisis

### Pregunta 1

- ¿Cómo manejarán el estado de personajes creados localmente?

Los personajes creados de forma local son guardados en el arreglo con la información de la API local, donde es posible editar su estado sin intervenir con la API, unicamente es posible verlos de forma local

### Pregunta 2

- ¿Cómo diferenciarán personajes originales de personajes ficticios?

Agregandole un label al cual se le cambia el color y el texto interno que inidica si pertenece a la API o son nuevos, para este proceso se utilizo un operador ternario que utiliza de condición la clave otorgada en la función de crear personaje, y a partir de esto se cambia el color y el texto interno

### Pregunta 3 

- ¿Cómo sincronizarán:
API
DOM
localStorage
renderizado SPA?

En la API se toman los datos haciendole una única petición, esta respuesta es almacena en local storage y la información renderizada en el DOM viene directamente del localStorage, y por medio de el renderizado dinámico y los eventos de JavaScript la información cambia dinámicamente tomando un solo contenedor donde se reemplaza el contenido

### Pregunta 4

-¿Cómo evitarán duplicación de lógica?

Mantenemos variables y funciones reutilizables que permiten realizar el resto de funciones sin reescribir la información necesaria

### Pregunta 5 

-¿Qué componentes pueden reutilizarse?

Reutilizamos las clases, funciones y variables que permitien ser reutilizados a lo largo del programa

