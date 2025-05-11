document.addEventListener("DOMContentLoaded", async () => {
  const movieId = new URLSearchParams(window.location.search).get("id");
  const modal = document.getElementById("add-post-modal");
  modal.style.display = "none";
  if (!movieId) {
    Swal.fire("Erro!", "ID do filme não fornecido.", "error");
    return;
  }

  try {
    const movie = await fetchMovieById(movieId);
    if (movie) {
      renderMovieDetails(movie);
    } else {
      Swal.fire("Erro!", "Filme não encontrado.", "error");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Erro!", "Não foi possível carregar o filme.", "error");
  }
});

async function fetchMovieById(id) {
  const response = await fetch(`https://67f56876913986b16fa4784c.mockapi.io/api/project/${id}`);
  if (!response.ok) throw new Error("Erro ao buscar filme");
  return await response.json();
}

function renderMovieDetails(movie) {
  const title = document.getElementById("movie-title");
  const genre = document.getElementById("movie-genre");
  const description = document.getElementById("movie-description");
  const poster = document.getElementById("movie-poster");
  const heroBanner = document.getElementById("hero-banner");
  const trailerContainer = document.getElementById("movie-trailer");
  const ratingContainer = document.getElementById("movie-rating");

  title.textContent = movie.title;
  genre.textContent = movie.genre;
  description.textContent = movie.long_description;

  heroBanner.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${movie.image})`;
  heroBanner.style.backgroundSize = "cover";
  heroBanner.style.backgroundPosition = "center";

  poster.innerHTML = `<img src="${movie.image}" alt="${movie.title}" style="width:100%; border-radius:10px;">`;

  const trailerUrl = movie.trailer.replace("https://youtu.be/", "https://www.youtube.com/embed/");

  trailerContainer.innerHTML = `
    <div class="iframe-container">
      <iframe src="${trailerUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  `;

  if (movie.rating) {
    renderRating(movie.rating, ratingContainer);
  } else {
    ratingContainer.innerHTML = "Avaliação não disponível";
  }
}




function renderRating(rating, container) {
  const [score, total] = rating.split("/").map(Number);
  const fullStars = Math.floor(score / 2); 
  const emptyStars = 5 - fullStars;

  let starsHtml = '';
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<span class="star full">&#9733;</span>';
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<span class="star empty">&#9733;</span>';
  }

  container.innerHTML = `<div class="rating">${starsHtml} <span class="rating-text">${rating}</span></div>`;
}

function renderTrailer(trailerUrl, container) {
  const iframe = document.createElement('iframe');
  iframe.src = trailerUrl;
  iframe.width = "100%";
  iframe.height = "500px";
  iframe.frameBorder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  container.appendChild(iframe);
}






function toggleTheme() {
  const body = document.body;
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const nav = document.querySelector("nav");
  const socialLinks = document.querySelector(".social-links");
  const description = document.querySelector("movie-description");


  body.classList.toggle("whitemode");
  header.classList.toggle("whitemode");
  footer.classList.toggle("whitemode");
  nav.classList.toggle("whitemode");
  socialLinks.classList.toggle("whitemode");
  description.classList.toggle("whitemode");

  body.classList.toggle("darkmode");
  header.classList.toggle("darkmode");
  footer.classList.toggle("darkmode");
  nav.classList.toggle("darkmode");
  socialLinks.classList.toggle("darkmode");
  description.classList.toggle("darkmode");


  if (body.classList.contains("whitemode")) {
      localStorage.setItem("theme", "whitemode");
  } else {
      localStorage.setItem("theme", "darkmode");
  }
}

function checkThemePreference() {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const nav = document.querySelector("nav");
  const socialLinks = document.querySelector(".social-links");
  const description = document.querySelector("movie-description");

  if (savedTheme === "whitemode") {
      body.classList.add("whitemode");
      header.classList.add("whitemode");
      footer.classList.add("whitemode");
      nav.classList.add("whitemode");
      socialLinks.classList.add("whitemode");
      description.classList.add("whitemode");
  } else {
      body.classList.add("darkmode");
      header.classList.add("darkmode");
      footer.classList.add("darkmode");
      nav.classList.add("darkmode");
      socialLinks.classList.add("darkmode");
      description.classList.add("darkmode");
  }
}

const themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", toggleTheme);

checkThemePreference();