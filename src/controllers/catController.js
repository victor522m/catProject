const axios = require('axios');
const { getAllBreeds, getRandomCat } = require('../models/catModel');

// Controlador para obtener 10 imágenes aleatorias de gatos y todas las razas
async function showHomePage(req, res) {
  try {
    const apiUrl = `${process.env.CAT_API_URL}/images/search?limit=10`;
    const headers = { 'x-api-key': process.env.CAT_API_KEY };

    // Obtener 10 imágenes de gatos
    const response = await axios.get(apiUrl, { headers });
    const catImages = response.data.map(cat => cat.url);

    // Obtener todas las razas
    const breeds = await getAllBreeds();

    // Renderizar la vista con ambas variables
    res.render('index', { catImages, breeds });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    res.status(500).send('Error al cargar los datos.');
  }
}

// Controlador para devolver una imagen aleatoria como JSON (AJAX)
async function getRandomCatJson(req, res) {
  try {
    const catData = await getRandomCat();
    res.json({ imageUrl: catData.url });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    res.status(500).json({ error: 'Error al cargar los datos.' });
  }
}

// Controlador para renderizar la vista principal con una imagen aleatoria
async function showRandomCat(req, res) {
  try {
    const catData = await getRandomCat();
    const imageUrl = catData.url;
    res.render('index', { imageUrl });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    res.status(500).send('Error al cargar los datos.');
  }
}

// Controlador para obtener y renderizar la lista de razas (opcional si solo necesitas razas)
async function showBreeds(req, res) {
  try {
    const breeds = await getAllBreeds(); // Obtén todas las razas desde el modelo
    res.render('index', { breeds }); // Pasa las razas a la vista
  } catch (error) {
    console.error('Error al cargar las razas:', error);
    res.status(500).send('Error al cargar las razas.');
  }
}
// Controlador para mostrar los detalles de una raza
async function showBreedDetails(req, res) {
  try {
    const breedId = req.params.id; // Obtener el ID de la raza desde los parámetros de la URL
    const apiUrl = `${process.env.CAT_API_URL}/images/search?breed_ids=${breedId}&limit=1`;
    const headers = { 'x-api-key': process.env.CAT_API_KEY };

    // Obtener un gato aleatorio de esta raza
    const response = await axios.get(apiUrl, { headers });
    const catImage = response.data[0];

    // Obtener información detallada sobre la raza
    const breeds = await getAllBreeds();
    const breedInfo = breeds.find(breed => breed.id === breedId);

    if (!breedInfo) {
      return res.status(404).send('Raza no encontrada');
    }

    // Renderizar la vista con los detalles de la raza
    res.render('breedDetails', { breedInfo, catImage });
  } catch (error) {
    console.error('Error al cargar los detalles de la raza:', error);
    res.status(500).send('Error al cargar los detalles de la raza.');
  }
}

module.exports = { showHomePage, getRandomCatJson, showRandomCat, showBreeds, showBreedDetails };
