const axios = require('axios');

const API_URL = process.env.CAT_API_URL;
const API_KEY = process.env.CAT_API_KEY;

// Función para obtener una imagen aleatoria de un gato
async function getRandomCat() {
  try {
    const response = await axios.get(`${API_URL}/images/search`, {
      headers: { 'x-api-key': API_KEY },
    });
    return response.data[0];
  } catch (error) {
    console.error('Error al obtener datos del modelo:', error);
    throw error;
  }
}
//función para obtener una imagen de un gato por la id de su raza...
async function getBreedImage(breedId) {
  try {
    const response = await axios.get(`${API_URL}/images/search`, {
      headers: { 'x-api-key': API_KEY },
      params: { breed_id: breedId }
    });
    return response.data[0];
  } catch (error) {
    console.error(`Error al obtener imagen para la raza ${breedId}:`, error);
    throw error;
  }
}

// Función para obtener todas las razas de gatos
async function getAllBreeds() {
  try {
    const response = await axios.get(`${API_URL}/breeds`, {
      headers: { 'x-api-key': API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las razas:', error);
    throw error;
  }
}

module.exports = { getRandomCat, getAllBreeds, getBreedImage };


