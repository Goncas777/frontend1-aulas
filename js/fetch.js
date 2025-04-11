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
    const response = await fetch(apiURL + "project");
    const data = await response.json();

    const categoriaNovos = data.find((item) => item.category === "Novos-Lancamentos");

    if (!categoriaNovos) {
      throw new Error("Categoria 'Novos-Lancamentos' não encontrada.");
    }

    const updatedMovies = [...categoriaNovos.movies, newMovie];

    const updateResponse = await fetch(`${apiURL}project/${categoriaNovos.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...categoriaNovos,
        movies: updatedMovies,
      }),
    });

    const updatedData = await updateResponse.json();
    return updatedData;
  } catch (error) {
    console.error("Erro ao criar novo post:", error);
    throw error;
  }
};

export const updatePost = async (id, updatedMovie) => {
  try {
    const response = await fetch(apiURL + "project");
    const data = await response.json();

    const categoriaNovos = data.find((item) => item.category === "Novos-Lancamentos");

    if (!categoriaNovos) {
      throw new Error("Categoria 'Novos-Lancamentos' não encontrada.");
    }

    // Encontrar o filme pelo ID
    const updatedMovies = categoriaNovos.movies.map((movie) =>
      movie.id === id ? { ...movie, ...updatedMovie } : movie
    );

    const updateResponse = await fetch(`${apiURL}project/${categoriaNovos.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...categoriaNovos,
        movies: updatedMovies,
      }),
    });

    const updatedData = await updateResponse.json();
    return updatedData;
  } catch (error) {
    console.error("Erro ao atualizar o post:", error);
    throw error;
  }
};

export const deletePost = async (title) => {
  try {
    const response = await fetch(apiURL + "project");
    const data = await response.json();

    const categoriaNovos = data.find((item) => item.category === "Novos-Lancamentos");

    if (!categoriaNovos) {
      throw new Error("Categoria 'Novos-Lancamentos' não encontrada.");
    }

    // Remove o filme pelo título
    const updatedMovies = categoriaNovos.movies.filter((movie) => movie.title !== title);

    const updateResponse = await fetch(`${apiURL}project/${categoriaNovos.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...categoriaNovos,
        movies: updatedMovies,
      }),
    });

    const updatedData = await updateResponse.json();
    return updatedData;
  } catch (error) {
    console.error("Erro ao excluir o post:", error);
    throw error;
  }
};
