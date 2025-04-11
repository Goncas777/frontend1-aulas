import { fetchMovies, createPost, updatePost, deletePost } from "./fetch.js";

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

  const actions = document.createElement("div");
  actions.className = "post-actions";

  info.append(title, genre, desc, actions);
  card.append(img, info);
  link.append(card);

  return link;
}

setupPostActions();

async function setupPostActions() {
  setTimeout(() => {
    document.querySelectorAll(".edit-post-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const postId = e.currentTarget.dataset.id;
        openEditModal(postId); // Abrir o modal para editar o filme
      });
    });

    document.querySelectorAll(".delete-post-btn").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const postId = e.currentTarget.dataset.id;

        if (confirm("Tem certeza de que deseja excluir este post?")) {
          try {
            await deletePost(postId); // Chama a função de delete

            // Recarrega os filmes após a exclusão
            const { filmesPopulares, filmesNovos } = await fetchMovies();
            displayMovies(filmesPopulares, filmesNovos);
          } catch (error) {
            console.error("Erro ao excluir o post:", error);
            alert("Falha ao excluir o post. Tente novamente.");
          }
        }
      });
    });
  }, 0); 
}

// Função para editar o filme com base no ID
async function openEditModal(postId) {
  const { filmesPopulares, filmesNovos } = await fetchMovies();
  const allMovies = [...filmesPopulares, ...filmesNovos];

  const movieToEdit = allMovies.find(movie => movie.id === postId); // Buscar pelo ID do filme

  if (movieToEdit) {
    const modal = document.getElementById("add-post-modal");
    const modalTitle = modal.querySelector("h2");
    const form = document.getElementById("add-post-form");
    const submitButton = form.querySelector(".submit-button");

    modalTitle.textContent = "Editar Filme";  
    submitButton.textContent = "Atualizar Filme";

    // Preenche os campos do modal com os dados do post
    document.getElementById("post-title").value = movieToEdit.title;
    document.getElementById("post-description").value = movieToEdit.description;
    document.getElementById("post-genre").value = movieToEdit.genre;
    document.getElementById("post-image").value = movieToEdit.image;
    document.getElementById("post-link").value = movieToEdit.link;

    // Marcar o formulário no modo "editar"
    form.dataset.mode = "edit";
    form.dataset.postId = movieToEdit.id; // Usar o ID agora

    modal.style.display = "flex";
  } else {
    alert("Filme não encontrado.");
  }
}

// Função para excluir o filme pelo ID
async function deleteMovieById(postId) {
  const { filmesPopulares, filmesNovos } = await fetchMovies();
  const allMovies = [...filmesPopulares, ...filmesNovos];

  const movieToDelete = allMovies.find(movie => movie.id === postId);

  if (movieToDelete) {
    const confirmed = confirm(`Tem certeza que deseja excluir o filme "${movieToDelete.title}"?`);
    if (confirmed) {
      try {
        await deletePost(movieToDelete.id);

        const { filmesPopulares, filmesNovos } = await fetchMovies();
        displayMovies(filmesPopulares, filmesNovos);
      } catch (error) {
        alert("Erro ao excluir o filme.");
      }
    }
  } else {
    alert("Filme não encontrado.");
  }
}

// Modificar o setupModal para também tratar a exclusão
function setupModal() {
  const modal = document.getElementById("add-post-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModal = document.querySelector(".close-modal");
  const addPostForm = document.getElementById("add-post-form");

  openModalBtn.addEventListener("click", () => {
    const modalTitle = modal.querySelector("h2");
    const submitButton = addPostForm.querySelector(".submit-button");

    modalTitle.textContent = "Adicionar Novo Filme";
    submitButton.textContent = "Adicionar Filme";
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
      link: document.getElementById("post-link").value,
    };
  
    try {
      if (addPostForm.dataset.mode === "edit") {
        const postId = addPostForm.dataset.postId;  // Aqui já está pegando o ID corretamente
        await updatePost(postId, postData);  // Passando o ID e os dados atualizados
      } else {
        postData.createdAt = new Date().toISOString();
        await createPost(postData);
      }
  
      const { filmesPopulares, filmesNovos } = await fetchMovies();
      displayMovies(filmesPopulares, filmesNovos);
  
      modal.style.display = "none";
      addPostForm.reset();
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
      alert("Falha ao salvar o post. Tente novamente.");
    }
  });
}  

// Aqui você pode adicionar botões para buscar pelo ID e realizar as ações de edição ou exclusão
document.getElementById('edit-movie-btn').addEventListener('click', () => {
  const movieid = prompt("Digite o id do filme para editar:");
  if (movieid) openEditModal(movieid); // Passando ID para a função
});

document.getElementById('delete-movie-btn').addEventListener('click', () => {
  const movieId = prompt("Digite o id do filme para excluir:");
  if (movieId) deleteMovieById(movieId); // Passando ID para a função
});
