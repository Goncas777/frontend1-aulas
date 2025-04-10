document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); 
  
      const breed = document.getElementById("breed").value.trim().toLowerCase();
  
      if (breed) {
        try {
          await getDOG(breed);
        } catch (err) {
          alert("Erro ao buscar imagem! Verifica o nome da raça.");
          console.error(err);
        }
      }
    });
  });
  
  async function getDOG(breed) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
  
    if (data.status === "success") {
      document.getElementById("img").src = data.message;
    } else {
      throw new Error("Raça não encontrada");
    }
  }
  