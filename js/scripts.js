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

// async function getUserInfo() {
//     try {
//         const hasInfo = localStorage.getItem("userInfo");
//         if (hasInfo) {
//           updateNameContent(JSON.parse(hasInfo));
//           return null;
//         }
//         const response = await fetch("users.json");
//         const data = await response.json();
//         localStorage.setItem("userInfo", JSON.stringify(data));
//       } catch (error) {

//       }
// }

// function updateNameContent(info) {
//     const profilename = document.getElementById("profile_name");
//     profilename.textContent = info.name;
//   }
  
// getUserInfo();



function updateProfileName() {
    const profileLink = document.getElementById("profile_name");
    const savedName = localStorage.getItem("userName");

    if (savedName) {
        profileLink.textContent = "Descobre o teu proximo filme " + savedName;
        console 
    }
}

function saveUserName(event) {
    event.preventDefault();
    const userName = document.getElementById("user_name").value;

    localStorage.setItem("userName", userName);

    updateProfileName();

    document.getElementById("user_name").value = "";
}


const nameForm = document.getElementById("name-form");
nameForm.addEventListener("submit", saveUserName);

updateProfileName();


function toggleTheme() {
    const body = document.body;
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const nav = document.querySelector("nav");
    const socialLinks = document.querySelector(".social-links");

    body.classList.toggle("whitemode");
    header.classList.toggle("whitemode");
    footer.classList.toggle("whitemode");
    nav.classList.toggle("whitemode");
    socialLinks.classList.toggle("whitemode");

    
    if (body.classList.contains("whitemode")) {
        localStorage.setItem("theme", "whitemode");
    } else {
        localStorage.setItem("theme", "darkmode");
    }
}

function checkThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const nav = document.querySelector("nav");
    const socialLinks = document.querySelector(".social-links");

    if (savedTheme === "whitemode") {
        body.classList.add("whitemode");
        header.classList.add("whitemode");
        footer.classList.add("whitemode");
        nav.classList.add("whitemode");
        socialLinks.classList.add("whitemode");
    } else {
        body.classList.add("darkmode");
        header.classList.add("darkmode");
        footer.classList.add("darkmode");
        nav.classList.add("darkmode");
        socialLinks.classList.add("darkmode");
    }
}


const themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", toggleTheme);

checkThemePreference();
  
  
