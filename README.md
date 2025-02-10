# Proyecto del Juego del Amigo Secreto

## Descripción
Este proyecto es un juego del amigo secreto desarrollado en HTML, CSS y JavaScript. Permite a los usuarios ingresar nombres, sortearlos aleatoriamente y mostrar los resultados sin repetir nombres hasta que todos hayan sido seleccionados. Además, cuenta con una funcionalidad para reiniciar el juego una vez que todos los nombres han sido sorteados.

## Instalación
Para utilizar este proyecto, simplemente descarga los archivos y ábrelos en tu navegador web favorito. No se requiere instalación adicional.

## Dependencias
El proyecto no tiene dependencias externas. Todo el código necesario está incluido en los archivos HTML, CSS y JavaScript proporcionados.

## Uso
1. Abre el archivo `index.html` en tu navegador web.
2. Ingresa los nombres de los amigos en el campo de entrada y haz clic en "Agregar Nombre" o presiona Enter.
3. Una vez que todos los nombres hayan sido ingresados, haz clic en el botón "Sortear amigo" para seleccionar un nombre aleatorio.
4. Repite el paso 3 hasta que todos los nombres hayan sido sorteados.
5. Cuando todos los nombres hayan sido sorteados, el juego se reiniciará automáticamente y podrás comenzar de nuevo.

## Código
El archivo `script.js` contiene el código JavaScript necesario para capturar los nombres, mostrarlos en la lista, sortearlos aleatoriamente y reiniciar el juego. A continuación se incluye un resumen de las funciones principales:

- `agregarAmigo()`: Captura el nombre ingresado por el usuario y lo agrega a la lista de amigos.
- `mostrarAmigos()`: Muestra los nombres en la lista HTML.
- `sortearAmigo()`: Selecciona un nombre aleatorio de la lista sin repetir.
- `reiniciarJuego()`: Reinicia el juego una vez que todos los nombres han sido sorteados.

## Problemas Conocidos
- Asegúrate de que el campo de entrada de nombre no esté vacío antes de agregar un nombre a la lista.
- El juego se reiniciará automáticamente cuando todos los nombres hayan sido sorteados.

## Soluciones
- Si el campo de entrada de nombre está vacío, aparecerá un mensaje de alerta solicitando que ingreses un nombre.
- El botón "Sortear amigo" no funcionará si no hay nombres disponibles para sortear. Aparecerá un mensaje de alerta informando al usuario.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor crea un fork del repositorio, realiza tus cambios y envía un pull request. Asegúrate de seguir las mejores prácticas de codificación y de proporcionar una descripción clara de los cambios realizados.

