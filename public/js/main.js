async function fetchNewCat() {
    try {
      const response = await fetch('/cats/random/json');
      const data = await response.json();
      document.getElementById('cat-image').src = data.imageUrl;
      console.log('Nueva URL del gato:', data.imageUrl);
    } catch (error) {
      console.error('Error al obtener una nueva imagen:', error);
    }
  }
  const searchInput = document.getElementById('breedSearch');
  const breedList = document.getElementById('breedList');
  const breedItems = Array.from(breedList.children);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    breedItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  });

