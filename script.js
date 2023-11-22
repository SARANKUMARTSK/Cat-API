// CatAPI class to handle fetching cat images
class CatAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.thecatapi.com/v1/images/search';
  }

  // Method to fetch cat images with given parameters
  fetchCatImages(limit = 10, breedId = 'beng') {
    const url = `${this.baseUrl}?limit=${limit}&breed_ids=${breedId}&api_key=${this.apiKey}`;
    
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}

// Event listener for button click to fetch cat images
document.querySelector('.fetchButton').addEventListener('click', async () => {
  const catAPI = new CatAPI('cac0d4d01c515d97f4e505975da17e99');
  const catImagesContainer = document.querySelector('.catImages');
  
  try {
    const catImages = await catAPI.fetchCatImages(); // Fetch cat images
    
    catImagesContainer.innerHTML = ''; // Clear previous content
    
    // Display fetched cat images
    catImages.forEach(cat => {
      const imageElement = document.createElement('img');
      imageElement.src = cat.url;
      imageElement.alt = 'Cat';
      catImagesContainer.appendChild(imageElement);
    });
  } catch (error) {
    console.error('Error fetching cat images:', error);
  }
});