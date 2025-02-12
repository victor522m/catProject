const axios = require('axios');
const Breed = require('./models/Breed'); // Ajusta la ruta según tu estructura de archivos
const API_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_zykYgXxEske0063FTWPkTmRv9xliXOVDB4Fntanuz3jutMzoA8a7WWq2SkhISaEy';

async function getBreedImage(breedId) {
  try {
    const response = await axios.get(`${API_URL}/images/search`, {
      headers: { 'x-api-key': API_KEY },
      params: { breed_id: breedId }
    });
    return response.data[0];
  } catch (error) {
    console.error(`Error al obtener imagen para la raza ${breedId}:`, error);
    return null; // Devuelve null si hay un error
  }
}

async function fetchAndSaveBreeds() {
  try {
    const response = await axios.get(`${API_URL}/breeds`, {
      headers: { 'x-api-key': API_KEY }
    });
    const breedsData = response.data;

    for (const breedData of breedsData) {
      const breedImage = await getBreedImage(breedData.id);
      await Breed.upsert({
        id: breedData.id,
        name: breedData.name,
        description: breedData.description,
        weight: breedData.weight,
        origin: breedData.origin,
        lifeSpan: breedData.life_span,
        temperament: breedData.temperament,
        adaptability: breedData.adaptability,
        affectionLevel: breedData.affection_level,
        childFriendly: breedData.child_friendly,
        dogFriendly: breedData.dog_friendly,
        energyLevel: breedData.energy_level,
        grooming: breedData.grooming,
        healthIssues: breedData.health_issues,
        intelligence: breedData.intelligence,
        sheddingLevel: breedData.shedding_level,
        socialNeeds: breedData.social_needs,
        strangerFriendly: breedData.stranger_friendly,
        vocalisation: breedData.vocalisation,
        imageUrl: breedImage ? breedImage.url : '/images/default.png', // Imagen predeterminada si no se encuentra una imagen
        cfaUrl: breedData.cfa_url,
        vetstreetUrl: breedData.vetstreet_url,
        vcahospitalsUrl: breedData.vcahospitals_url,
        wikipediaUrl: breedData.wikipedia_url
      });
    }

    console.log('Datos de razas guardados en la base de datos.');
  } catch (error) {
    console.error('Error al obtener y guardar datos de razas:', error);
  }
}

fetchAndSaveBreeds();
