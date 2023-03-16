mostrarCds();

async function mostrarCds(){
    let resposta = await fetch('https://localhost:7107/cd/dados');
    let respostaConvertida = await resposta.json();

    respostaConvertida.forEach(e => {
        //COLOCAR A DATA NA ORDEM CERTA (DIA/MÊS/ANO) ATUALMENTE ESTÁ (ANO/MÊS/DIA).
        let data_criacao_limpa = e.data_criacao.split('T').shift(-1);
        let data_criacao = data_criacao_limpa.split('-').reverse().toString().replace(',', '/').replace(',', '/');

        //E DEPOIS SUBIR O PROJETO PARA O GITHUB COM O FRONTEND E O BACKEND NA MESMA PASTA
        let tableCds = document.querySelector('.tableCds');
        tableCds.innerHTML += `
            <tr>
                <td><input type="radio" name="checked" class="radio_cd"></td>
                <td class="idBtn">${e.cd_id}</td>
                <td>${e.nome}</td>
                <td>${e.autor}</td>
                <td>${data_criacao}</td>
            </tr>`;
    });

    document.querySelectorAll('.idBtn').forEach(async e => {
        e.addEventListener('click', async () => {
            let respostaMusicas = await fetch(`https://localhost:7107/musica/musicas?id=${e.innerHTML}`);
            let respostaMusicasConvertida = await respostaMusicas.json();
            
            respostaMusicasConvertida.forEach(e => {
                let tableMusicas = document.querySelector('.tableMusicas');
                tableMusicas.innerHTML += `
                <tr>
                <td><input type="radio" name="radio_musica" class="radio_musica" /></td>
                <td>${e.musica_id}</td>
                <td>${e.nome_musica}</td>
                <td>${e.tempo_segundos}</td>
                </tr>
                `;
            });
            document.querySelector('.cdEscolhido').innerHTML = e.parentNode.childNodes[5].innerHTML;
            idMusica = e.parentNode.childNodes[3].innerHTML;
            document.querySelector('.ver_musicas').style.display = 'block';
        });
    });
}

//Deletar cds (DELETE)
let btnExcluirCd = document.querySelector('.btnExcluirCd');
let btnConfirmaExcluirCd = document.querySelector('.confirmaDeletarCD');
let btnNaoDeletarCd = document.querySelector('.naoDeletarCD');
let btnEditarCd = document.querySelector('.btnEditarCd');
var idCd;

btnExcluirCd.addEventListener('click', ()=>{
    if(!pegaIdSelecionado()){
        return document.querySelector('.msg').innerHTML = 'Selecione algum CD para fazer a exclusão.'
    }

    document.querySelector('.confirm_deletar_cd').style.display = 'block';
});

btnConfirmaExcluirCd.addEventListener('click', confirmaDeletarCd);
btnNaoDeletarCd.addEventListener('click', naoDeletaCd);

function pegaIdSelecionado(){
    let radios = document.querySelectorAll('.radio_cd');
    var idCd;
    
    for(let radio of radios){
        if(radio.checked){
            idCd = radio.parentNode.parentNode.childNodes[3].innerHTML;
            break;
        }
    }

    return idCd;
}

function deletarCd(idCd){

    try{
            let request = new XMLHttpRequest();
            request.open('DELETE', `https://localhost:7107/cd/excluir?id=${idCd}`, true);

            request.setRequestHeader('Content-type', 'application/json');
            request.send();

            location.reload();
    }catch(error){
        console.log('Não foi possível deletar o CD.');
    }
};

function confirmaDeletarCd(){
    console.log(pegaIdSelecionado());
    deletarCd(pegaIdSelecionado());
}

function naoDeletaCd(){
    document.querySelector('.confirm_deletar_cd').style.display = 'none';
}

//Editar cds (PUT)
btnEditarCd.addEventListener('click', ()=>{
    let radios = document.querySelectorAll('.radio_cd');
    var idCd;
    var radioChecked;
    
    for(let radio of radios){
        if(radio.checked){
            radioChecked = radio.parentNode.parentNode.childNodes;
            idCd = radio.parentNode.parentNode.childNodes[3].innerHTML;
            break;
        }
    }

    if(!idCd){
        return document.querySelector('.msg').innerHTML = 'Selecione algum CD para fazer a edição.'
    }

    document.querySelector('.editar_cd').style.display = 'block';
    document.querySelector('.nomeAtual').innerHTML = `<b>Nome atual:</b> ${radioChecked[5].innerHTML}.`;
    document.querySelector('.autorAtual').innerHTML = `<b>Autor atual:</b> ${radioChecked[7].innerHTML}.`;
    document.querySelector('.dataCriacaoAtual').innerHTML = `<b>Data criação atual:</b> ${radioChecked[9].innerHTML}.`;
    console.log('Saiu');
});

document.querySelector('.editarCd').addEventListener('click', ()=>{ //O ERRO QUE FOI ESCRITO NA PRIMEIRA LINHA DESSE ARQUIVO ESTÁ NESSA FUNCÃO.
    let nomeEditado = document.querySelector('#nomeEditado');
    let autorEditado = document.querySelector('#autorEditado');
    let dataCriacaoEditado = document.querySelector('#dataCriacaoEditada');

    if(!nomeEditado.value || !autorEditado.value || !dataCriacaoEditado.value){
        alert('Para editar o CD é preciso preencher todos os campos.');
    }else{
        editarCd();
    }
});

function editarCd(){
    try{
        idCd = pegaIdSelecionado();
        let formulario = document.querySelector('#formulario');
        let body = {
            "nome": formulario.nomeEditado.value,
            "autor": formulario.autorEditado.value,
            "data_criacao": formulario.dataCriacaoEditada.value
        }

        let request = new XMLHttpRequest();
        request.open('PUT', `https://localhost:7107/cd/editar?id=${idCd}`, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify(body));
        
        location.reload();
        alert('CD editado com sucesso!');
    }catch(error){
        console.log('Não foi possível editar o CD.')
    }
}

document.querySelector('.cancelarEdicao').addEventListener('click', ()=>{
    document.querySelector('.editar_cd').style.display = 'none';
});