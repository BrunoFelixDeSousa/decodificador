// "a" -> "ai"
// "e" -> "enter"
// "i" -> "imes"
// "o" -> "ober"
// "u" -> "ufat"

const conversor = new Map();
conversor.set("a", "ai");
conversor.set("e", "enter");
conversor.set("i", "imes");
conversor.set("o", "ober");
conversor.set("u", "ufat");

function copiarTexto() {
  let botaoCopiar = document.getElementById("botao3");
  let texto = document.getElementById("textoInput");
  console.log(botaoCopiar);
  console.log(texto);

  if (texto.value === "") {
    alert(`Digite o texto`);
  }

  texto.select();
  texto.setSelectionRange(0, 99999);

  //api que substituiu o document.execCommand
  navigator.clipboard
    .writeText(texto.value)
    .then(function () {
      // alert(`Texto copiado ${texto.value}`);
    })
    .catch(function (error) {
      console.log("Erro ao copiar");
    });
}

// a -> ai
function criptografador(texto, conversor) {
  let textoCriptografado = "";

  for (let i = 0; i < texto.length; i++) {
    if (conversor.get(texto[i]) === undefined) {
      textoCriptografado = textoCriptografado.concat(texto[i]);
    } else {
      textoCriptografado = textoCriptografado.concat(conversor.get(texto[i]));
    }
  }

  return textoCriptografado;
}

// ai -> a

let descriptografia = function (textoCriptografado) {
  //pega a referência da função criptografador
  const inversoConversor = new Map();
  for (let [chave, valor] of conversor.entries()) {
    inversoConversor.set(valor, chave);
  }

  let conversorInverso = textoCriptografado;

  for (let [chave, valor] of inversoConversor.entries()) {
    const regex = new RegExp(chave, "g");
    conversorInverso = conversorInverso.replace(regex, valor);
  }

  return conversorInverso;
};

let mostrarNaTela = function (area, botao) {
  let texto = document.getElementById(area);

  function validarTexto(texto) {
    return /^[a-z ]+$/.test(texto);
  }

  console.log(validarTexto(texto.value));
  let resultado = document.getElementById("textoInput");

  //testes para verificar os botões selecionados
  console.log(botao);
  console.log(resultado.value);

  //isso porque a função descriptografia() precisa do textoCriptografado
  let criptografar = criptografador(texto.value, conversor);

  if (validarTexto(texto.value) === true && botao === "botao1") {
    resultado.innerHTML = criptografar;
    console.log(criptografar);
  } else if (validarTexto(texto.value) === true && botao === "botao2") {
    resultado.innerHTML = descriptografia(texto.value);
    console.log(descriptografia(texto.value, conversor));
  } else {
    alert(
      `ERRO`
    );
  }
  texto.value = "";
};
