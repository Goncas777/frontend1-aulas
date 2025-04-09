const apiURL = "https://67f56876913986b16fa4784c.mockapi.io/api/";



export const fetchMovies = async () => {
  try {
    const response = await fetch(apiURL + "project");

    if (!response.ok) {
      throw new Error('Falha ao buscar os dados');
    }

    const data = await response.json();

    // Adiciona o log para verificar a resposta
    console.log("Resposta da API:", data);

    // Filtra os filmes populares e novos lançamentos
    const filmesPopulares = data.find(category => category.category === "Filmes-Populares").movies;
    const filmesNovos = data.find(category => category.category === "Novos-Lancamentos").movies;

    return { filmesPopulares, filmesNovos };

  } catch (error) {
    console.error('Erro ao buscar os filmes:', error);
  }
};



export const getFilme = async (id) => {
    const response = await fetch(apiURL + "project/" + id);
    const data = await response.json();
    return data;
  };
  
  export const createPost = async (post) => {
    const response = await fetch(apiURL + "project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    return data;
  };