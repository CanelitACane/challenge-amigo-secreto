let nombreAmigos = [];
let nombresSorteados = [];

document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});

document.getElementById('nombreSorteo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sortearAmigo();
    }
});

function agregarAmigo() {
    let input = document.getElementById('amigo');
    let nombre = input.value.trim();

    if (nombre !== '') {
        let nombreFormateado = formatearNombre(nombre);
        
        if (!nombreAmigos.includes(nombreFormateado)) {
            nombreAmigos.push(nombreFormateado);
            actualizarLista();
            input.value = '';
        } else {
            alert('Este nombre ya está en la lista.');
        }
    } else {
        alert('Por favor, ingresa un nombre válido.');
    }
}

function actualizarLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    nombreAmigos.forEach(nombre => {
        let li = document.createElement('li');
        li.textContent = nombre;
        lista.appendChild(li);
    });

    document.getElementById('totalParticipantes').textContent = `Total de participantes: ${nombreAmigos.length}`;
}

function mostrarCajaSortear() {
    if (nombreAmigos.length < 2) {
        alert('Debe haber al menos dos participantes para sortear.');
        return;
    }
    document.getElementById('sortearAmigoContainer').classList.remove('hidden');
}

function sortearAmigo() {
    let nombreSorteo = document.getElementById('nombreSorteo').value.trim();
    let nombreFormateado = formatearNombre(nombreSorteo);

    if (!nombreSorteo || !nombreAmigos.includes(nombreFormateado)) {
        alert('Ingresa un nombre válido que esté en la lista.');
        return;
    }

    let disponibles = nombreAmigos.filter(nombre => nombre !== nombreFormateado && !nombresSorteados.includes(nombre));

    if (disponibles.length === 0) {
        alert('Todos los amigos han sido sorteados.');
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * disponibles.length);
    let amigoSorteado = disponibles[indiceAleatorio];

    nombresSorteados.push(amigoSorteado);
    document.getElementById('nombreSorteo').value = ''; // Limpia el campo de sorteo

    mostrarResultado(amigoSorteado);
    actualizarEstadoSorteo();
}

function actualizarEstadoSorteo() {
    let faltan = nombreAmigos.length - nombresSorteados.length;
    let mensaje = faltan > 0 ? `Faltan por sortear: ${faltan} amigos.` : '🎉 ¡Todos los amigos han sido sorteados! 🎉';

    let faltanSortearElemento = document.getElementById('faltanSortear');
    faltanSortearElemento.textContent = mensaje;
    faltanSortearElemento.classList.remove('hidden');
}

function mostrarResultado(nombre) {
    let resultadoContainer = document.getElementById('resultado');
    let mensajeSorpresa = document.getElementById('mensajeSorpresa');
    let nombreSorteado = document.getElementById('nombreSorteado');

    resultadoContainer.classList.remove('hidden'); // Muestra el contenedor del resultado
    mensajeSorpresa.textContent = "🎭 Tu amigo secreto es...";
    mensajeSorpresa.classList.remove('hidden');
    nombreSorteado.classList.add('hidden');

    setTimeout(() => {
        nombreSorteado.textContent = `🎊 ${nombre} 🎊`;
        nombreSorteado.classList.remove('hidden');
        nombreSorteado.style.animation = "fadeIn 1s ease-in-out";
    }, 2000);
}

function formatearNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}
