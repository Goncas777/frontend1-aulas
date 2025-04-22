const apiURL = "https://67f56876913986b16fa4784c.mockapi.io/api/";

export const fetchMovies = async () => {
  try {
    const response = await fetch(apiURL + "project");
    if (!response.ok) throw new Error("Falha ao buscar os dados");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFilme = async (id) => {
  const response = await fetch(apiURL + "project/" + id);
  return await response.json();
};

export const createPost = async (newMovie) => {
  const response = await fetch(apiURL + "project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  });
  return await response.json();
};

export const updatePost = async (id, updatedMovie) => {
  try {
    const response = await fetch(apiURL + 'project');
    const data = await response.json();
  
    // Garantir que tanto o id do item quanto o id passado sejam strings
    const item = data.find(item => item.id === id); // Comparação direta entre números
 // Comparação entre strings
    
    if (!item) {
      throw new Error('Item não encontrado');
    }

    // Atualizar o item encontrado
    const updateResponse = await fetch(apiURL + 'project/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!updateResponse.ok) {
      throw new Error('Falha ao atualizar o post');
    }

    return await updateResponse.json();
  } catch (error) {
    console.error("Erro ao atualizar o post:", error);
    throw error;
  }
};




export const deletePost = async (id) => {
  const response = await fetch(apiURL + "project/" + id, {
    method: "DELETE",
  });
  return await response.json();
};
