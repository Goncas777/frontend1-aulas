import { fetchMovies, getFilme, createPost, updatePost, deletePost } from "./fetch.js";

document.addEventListener("DOMContentLoaded", async () => {
  const modal = document.getElementById("add-post-modal");
  modal.style.display = "none"; 
  const { filmesPopulares, filmesNovos } = await fetchMovies();
  console.log("Filmes Populares:", filmesPopulares);
  console.log("Filmes Novos:", filmesNovos);
  displayMovies(filmesPopulares, filmesNovos);
  setupModal();
});


function displayMovies(filmesPopulares, filmesNovos) {
  const popularContainer = document.querySelector("#popular .movie-grid");
  const newContainer = document.querySelector("#new .movie-grid");

  // Limpa conteúdo antigo
  popularContainer.innerHTML = "";
  newContainer.innerHTML = "";

  filmesPopulares.forEach((filme) => {
    const movieCard = createMovieCard(filme);
    popularContainer.appendChild(movieCard);
  });

  filmesNovos.forEach((filme) => {
    const movieCard = createMovieCard(filme);
    newContainer.appendChild(movieCard);
  });
}

function createMovieCard(filme) {
  const link = document.createElement("a");
  link.href = filme.link;

  const card = document.createElement("div");
  card.className = "movie-card";

  const img = document.createElement("img");
  img.src = filme.image;
  img.className = "movie-card-img";

  const info = document.createElement("div");
  info.className = "movie-card-info";

  const title = document.createElement("h3");
  title.textContent = filme.title;

  const genre = document.createElement("p");
  genre.textContent = filme.genre;

  const desc = document.createElement("p");
  desc.textContent = filme.description;

  info.append(title, genre, desc);
  card.append(img, info);
  link.append(card);

  return link;
}


setupPostActions();

function setupPostActions() {
  document.querySelectorAll(".edit-post-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const postId = e.currentTarget.dataset.id;
      openEditModal(postId);
    });
  });

  document.querySelectorAll(".delete-post-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const postId = e.currentTarget.dataset.id;

      if (confirm("Are you sure you want to delete this post?")) {
        try {
          await deletePost(postId);
          const { filmesPopulares, filmesNovos } = await fetchMovies();
          displayMovies(filmesPopulares, filmesNovos);
        } catch (error) {
          console.error("Error deleting post:", error);
          alert("Failed to delete post. Please try again.");
        }
      }
    });
  });
}

async function openEditModal(postId) {
  try {
    const modal = document.getElementById("add-post-modal");
    const modalTitle = modal.querySelector("h2");
    const form = document.getElementById("add-post-form");
    const submitButton = form.querySelector(".submit-button");

    modalTitle.textContent = "Edit Post";
    submitButton.textContent = "Update Post";

    const posts = await fetchMovies();
    const post = posts.find((p) => p.id === postId);

    if (!post) {
      alert("Post not found!");
      return;
    }

    document.getElementById("post-title").value = post.title;
    document.getElementById("post-content").value = post.content;
    document.getElementById("post-image").value = post.image;
    document.getElementById("post-link").value = post.link;


    form.dataset.mode = "edit";
    form.dataset.postId = postId;


  } catch (error) {
    console.error("Error opening edit modal:", error);
    alert("Failed to load post data. Please try again.");
  }
}

function setupModal() {
  const modal = document.getElementById("add-post-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModal = document.querySelector(".close-modal");
  const addPostForm = document.getElementById("add-post-form");

  openModalBtn.addEventListener("click", () => {
    const modalTitle = modal.querySelector("h2");
    const submitButton = addPostForm.querySelector(".submit-button");

    modalTitle.textContent = "Add New Post";
    submitButton.textContent = "Add Post";
    addPostForm.dataset.mode = "add";
    delete addPostForm.dataset.postId;
    addPostForm.reset();
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    addPostForm.reset();
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      addPostForm.reset();
    }
  });

  addPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postData = {
      title: document.getElementById("post-title").value,
      description: document.getElementById("post-description").value,
      genre: document.getElementById("post-genre").value,
      image: document.getElementById("post-image").value,
      link: document.getElementById("post-link").value
    };

    try {
      if (addPostForm.dataset.mode === "edit") {
        const postId = addPostForm.dataset.postId;
        await updatePost(postId, postData);
      } else {
        postData.createdAt = new Date().toISOString();
        await createPost(postData);
      }

      const { filmesPopulares, filmesNovos } = await fetchMovies();
      displayMovies(filmesPopulares, filmesNovos);

      modal.style.display = "none";
      addPostForm.reset();
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post. Please try again.");
    }
  });
}
