document.addEventListener("DOMContentLoaded", function () {
  const addPostForm = document.getElementById("form");

  addPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = addPostForm.nome.value;
    const nota = addPostForm.nota.value;

    const post = {
      nome,
      nota,
    };

    const profile = localStorage.getItem("profile");
    let profileData = JSON.parse(profile);
    if (!profileData) {
      profileData = [];
    }

    profileData.push(post);
    localStorage.setItem("profile", JSON.stringify(profileData));

    mostrarAlunos();
  });
});

function mostrarAlunos() {
  const alunos = JSON.parse(localStorage.getItem("profile")) || [];
  const lista = document.getElementById("lista-alunos");
  lista.innerHTML = '';

  alunos.forEach((aluno) => {
    console.log(aluno.nome, aluno.nota);
  });
}
