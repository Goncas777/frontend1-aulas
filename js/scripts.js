async function getMovieContent() {
    try {

        const response = await fetch("./json/data.json");
        const data = await response.json();

        let i = 1;
        for (const movieTitle in data["Filmes-Populares"]) {
            const movie = data["Filmes-Populares"][movieTitle];
            document.getElementById(`Link_Popular_${i}`).target = "_blank";
            document.getElementById(`Link_Popular_${i}`).href = movie.link;
            document.getElementById(`Image_Popular_${i}`).src = movie.image;
            document.getElementById(`Title_Popular_${i}`).textContent = movie.title;
            document.getElementById(`Genre_Popular_${i}`).textContent = movie.genre;
            document.getElementById(`Description_Popular_${i}`).textContent = movie.description;
            i++;
        }
        
        i = 1;
        for (const movieTitle in data["Novos-Lancamentos"]) {
            const movie = data["Novos-Lancamentos"][movieTitle];
            document.getElementById(`Link_New_${i}`).target = "_blank";
            document.getElementById(`Link_New_${i}`).href = movie.link;
            document.getElementById(`Image_New_${i}`).src = movie.image;
            document.getElementById(`Title_New_${i}`).textContent = movie.title;
            document.getElementById(`Genre_New_${i}`).textContent = movie.genre;
            document.getElementById(`Description_New_${i}`).textContent = movie.description;
            i++;
        }
        
    } catch (error) {
        console.log(error);
    }
}

getMovieContent();
