import { criarUsuarios, listarUsuarios, editarUsuario, deletarUsuario } from './crud.js'

export function setupUI(){
  document.getElementById('btnCriar').addEventListener('click', () => {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!nome || !email){
      alert('Preencha todos os campos');
      return;
    }

    criarUsuarios(nome, email);
    renderLista();
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
  });
  renderLista();
}

export function renderLista() {
  const lista = document.getElementById('listaUsuarios');
  lista.innerHTML = '';

  listarUsuarios(usuarios => {
    if (usuarios.length === 0) {
      lista.innerText = 'Lista de usuários vazia';
      lista.style.display = 'flex';
      lista.style.justifyContent = 'center'
      return;
    }

    usuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${usuario.nome} (${usuario.email})
        <button onclick="editar(${usuario.id})" class="btnEditar">Editar</button>
        <button onclick="excluir(${usuario.id})" class="btnExcluir">Excluir</button>
      `;
      lista.appendChild(li);
    });
  });
}

window.editar = (id) => {
  const novoNome = prompt("Novo nome");
  const novoEmail = prompt("Novo email");

  if(novoNome && novoEmail){
    editarUsuario(id, novoNome, novoEmail);
    renderLista();
  }
}

window.excluir = (id) => {
  if(confirm("Tu tem certeza?")){
    deletarUsuario(id);
    renderLista();
  }
}