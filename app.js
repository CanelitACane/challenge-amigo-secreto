// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Crear una lista vacía para almacenar los nombres
let nombreAmigos = [];

// Array temporal para almacenar los nombres ya sorteados
let nombresSorteados = [];

// Función para capturar el nombre ingresado por el usuario y agregarlo a la lista
function agregarAmigo() {
    // Obtener el valor del campo de entrada de nombre
    let nombreParticipante = document.getElementById('amigo').value;
    
    // Verificar que el campo no esté vacío
    if (nombreParticipante.trim() !== '') {
        // Agregar el nombre a la lista
        nombreAmigos.push(nombreParticipante);

        // Limpiar el campo de entrada
        document.getElementById('amigo').value = '';

      // Mostrar la lista actualizada
      mostrarAmigos();
    } else {
        alert('Por favor, ingresa un nombre.');
    }
   
}

//Función para agregar amigos a la lista HTML
function mostrarAmigos() {
     //Obtener el elemento de la lista
     let lista = document.getElementById('listaAmigos');

     //Limpiar la lista existente
     lista.innerHTML = '';

     //Iterar sobre el arreglo de amigos
     for (let i = 0 ; i < nombreAmigos.length; i++) {
        //Crtear un nuevo elemento <li>
        let li = document.createElement('li');
        //Agregar el nombre del amigo al <li>
        li.textContent = nombreAmigos[i];
        //Agregar el <li> a la lista
        lista.appendChild(li);
     }
  }

// Función para sortear un amigo secreto
function sortearAmigo() {
    // Validar que haya amigos disponibles
    if (nombreAmigos.length === 0) {
        alert('No hay amigos disponibles para sortear.');
        return;
    }

     // Validar que queden amigos por sortear
     if (nombresSorteados.length === nombreAmigos.length) {
        alert('Todos los amigos han sido sorteados. Reiniciando el juego...');
        reiniciarJuego();
        return;
    }

    // Generar un índice aleatorio y asegurarse de que el nombre no haya sido sorteado antes
    let indiceAleatorio;
    let amigoSorteado;
    do {
    indiceAleatorio = Math.floor(Math.random() * nombreAmigos.length);
    // Obtener el nombre sorteado
    amigoSorteado = nombreAmigos[indiceAleatorio];
    } while (nombresSorteados.includes(amigoSorteado));
    
    //Agregar el nombre sorteado al array temporal
    nombresSorteados.push(amigoSorteado);

    // Mostrar el resultado
    let resultadoElemento = document.getElementById('resultado');
    resultadoElemento.innerHTML = `El amigo secreto es: ${amigoSorteado}`;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Vaciar el array temporal de nombres sorteados
    nombresSorteados = [];

    // Limpiar el resultado
    let resultadoElemento = document.getElementById('resultado');
    resultadoElemento.innerHTML = '';

    // Reiniciar la lista de amigos
    nombreAmigos = [];

    // Limpiar la lista de amigos en la página
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
}

// Añadir un event listener al campo de entrada de nombre para capturar la tecla Enter
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});
// Llamar a la función mostrarAmigos al cargar la página
window.onload = mostrarAmigos;

