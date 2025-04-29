const enviar = document.querySelector('#enviar')
enviar.addEventListener('click', async function (event) {
  event.preventDefault()

  const pergunta = document.querySelector('#pergunta').value
  const alternativasInputs = document.querySelectorAll('.alternativa')
  const corretaSelecionada = document.querySelector('input[name="correta"]:checked')

  // Verificação básica
  if (pergunta === "" || !corretaSelecionada || Array.from(alternativasInputs).some(input => input.value === "")) {
    alert("Por favor, preencha todos os campos e selecione a alternativa correta.")
    return
  }

  const alternativas = Array.from(alternativasInputs).map(input => input.value)
  const correta = parseInt(corretaSelecionada.value)

  const resposta = await fetch(`http://192.168.1.50:3000/questao/nova`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pergunta: pergunta,
      alternativas: alternativas,
      correta: correta
    })
  })

  if (resposta.status === 201) {
    const dados = await resposta.json()
    alert('Questão cadastrada com sucesso!')
  } else {
    alert('Erro ao cadastrar a questão.')
  }
})

const btnModoEscuro = document.querySelector('#light');

btnModoEscuro.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
