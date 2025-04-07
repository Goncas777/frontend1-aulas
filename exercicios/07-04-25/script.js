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
      const profileData = JSON.parse(profile);
      profileData.user.posts.push(post);
      localStorage.setItem("profile", JSON.stringify(profileData));
    });
  });

  function mostrarAlunos() {
    const alunos = JSON.parse(localStorage.getItem('profile')) || [];
    const lista = document.getElementById('lista-alunos');
    lista.innerHTML = '';

    alunos.forEach(aluno => {
        const item = document.createElement('li');
        item.textContent = `${aluno.nome} - Nota: ${aluno.nota}`;
        lista.appendChild(item);
    });
}

mostrarAlunos();