document.addEventListener("DOMContentLoaded", function () {
    const movieId = new URLSearchParams(window.location.search).get("id");
  
    if (movieId) {
      fetchMovieById(movieId)
        .then((movie) => {
          if (movie) {
            renderMovieDetails(movie);
          } else {
            Swal.fire({
              title: 'Erro!',
              text: 'Filme não encontrado.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar filme:", error);
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível carregar o filme. Tente novamente.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'ID do filme não fornecido.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });
  
  async function fetchMovieById(id) {
    const response = await fetch(`https://67f56876913986b16fa4784c.mockapi.io/api/project/${id}`);
    if (!response.ok) {
      throw new Error("Filme não encontrado");
    }
    return await response.json();
  }
  
  function renderMovieDetails(movie) {
    const heroContainer = document.getElementById("hero-container");
    const title = document.getElementById("hero-title");
    const postContent = document.getElementById("post-content");
    const postGallery = document.getElementById("post-gallery");
  
    title.innerHTML = movie.title;
    heroContainer.style.backgroundImage = `url(${movie.image})`;
    heroContainer.style.backgroundSize = "cover";
    heroContainer.style.backgroundPosition = "center";
    heroContainer.style.backgroundRepeat = "no-repeat";
  
    postContent.innerHTML = `
      <h3>Descrição:</h3>
      <p>${movie.description}</p>
      <h3>Gênero:</h3>
      <p>${movie.genre}</p>
      <h3>Link:</h3>
      <a href="${movie.link}" target="_blank">${movie.link}</a>
    `;
  
    postGallery.innerHTML = movie.gallery?.map(image => {
      return `<img src="${image.url}" alt="${image.alt}" class="gallery-image" />`;
    }).join("") || "";
  }
  