import { fetchMovies } from "./fetch.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Chamando a função fetchMovies para pegar os dados da API
  const { filmesPopulares, filmesNovos } = await fetchMovies();

  // Verifique se os filmes foram carregados corretamente
  console.log("Filmes Populares:", filmesPopulares);
  console.log("Filmes Novos:", filmesNovos);

  // Exibe os filmes na tela
  displayMovies(filmesPopulares, filmesNovos);
  
  // Configura o modal
  setupModal();
});

// Função para preencher as seções de filmes populares e novos lançamentos
function displayMovies(filmesPopulares, filmesNovos) {
  // Preencher a seção de Filmes Populares
  filmesPopulares.forEach((filme, index) => {
    const linkElement = document.getElementById(`Link_Popular_${index + 1}`);
    const imgElement = document.getElementById(`Image_Popular_${index + 1}`);
    const titleElement = document.getElementById(`Title_Popular_${index + 1}`);
    const genreElement = document.getElementById(`Genre_Popular_${index + 1}`);
    const descriptionElement = document.getElementById(`Description_Popular_${index + 1}`);

    imgElement.src = filme.image;  // Define a imagem
    titleElement.textContent = filme.title;  // Define o título
    genreElement.textContent = filme.genre;  // Define o gênero
    descriptionElement.textContent = filme.description;  // Define a descrição
    linkElement.href = filme.link;  // Define o link do filme
  });

  // Preencher a seção de Novos Lançamentos
  filmesNovos.forEach((filme, index) => {
    const linkElement = document.getElementById(`Link_New_${index + 1}`);
    const imgElement = document.getElementById(`Image_New_${index + 1}`);
    const titleElement = document.getElementById(`Title_New_${index + 1}`);
    const genreElement = document.getElementById(`Genre_New_${index + 1}`);
    const descriptionElement = document.getElementById(`Description_New_${index + 1}`);

    imgElement.src = filme.image;  // Define a imagem
    titleElement.textContent = filme.title;  // Define o título
    genreElement.textContent = filme.genre;  // Define o gênero
    descriptionElement.textContent = filme.description;  // Define a descrição
    linkElement.href = filme.link;  // Define o link do filme
  });
}

setupPostActions();

function setupPostActions() {
    // Setup edit buttons
    document.querySelectorAll(".edit-post-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const postId = e.currentTarget.dataset.id;
        openEditModal(postId);
      });
    });
  
    // Setup delete buttons
    document.querySelectorAll(".delete-post-btn").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const postId = e.currentTarget.dataset.id;
  
        if (confirm("Are you sure you want to delete this post?")) {
          try {
            await deletePost(postId);
            const updatedPosts = await getPosts();
            displayPosts(updatedPosts);
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
  
      // Change the modal title and button text
      modalTitle.textContent = "Edit Post";
      submitButton.textContent = "Update Post";
  
      // Get the post data
      const posts = await getPosts();
      const post = posts.find((p) => p.id === postId);
  
      if (!post) {
        alert("Post not found!");
        return;
      }
  
      // Fill the form with the post data
      document.getElementById("post-title").value = post.title;
      document.getElementById("post-content").value = post.content;
      document.getElementById("post-image").value = post.image;
      document.getElementById("post-author").value = post.author;
      document.getElementById("post-avatar").value = post.avatar;
  
      // Add a data attribute to the form to mark it as edit mode
      form.dataset.mode = "edit";
      form.dataset.postId = postId;
  
      // Show the modal
      modal.style.display = "flex";
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
  
    // Open modal for new post
    openModalBtn.addEventListener("click", () => {
      const modalTitle = modal.querySelector("h2");
      const submitButton = addPostForm.querySelector(".submit-button");
  
      // Reset to add mode
      modalTitle.textContent = "Add New Post";
      submitButton.textContent = "Add Post";
      addPostForm.dataset.mode = "add";
      delete addPostForm.dataset.postId;
  
      // Reset form
      addPostForm.reset();
  
      // Show modal
      modal.style.display = "flex";
    });
  
    // Close modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      addPostForm.reset();
    });
  
    // Close when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        addPostForm.reset();
      }
    });
  
    // Handle form submission (create or update)
    addPostForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const postData = {
        title: document.getElementById("post-title").value,  // Título do filme
        description: document.getElementById("post-description").value,  // Descrição do filme
        genre: document.getElementById("post-genre").value,  // Gênero do filme
        image: document.getElementById("post-image").value,  // URL da imagem do filme
        link: document.getElementById("post-link").value
      };
  
      try {
        // Check if we're in edit mode
        if (addPostForm.dataset.mode === "edit") {
          const postId = addPostForm.dataset.postId;
          await updatePost(postId, postData);
        } else {
          // We're in add mode
          postData.createdAt = new Date().toISOString();
          await createPost(postData);
        }
  
        // Refresh the post list and reset the form
        const updatedPosts = await getPosts();
        displayPosts(updatedPosts);
        modal.style.display = "none";
        addPostForm.reset();
      } catch (error) {
        console.error("Error saving post:", error);
        alert("Failed to save post. Please try again.");
      }
    });
  }