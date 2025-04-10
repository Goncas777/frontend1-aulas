const apiURL = "https://67f56876913986b16fa4784c.mockapi.io/api/";

export const fetchMovies = async () => {
  try {
    const response = await fetch(apiURL + "project");

    if (!response.ok) {
      throw new Error("Falha ao buscar os dados");
    }

    const data = await response.json();

    console.log("Resposta da API:", data);

    const filmesPopulares = data.find(
      (item) => item.category === "Filmes-Populares"
    )?.movies || [];

    const filmesNovos = data.find(
      (item) => item.category === "Novos-Lancamentos"
    )?.movies || [];

    return { filmesPopulares, filmesNovos };
  } catch (error) {
    console.error("Erro ao buscar os filmes:", error);
    return { filmesPopulares: [], filmesNovos: [] };
  }
};




export const getFilme = async (id) => {
    const response = await fetch(apiURL + "project/" + id);
    const data = await response.json();
    return data;
  };
  
  export const createPost = async (newMovie) => {
    try {
      // Faz a requisição para obter os dados do projeto
      const response = await fetch(apiURL + "project");
      const data = await response.json();
  
      // Encontra a categoria de 'Novos-Lancamentos'
      const categoriaNovos = data.find(item => item.category === "Novos-Lancamentos");
  
      if (!categoriaNovos) {
        throw new Error("Categoria 'Novos-Lancamentos' não encontrada.");
      }
  
      // Adiciona o novo filme à lista de filmes dessa categoria
      const updatedMovies = [...categoriaNovos.movies, newMovie];
  
      // Atualiza a categoria de 'Novos-Lancamentos' com o novo filme
      const updateResponse = await fetch(`${apiURL}project/${categoriaNovos.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...categoriaNovos,
          movies: updatedMovies, // Atualiza os filmes
        }),
      });
  
      // Retorna os dados atualizados
      const updatedData = await updateResponse.json();
      return updatedData;
  
    } catch (error) {
      console.error("Erro ao criar novo post:", error);
      throw error;
    }
  };
  
  
  
  export const updatePost = async (id, post) => {
    const response = await fetch(apiURL + "project/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    return data;
  };
  
  export const deletePost = async (id) => {
    const response = await fetch(apiURL + "project/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

