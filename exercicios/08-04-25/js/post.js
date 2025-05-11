import { fetchFilmes, getFilme } from "./fetch.js";

document.addEventListener("DOMContentLoaded", async () => {
    const filmes = await fetchFilmes();
    displayPosts(filmes);
    setupModal();
});



function displayPosts(filmes) {
    const postsContainer = document.getElementById("posts");
    filmes.forEach((filme) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <img src="${filme.image}" alt="${filme.title}">
            <h3>${filme.title}</h3>
            <p>${filme.description}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

function setupModal() {
    const modal = document.getElementById("add-post-modal");
    const openModalButton = document.getElementById("open-modal-btn");
    const closeModal = document.getElementById("close-modal");
    const addPostForm = document.getElementById("add-post-form");

    openModalButton.addEventListener("click", () => {
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


        const newPost = {
            title: document.getElementById("post-title").value,
            description: document.getElementById("post-description").value,
            image: document.getElementById("post-image").value,

        };

        try {
            await getFilme(newPost);
            const filmes = await fetchFilmes();
            displayPosts(filmes);
            modal.style.display = "none";
            addPostForm.reset();
        } catch (error) {
            console.error("Erro ao criar o filme:", error);
        }
    });
}