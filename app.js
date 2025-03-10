let nombreAmigos = [];
let asignaciones = {}; // Guarda las parejas del sorteo
let nombresSorteados = new Set(); // Guarda quién ya consultó su amigo secreto

document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});

document.getElementById('nombreSorteo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
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

    realizarSorteo(); // Generamos las asignaciones antes del sorteo
    document.getElementById('sortearAmigoContainer').classList.remove('hidden');
    document.getElementById('nombreIngresoContainer').classList.add('hidden');
}

// 🔹 **Genera las asignaciones sin repetir ni asignar a sí mismo**
function realizarSorteo() {
    let listaMezclada = [...nombreAmigos];

    // Mezclar aleatoriamente la lista usando el algoritmo de Fisher-Yates
    for (let i = listaMezclada.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [listaMezclada[i], listaMezclada[j]] = [listaMezclada[j], listaMezclada[i]];
    }

    // Asignar amigos secretos asegurando que no se asignen a sí mismos
    asignaciones = {};
    for (let i = 0; i < listaMezclada.length; i++) {
        let asignado = listaMezclada[(i + 1) % listaMezclada.length]; // Ciclo cerrado
        asignaciones[listaMezclada[i]] = asignado;
    }

    console.log("Asignaciones generadas:", asignaciones);
}

function sortearAmigo() {
    let nombreSorteo = document.getElementById('nombreSorteo').value.trim();
    let nombreFormateado = formatearNombre(nombreSorteo);

    if (!nombreSorteo || !nombreAmigos.includes(nombreFormateado)) {
        alert('Ingresa un nombre válido que esté en la lista.');
        return;
    }

    if (nombresSorteados.has(nombreFormateado)) {
        alert('Ya sorteaste tu amigo secreto.');
        return;
    }

    let amigoAsignado = asignaciones[nombreFormateado];

    nombresSorteados.add(nombreFormateado);
    document.getElementById('nombreSorteo').value = '';

    mostrarResultado(amigoAsignado);
    actualizarEstadoSorteo();
    actualizarListaSorteados(nombreFormateado);
}

function actualizarListaSorteados(nombre) {
    let lista = document.getElementById('sorteadosLista');
    let li = document.createElement('li');
    li.textContent = `${nombre} ya sorteó.`;
    lista.appendChild(li);
}

function actualizarEstadoSorteo() {
    let faltan = nombreAmigos.length - nombresSorteados.size;
    let mensaje = faltan > 0 ? `Faltan por sortear: ${faltan} amigos.` : '🎉 ¡Todos los amigos han sido sorteados! 🎉';

    let faltanSortearElemento = document.getElementById('faltanSortear');
    faltanSortearElemento.textContent = mensaje;
    faltanSortearElemento.classList.remove('hidden');

    if (faltan === 0) {
        document.getElementById('reiniciarJuego').classList.remove('hidden');
    }
}

function mostrarResultado(nombre) {
    let resultadoContainer = document.getElementById('resultado');
    let mensajeSorpresa = document.getElementById('mensajeSorpresa');
    let nombreSorteado = document.getElementById('nombreSorteado');

    resultadoContainer.classList.remove('hidden');
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

function reiniciarJuego() {
    nombreAmigos = [];
    nombresSorteados.clear();
    asignaciones = {};

    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('sorteadosLista').innerHTML = '';
    document.getElementById('totalParticipantes').textContent = "Total de participantes: 0";
    document.getElementById('nombreSorteo').value = '';

    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('nombreSorteado').classList.add('hidden');
    document.getElementById('mensajeSorpresa').classList.add('hidden');
    document.getElementById('reiniciarJuego').classList.add('hidden');
    document.getElementById('faltanSortear').classList.add('hidden');

    document.getElementById('sortearAmigoContainer').classList.add('hidden');
    document.getElementById('nombreIngresoContainer').classList.remove('hidden');

    alert("🎉 ¡El juego ha sido reiniciado! 🎉");
}

