// HABILITAR OS BOTÕES NOVA MÚSICA E EDITAR MÚSICA (NOVA MÚSICA JÁ FOI INICIADO MAS QUANDO FAÇO A REQUISIÇÃO A PÁGINA CARREGA MAS OS DADOS NÃO SÃO ADICIONADOS NA API - MESMO ERRO DO EDITAR CD) //

let fechar_ver_musicas = document.querySelector('.fechar_ver_musicas');
let idMusica;

fechar_ver_musicas.addEventListener('click', () => {
    document.querySelector('.ver_musicas').style.display = 'none';
    document.querySelector('.tableMusicas').innerHTML = '';
});

let fechar_nova_musica = document.querySelector('.fechar_nova_musica');

fechar_nova_musica.addEventListener('click', () => {
    document.querySelector('.novaMusicaContainer').style.display = 'none';
});

document.querySelector('click', () => {
    document.querySelector('.novaMusicaContainer').style.dislay = 'none';
});

let novaMusicaBtn = document.querySelector('.novaMusicaBtn');
    
novaMusicaBtn.addEventListener('click', () => {
    document.querySelector('.novaMusicaContainer').style.display = 'block';
});

let criarMusicaBtn = document.querySelector('.criarMusicaBtn');

criarMusicaBtn.addEventListener('click', () => { //O ERRO QUE FOI ESCRITO NA PRIMEIRA LINHA DESSE ARQUIVO ESTÁ NESSA FUNCÃO.
    let formulario_nova_musica = document.querySelector('#formulario_nova_musica');
    let input_musica = document.querySelector('#nome_musica').value;
    let formulario_musicas_existentes = document.querySelector('.tableMusicas');
    let musicas_existente = formulario_musicas_existentes.childNodes;
    let contador = 0;

    let musicaExistente = false;

    musicas_existente.forEach(e => {
        if(contador % 2 == 1){

            e.childNodes[5].innerHTML == input_musica ? musicaExistente = true : musicaExistente = musicaExistente;

        }
        contador++;
    });

    if(formulario_nova_musica.nome_musica.value == "" || formulario_nova_musica.tempo_musica.value == ""){
        return document.querySelector('.msgNovaMusica').innerHTML = 'Preencha todos os campos para criar uma música.';
    }

    if(musicaExistente){
        return document.querySelector('.msgNovaMusica').innerHTML = 'Essa música já foi adicionada a sua playlist, tente adicionar outra.';
    }

    let body = {
        "cd_id": idMusica,
        "nome_musica": formulario_nova_musica.nome_musica.value,
        "tempo_segundos": formulario_nova_musica.tempo_musica.value
    }
    
    let request = new XMLHttpRequest();
    request.open('POST', 'https://localhost:7107/musica/inserir', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(body));

    location.reload();
    alert('Música criada com sucesso!');
});

function pegaIdMusicaSelecionada(){
    let radios_musica = document.querySelectorAll('.radio_musica');
    var idMusica;
    
    for(let radio of radios_musica){
        if(radio.checked){
            idMusica = radio.parentNode.parentNode.childNodes[3].innerHTML;
            break;
        }
    }

    return idMusica;
}

// EDITAR MÚSICA
document.querySelector('.fechar_container').addEventListener('click', () => {
    document.querySelector('.editarMusicaContainer').style.display = 'none';
});

let editarMusicaBtn = document.querySelector('.editarMusicaBtn');

editarMusicaBtn.addEventListener('click', () => {
    if(!pegaIdMusicaSelecionada()){
        return document.querySelector('.msgMusica').innerHTML = 'Selecione alguma música para fazer a edição.';
    }

    let radios_musica = document.querySelectorAll('.radio_musica');
    let inputSelecionado;
    
    for(let radio of radios_musica){
        if(radio.checked){
            inputSelecionado = radio.parentNode.parentNode.childNodes;
            break;
        }
    }

    document.querySelector('.nome_atual_musica').innerHTML = `<b>Nome atual: </b>${inputSelecionado[5].innerHTML}.`;
    document.querySelector('.tempo_atual_musica').innerHTML = `<b>Tempo atual: </b>${inputSelecionado[7].innerHTML}s.`;
    document.querySelector('.editarMusicaContainer').style.display = 'block';
});

let editarMusicaBtnPut = document.querySelector('.editarMusicaBtnPut');

editarMusicaBtnPut.addEventListener('click', () => {
    let formulario_editar_musica = document.querySelector('#formulario_editar_musica');

    let nomeFormulario = formulario_editar_musica.nome_musica_editar.value;
    let tempoSegundos = formulario_editar_musica.tempo_segundos_editar.value;

    if(!nomeFormulario || !tempoSegundos){
        return console.log('Prencha todos os campos para editar a música.');
    };

    let body = {
        "cd_id": pegaIdMusicaSelecionada(),
        "nome_musica": nomeFormulario,
        "tempo_segundos": tempoSegundos
      }

    let request = new XMLHttpRequest();
    request.open('PUT', `https://localhost:7107/musica/editar?id=${pegaIdMusicaSelecionada()}`, true);

    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(body));

    location.reload();
    alert('Música editada com sucesso!');
});

document.querySelector('.cancelarEdicaoBtn').addEventListener('click', () => {
    document.querySelector('.editarMusicaContainer').style.display = 'none';
});




let excluirMusicaBtn = document.querySelector('.excluirMusicaBtn');

excluirMusicaBtn.addEventListener('click', (e) => {
    if(!pegaIdMusicaSelecionada()){
        return document.querySelector('.msgMusica').innerHTML = 'Selecione alguma música para fazer a exclusão.';
    }
    document.querySelector('.confirma_deletar_musica').style.display = 'block';
});

let confirma_deletar_musica_btn = document.querySelector('.confirma_deletar_musica_btn');

confirma_deletar_musica_btn.addEventListener('click', () => {
    let request = new XMLHttpRequest();
    request.open('DELETE', `https://localhost:7107/musica/excluir?id=${pegaIdMusicaSelecionada()}`, true);
    
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    location.reload();
    alert('Música deletada com sucesso!');
});

document.querySelector('.fechar_confirma_musica').addEventListener('click', fecharConfirmaMusica);
document.querySelector('.fecha_deletar_musica_btn').addEventListener('click', fecharConfirmaMusica);

function fecharConfirmaMusica(){
    document.querySelector('.confirma_deletar_musica').style.display = 'none';
}