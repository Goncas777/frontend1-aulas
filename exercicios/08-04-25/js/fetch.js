const apiURL = "https://67f56876913986b16fa4784c.mockapi.io/api/";

export const fetchFilmes = async () => {
    const response = await fetch(apiURL + "movies");
    const filmes = await response.json();
    return filmes;
}


export const getFilme = async (id) => {
    const response = await fetch(apiURL + "movies/" + id);
    const data = await response.json();
    return data;
  };
  
  export const createPost = async (post) => {
    const response = await fetch(apiURL + "movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    return data;
  };
  
  export const updatePost = async (id, post) => {
    const response = await fetch(apiURL + "movies/" + id, {
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
    const response = await fetch(apiURL + "movies/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };