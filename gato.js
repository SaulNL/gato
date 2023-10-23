var lienzo = document.getElementById('lienzo');
var ctx = lienzo.getContext("2d");
var gatoImg = document.getElementById('gato-img');
var ratonImg = document.getElementById('raton-img');

// Variables globales para el juego
var turnoJugador = 1; // Jugador actual (1 o 2)
var ganador = 0; // Ganador del juego (0 si aún no hay ganador)

// Objeto que representa el estado del juego
var gato = {
    estados: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],

    // Dibuja la rejilla del tablero
    pintarRejilla: function () {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        // Dibuja las líneas verticales
        for (var i = 1; i <= 2; i++) {
            ctx.beginPath();
            ctx.moveTo(i * lienzo.width / 3, 0);
            ctx.lineTo(i * lienzo.width / 3, lienzo.height);
            ctx.stroke();
        }

        // Dibuja las líneas horizontales
        for (var i = 1; i <= 2; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * lienzo.height / 3);
            ctx.lineTo(lienzo.width, i * lienzo.height / 3);
            ctx.stroke();
        }
    },

    // Dibuja los círculos y cruces en el tablero
    escenario: function () {
        for (var i = 0; i < this.estados.length; i++) {
            for (var j = 0; j < this.estados[i].length; j++) {
                if (this.estados[i][j] === 1) {
                    // Dibuja la imagen del gato para el jugador 1
                    ctx.drawImage(gatoImg, j * lienzo.width / 3, i * lienzo.height / 3, lienzo.width / 3, lienzo.height / 3);
                } else if (this.estados[i][j] === 2) {
                    // Dibuja la imagen del ratón para el jugador 2
                    ctx.drawImage(ratonImg, j * lienzo.width / 3, i * lienzo.height / 3, lienzo.width / 3, lienzo.height / 3);
                }
            }
        }
    },

    // Función para manejar el clic en el lienzo
    seleccionar: function (event) {
        if (ganador === 0) {
            var x = event.offsetX;
            var y = event.offsetY;
            var fila = Math.floor(y / (lienzo.height / 3));
            var columna = Math.floor(x / (lienzo.width / 3));

            if (gato.estados[fila][columna] === 0) {
                gato.estados[fila][columna] = turnoJugador;
                gato.escenario();

                ganador = gato.analizarJugador();

                if (ganador !== 0) {
                    alert("¡Jugador " + ganador + " ha ganado!");
                } else {
                    turnoJugador = turnoJugador === 1 ? 2 : 1;
                }
            }
        }
    },

    // Función para analizar si un jugador ha ganado
    analizarJugador: function () {
        // Implementa la lógica para verificar si un jugador ha ganado
        for (var i = 0; i < 3; i++) {
            if (this.estados[i][0] === turnoJugador && this.estados[i][1] === turnoJugador && this.estados[i][2] === turnoJugador) {
                return turnoJugador;
            }
            if (this.estados[0][i] === turnoJugador && this.estados[1][i] === turnoJugador && this.estados[2][i] === turnoJugador) {
                return turnoJugador;
            }
        }
        if (this.estados[0][0] === turnoJugador && this.estados[1][1] === turnoJugador && this.estados[2][2] === turnoJugador) {
            return turnoJugador;
        }
        if (this.estados[0][2] === turnoJugador && this.estados[1][1] === turnoJugador && this.estados[2][0] === turnoJugador) {
            return turnoJugador;
        }

        // Si no hay ganador
        return 0;
    },

    // Función para reiniciar el juego
    reiniciar: function () {
        gato.estados = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        turnoJugador = 1;
        ganador = 0;
        ctx.clearRect(0, 0, lienzo.width, lienzo.height);
        gato.pintarRejilla();
    },

    // Función principal para iniciar el juego
    play: function () {
        gato.pintarRejilla();
        lienzo.addEventListener("click", gato.seleccionar);
        document.getElementById('reiniciar-btn').addEventListener('click', gato.reiniciar);
    }
};


// Inicializa el juego
gato.play();
