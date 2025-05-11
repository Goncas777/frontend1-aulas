import { fetchMovies, createPost, updatePost, deletePost } from "./fetch.js";

document.addEventListener("DOMContentLoaded", async () => {
  const modal = document.getElementById("add-post-modal");
  modal.style.display = "none";

  const allMovies = await fetchMovies();
  displayMovies(allMovies);
  setupModal();
  setupEditButtonModal();
  setupDeleteButton();
});

function displayMovies(allMovies) {
  const popularContainer = document.querySelector("#popular .movie-grid");
  const newContainer = document.querySelector("#new .movie-grid");

  popularContainer.innerHTML = "";
  newContainer.innerHTML = "";

  const filmesPopulares = allMovies.filter(f => f.categories?.includes("Filmes-Populares"));
  const filmesNovos = allMovies.filter(f => f.categories?.includes("Novos-Lancamentos"));

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
  link.href = `filme.html?id=${filme.id}`;

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




async function openEditModalByTitle(movieTitle) {
  const allMovies = await fetchMovies();
  const movieToEdit = allMovies.find(movie =>
    movie.title.toLowerCase() === movieTitle.toLowerCase()
  );

  if (movieToEdit) {
    const modal = document.getElementById("add-post-modal");
    const modalTitle = modal.querySelector("h2");
    const form = document.getElementById("add-post-form");
    const submitButton = form.querySelector(".submit-button");

    modalTitle.textContent = "Editar Filme";
    submitButton.textContent = "Atualizar Filme";

    document.getElementById("post-title").value = movieToEdit.title;
    document.getElementById("post-description").value = movieToEdit.description;
    document.getElementById("post-genre").value = movieToEdit.genre;
    document.getElementById("post-image").value = movieToEdit.image;
    document.getElementById("post-categories").value = movieToEdit.categories.join(", ");
    document.getElementById("post-rating").value = movieToEdit.rating;
    document.getElementById("post-trailer").value = movieToEdit.trailer;

    form.dataset.mode = "edit";
    form.dataset.postId = String(movieToEdit.id); 
    modal.style.display = "flex";
  } else {
    alert("Filme não encontrado.");
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
      categories: document.getElementById("post-categories").value.split(",").map(cat => cat.trim()),
      rating: document.getElementById("post-rating").value,
      trailer: document.getElementById("post-trailer").value
    };
  
    try {
      console.log("Dados para enviar:", postData);
      if (addPostForm.dataset.mode === "edit") {
        const postId = addPostForm.dataset.postId;
        console.log("Editando post com ID:", postId);
        await updatePost(postId, postData);
      } else {
        postData.id = crypto.randomUUID();
        postData.createdAt = new Date().toISOString();
        await createPost(postData);
      }
  
      const allMovies = await fetchMovies();
      displayMovies(allMovies);
      modal.style.display = "none";
      addPostForm.reset();
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
      alert("Falha ao salvar o post. Tente novamente.");
    }
  });
  
}


function setupEditButtonModal() {
  const editBtn = document.getElementById("edit-movie-btn");
  const titleModal = document.getElementById("movie-title-modal");
  const closeTitleModal = document.getElementById("close-title-modal");
  const titleInput = document.getElementById("edit-movie-title-input");

  editBtn.addEventListener("click", () => {
    titleModal.style.display = "flex";
    titleInput.value = "";
    titleInput.focus();
  });

  closeTitleModal.addEventListener("click", () => {
    titleModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === titleModal) {
      titleModal.style.display = "none";
    }
  });

  titleInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const movieTitle = titleInput.value.trim();
      if (movieTitle) {
        titleModal.style.display = "none";
        await openEditModalByTitle(movieTitle);
      }
    }
  });
}


function setupDeleteButton() {
  const deleteBtn = document.getElementById("delete-movie-btn");

  deleteBtn.addEventListener("click", async () => {
    const movieTitle = prompt("Digite o título exato do filme que deseja excluir:");

    if (!movieTitle) return;

    const allMovies = await fetchMovies();
    const movieToDelete = allMovies.find(movie =>
      movie.title.toLowerCase() === movieTitle.toLowerCase()
    );

    if (!movieToDelete) {

      Swal.fire({
        title: 'Erro!',
        text: 'Filme não encontrado.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }


    const confirmDelete = await Swal.fire({
      title: 'Tem certeza?',
      text: `Tem certeza que deseja excluir o filme "${movieToDelete.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deletePost(movieToDelete.id);
        

        Swal.fire({
          title: 'Sucesso!',
          text: 'Filme excluído com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        const updatedMovies = await fetchMovies();
        displayMovies(updatedMovies);
      } catch (error) {
        console.error("Erro ao excluir o filme:", error);
        

        Swal.fire({
          title: 'Erro!',
          text: 'Falha ao excluir o filme. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  });
}

document.getElementById("search-input").addEventListener("input", async function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const allMovies = await fetchMovies();

  const filteredMovies = allMovies.filter((filme) => {
    return (
      filme.title.toLowerCase().includes(searchTerm) ||
      filme.genre.toLowerCase().includes(searchTerm) ||
      filme.description.toLowerCase().includes(searchTerm)
    );
  });

  displayMovies(filteredMovies);
});
