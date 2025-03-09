let nombreAmigos = [];
let nombresSorteados = [];

document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});

document.getElementById('nombreSorteo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Soluciona el problema de tabulación
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
    document.getElementById('nombreIngresoContainer').classList.add('hidden'); // Oculta la caja de ingreso
}

function sortearAmigo() {
    let nombreSorteo = document.getElementById('nombreSorteo').value.trim();
    let nombreFormateado = formatearNombre(nombreSorteo);  // Asegurarse de que el nombre ingresado esté correctamente formateado

    if (!nombreSorteo || !nombreAmigos.includes(nombreFormateado)) {
        alert('Ingresa un nombre válido que esté en la lista.');
        return;
    }

    // Verificar si todos los participantes han sido sorteados
    if (nombresSorteados.length === nombreAmigos.length) {
        alert('🎉 Todos los amigos ya han sido sorteados. No puedes seguir sorteando.');
        return;
    }

    let asignaciones = {}; 
    let disponibles = [...nombreAmigos];  // Lista de nombres disponibles para asignar

    // Evitar asignar a los jugadores ya sorteados y a sí mismos
    for (let nombre of nombreAmigos) {
        // Filtrar las opciones disponibles para el sorteo
        let opciones = disponibles.filter(n => n !== nombre && !Object.values(asignaciones).includes(n));

        // Si no hay opciones disponibles, significa que algo salió mal
        if (opciones.length === 0) {
            alert('Error en el sorteo. Intenta de nuevo.');
            return;
        }

        // Elegir aleatoriamente entre las opciones disponibles
        let indiceAleatorio = Math.floor(Math.random() * opciones.length);
        let amigoSorteado = opciones[indiceAleatorio];

        // Asignar el amigo sorteado
        asignaciones[nombre] = amigoSorteado;
        disponibles = disponibles.filter(n => n !== amigoSorteado);  // Eliminar el amigo sorteado de la lista de opciones
    }

    // Verificar que todo el proceso fue exitoso
    if (Object.keys(asignaciones).length === nombreAmigos.length) {
        let amigoAsignado = asignaciones[nombreFormateado];  // Obtener el amigo asignado al jugador que hizo el sorteo
        nombresSorteados.push(amigoAsignado);  // Agregar al historial de sorteados
        document.getElementById('nombreSorteo').value = '';  // Limpiar el campo de texto

        // Mostrar el resultado en pantalla
        mostrarResultado(amigoAsignado);
        console.log('Nombres sorteados hasta ahora:', nombresSorteados);  // Ver en consola los nombres sorteados
        actualizarEstadoSorteo();  // Actualizar el estado del sorteo
    } else {
        alert('Hubo un error en el sorteo. Por favor, intenta de nuevo.');
    }
}

function actualizarEstadoSorteo() {
    let faltan = nombreAmigos.length - nombresSorteados.length;
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
    nombresSorteados = [];

    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('totalParticipantes').textContent = "Total de participantes: 0";
    document.getElementById('nombreSorteo').value = '';
    
    document.getElementById('resultado').classList.add('hidden');
    document.getElementById('nombreSorteado').classList.add('hidden');
    document.getElementById('mensajeSorpresa').classList.add('hidden');
    document.getElementById('reiniciarJuego').classList.add('hidden');
    document.getElementById('faltanSortear').classList.add('hidden');

    document.getElementById('sortearAmigoContainer').classList.add('hidden');
    document.getElementById('nombreIngresoContainer').classList.remove('hidden'); // Vuelve a mostrar el ingreso de nombres

    alert("🎉 ¡El juego ha sido reiniciado! 🎉");
}
