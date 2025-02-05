// Función para obtener el parámetro de la URL
function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Capturar el token de la URL y almacenarlo en localStorage
const token = getParameterByName('token');
if (token) {
    localStorage.setItem('token', token);
    console.log('Token almacenado:', token);
} else {
    console.log('Token no encontrado en la URL');
}
function renderFavorites(favorites) {
    const favoritesList = document.getElementById('favoritesList'); // Asegúrate de que esta es la ID correcta para tu lista de favoritos
    favoritesList.innerHTML = ''; // Limpiar la lista de favoritos

    if (favorites.length > 0) {
        favorites.forEach(favorite => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `Raza: ${favorite.breedId}`; // Ajusta según los datos que quieras mostrar
            favoritesList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = 'No tienes favoritos.';
        favoritesList.appendChild(li);
    }
}





document.addEventListener('DOMContentLoaded', () => {
    const breedList = document.getElementById('breedList');
    const breedSearch = document.getElementById('breedSearch');
    const selectedBreedCard = document.getElementById('selectedBreedCard');
    const breedName = document.getElementById('breedName');
    const breedDescription = document.getElementById('breedDescription');
    const breedImage = document.getElementById('breedImage');
    const addFavoriteBtn = document.getElementById('addFavoriteBtn');

    let currentBreedId = null; // Variable para almacenar el ID de la raza seleccionada

    breedList.addEventListener('click', async (event) => {
        if (event.target.classList.contains('breed-link')) {
            event.preventDefault();
            const breedId = event.target.getAttribute('data-breed-id');
            currentBreedId = breedId; // Guardar el ID de la raza seleccionada
            try {
                const response = await fetch(`/api/breeds/${breedId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const breedInfo = await response.json();
                console.log("Datos de la raza:", breedInfo); // Añadir un log para verificar los datos de la raza
                breedName.textContent = breedInfo.name;
                breedDescription.innerHTML = breedInfo.description; // Limpiar y actualizar la descripción

                // Mostrar la imagen de la raza
                if (breedInfo.image && breedInfo.image.url) {
                    breedImage.src = breedInfo.image.url;
                    breedImage.alt = breedInfo.name;
                    breedImage.style.display = 'block';
                } else {
                    breedImage.style.display = 'none'; // Ocultar la imagen si no hay URL
                }

                // Mostrar detalles adicionales
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
            } catch (error) {
                console.error('Error al cargar la información de la raza:', error);
            }
        }
    });

    addFavoriteBtn.addEventListener('click', async () => {
        console.log("hemos llegado aquí??????");
        console.log('Token:', localStorage.getItem('token'));
        console.log('currentBreedId:', currentBreedId);
    
        if (currentBreedId) {
            try {
                const response = await fetch('/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Asumiendo que el token se guarda en localStorage
                    },
                    body: JSON.stringify({ breedId: currentBreedId })
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const favorite = await response.json();
                console.log('Favorito agregado:', favorite);
                alert('Raza añadida a favoritos!');
                // Actualizar la lista de favoritos en el DOM
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
                alert('Error al agregar favorito en addfavorites userHome.js');
            }
        } else {
            alert('Selecciona una raza para añadir a favoritos');
        }
    });
    
    
    

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

     
