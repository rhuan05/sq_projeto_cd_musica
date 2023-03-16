let button = document.querySelector('button');

button.addEventListener('click', async (event) => {
    event.preventDefault();

    let input_nome = document.querySelector('#nome').value;

    let resposta = await fetch('https://localhost:7107/cd/dados');
    let cds_existentes = await resposta.json();
    let cd_existe = false;

    cds_existentes.forEach(e => {
        if(e.nome.toUpperCase() == input_nome.toUpperCase()){
            cd_existe = true;
        }
    });

    let formulario = document.querySelector('#formulario');

    let nomeInput = document.querySelector('#nome');
    let autorInput = document.querySelector('#autor');
    let dataCriacaoInput = document.querySelector('#dataCriacao');

    if(!nomeInput.value || !autorInput.value || !dataCriacaoInput.value){
        return document.querySelector('.msg').innerHTML = 'Preencha todos os campos.';
    }

    if(cd_existe){
        return document.querySelector('.msg').innerHTML = 'CD existente, tente criar outro.';
    }


    let body = {
        "nome": formulario.nome.value,
        "autor": formulario.autor.value,
        "data_criacao": formulario.dataCriacao.value
    }

    criarUsuario(body);
});

function criarUsuario(body){
    try{
        let request = new XMLHttpRequest();
        request.open('POST', 'https://localhost:7107/cd/inserir', true);

        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify(body));

        document.querySelector('.msg').innerHTML = 'CD cadastrado com sucesso!';
        document.querySelectorAll('input').forEach(e => {
            e.value = '';
        });
    }catch(error){
        console.log('Não foi possível criar o CD.');
        document.querySelector('.msg').innerHTML = 'Não foi possível cadastrar o CD.';
    }
};