
function renderFavorites(favorites) {
    const favoritesList = document.getElementById('favoritesList'); // Asegúrate de que esta es la ID correcta para tu lista de favoritos
    favoritesList.innerHTML = ''; // Limpiar la lista de favoritos

    if (Array.isArray(favorites) && favorites.length > 0) {
        favorites.forEach(favorite => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `Raza: ${favorite.breedName}`; // Mostrar el nombre de la raza
            favoritesList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = 'No tienes favoritos.';
        favoritesList.appendChild(li);
    }
}
async function updateFavoriteButton(breedId) {
    const isFavorite = await checkFavoriteStatus(breedId);
    if (isFavorite) {
        addFavoriteBtn.textContent = 'Quitar de favoritos';
        addFavoriteBtn.onclick = () => removeFavorite(breedId);
    } else {
        addFavoriteBtn.textContent = 'Añadir a favoritos';
        addFavoriteBtn.onclick = () => addFavorite(breedId, breedNameElement.textContent); // Pasar el texto del elemento breedNameElement
    }
}
async function checkFavoriteStatus(breedId) {
    try {
        const favoritesResponse = await fetch('/favorites', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!favoritesResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const favorites = await favoritesResponse.json();

        if (Array.isArray(favorites)) {
            return favorites.some(fav => fav.breedId === breedId);
        } else {
            console.error('favorites no es un array:', favorites);
            return false;
        }
    } catch (error) {
        console.error('Error al verificar el estado de favoritos:', error);
        return false;
    }
}

function renderFavorites(favorites) {
    const favoritesList = document.getElementById('favoritesList'); // Asegúrate de que esta es la ID correcta para tu lista de favoritos
    favoritesList.innerHTML = ''; // Limpiar la lista de favoritos

    if (Array.isArray(favorites) && favorites.length > 0) {
        favorites.forEach(favorite => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `Raza: ${favorite.breedName}`; // Mostrar el nombre de la raza
            favoritesList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = 'No tienes favoritos.';
        favoritesList.appendChild(li);
    }
}

async function addFavorite(breedId, breedName) {
    try {
        console.log(`Añadiendo favorito: breedId=${breedId}, breedName=${breedName}`);
        const response = await fetch('/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ breedId, breedName }) // Asegúrate de que breedName se envíe
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert('Raza añadida a favoritos!');
        updateFavoriteButton(breedId);

        const updatedFavoritesResponse = await fetch('/favorites', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const updatedFavorites = await updatedFavoritesResponse.json();
        renderFavorites(updatedFavorites);
    } catch (error) {
        console.error('Error al agregar favorito:', error);
        alert('Error al agregar favorito');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const breedList = document.getElementById('breedList');
    const breedSearch = document.getElementById('breedSearch');
    const selectedBreedCard = document.getElementById('selectedBreedCard');
    const breedNameElement = document.getElementById('breedName'); // Asegúrate de que este es el elemento correcto
    const breedDescription = document.getElementById('breedDescription');
    const breedImage = document.getElementById('breedImage');
    const addFavoriteBtn = document.getElementById('addFavoriteBtn');

    let currentBreedId = null;

    breedList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('breed-link')) {
            event.preventDefault();
            const breedId = event.target.getAttribute('data-breed-id');
            currentBreedId = breedId;
            try {
                const response = await fetch(`/api/breeds/${breedId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const breedInfo = await response.json();
                breedNameElement.textContent = breedInfo.name;
                breedDescription.innerHTML = breedInfo.description;

                if (breedInfo.image && breedInfo.image.url) {
                    breedImage.src = breedInfo.image.url;
                    breedImage.alt = breedInfo.name;
                    breedImage.style.display = 'block';
                } else {
                    breedImage.style.display = 'none';
                }

                breedDescription.innerHTML += `
                    <p><strong>Peso:</strong> ${breedInfo.weight.imperial} lbs (${breedInfo.weight.metric} kg)</p>
                    <p><strong>Origen:</strong> ${breedInfo.origin}</p>
                    <p><strong>Esperanza de Vida:</strong> ${breedInfo.life_span} años</p>
                    <p><strong>Temperamento:</strong> ${breedInfo.temperament}</p>
                    <p><strong>Niveles:</strong>
                        <ul>
                            <li>Adaptabilidad: ${breedInfo.adaptability}/5</li>
                            <li>Nivel de Afecto: ${breedInfo.affection_level}/5</li>
                            <li>Amigable con los Niños: ${breedInfo.child_friendly}/5</li>
                            <li>Amigable con los Perros: ${breedInfo.dog_friendly}/5</li>
                            <li>Nivel de Energía: ${breedInfo.energy_level}/5</li>
                            <li>Cuidado del Pelaje: ${breedInfo.grooming}/5</li>
                            <li>Problemas de Salud: ${breedInfo.health_issues}/5</li>
                            <li>Inteligencia: ${breedInfo.intelligence}/5</li>
                            <li>Nivel de Caída del Pelo: ${breedInfo.shedding_level}/5</li>
                            <li>Necesidades Sociales: ${breedInfo.social_needs}/5</li>
                            <li>Amigable con Extraños: ${breedInfo.stranger_friendly}/5</li>
                            <li>Vocalización: ${breedInfo.vocalisation}/5</li>
                        </ul>
                    </p>
                    <p><strong>Más Información:</strong>
                        <ul>
                            <li><a href="${breedInfo.cfa_url}" target="_blank">CFA</a></li>
                            <li><a href="${breedInfo.vetstreet_url}" target="_blank">Vetstreet</a></li>
                            <li><a href="${breedInfo.vcahospitals_url}" target="_blank">VCA Hospitals</a></li>
                            <li><a href="${breedInfo.wikipedia_url}" target="_blank">Wikipedia</a></li>
                        </ul>
                    </p>
                `;

                selectedBreedCard.style.display = 'block';
                updateFavoriteButton(currentBreedId);
            } catch (error) {
                console.error('Error al cargar la información de la raza:', error);
            }
        }
    });

    async function updateFavoriteButton(breedId) {
        const isFavorite = await checkFavoriteStatus(breedId);
        if (isFavorite) {
            addFavoriteBtn.textContent = 'Quitar de favoritos';
            addFavoriteBtn.onclick = () => removeFavorite(breedId);
        } else {
            addFavoriteBtn.textContent = 'Añadir a favoritos';
            addFavoriteBtn.onclick = null; // Limpiar eventos anteriores
            addFavoriteBtn.addEventListener('click', () => addFavorite(breedId, breedNameElement.textContent)); // Añadir el nuevo evento
        }
    }

    async function checkFavoriteStatus(breedId) {
        try {
            const favoritesResponse = await fetch('/favorites', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!favoritesResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const favorites = await favoritesResponse.json();

            if (Array.isArray(favorites)) {
                return favorites.some(fav => fav.breedId === breedId);
            } else {
                console.error('favorites no es un array:', favorites);
                return false;
            }
        } catch (error) {
            console.error('Error al verificar el estado de favoritos:', error);
            return false;
        }
    }

    async function removeFavorite(breedId) {
        try {
            const favoritesResponse = await fetch('/favorites', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const favorites = await favoritesResponse.json();
            const favorite = favorites.find(fav => fav.breedId === breedId);

            if (favorite) {
                const response = await fetch(`/favorites/${favorite.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                alert('Raza eliminada de favoritos!');
                updateFavoriteButton(breedId);

                const updatedFavoritesResponse = await fetch('/favorites', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const updatedFavorites = await updatedFavoritesResponse.json();
                renderFavorites(updatedFavorites);
            }
        } catch (error) {
            console.error('Error al eliminar favorito:', error);
            alert('Error al eliminar favorito');
        }
    }

    breedSearch.addEventListener('input', () => {
        const searchTerm = breedSearch.value.toLowerCase();
        breedList.querySelectorAll('.breed-link').forEach(item => {
            if (item.textContent.toLowerCase().includes(searchTerm)) {
                item.parentElement.style.display = '';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
    });
});
