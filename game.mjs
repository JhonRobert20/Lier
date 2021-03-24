import { marcador } from './clases.mjs'
import { shake, checkSamePlayer, checkOtherPlayer } from './dado.mjs';
import { question } from 'readline-sync';

// playerInMain: Devuelve a un jugador que este en la partida por su indice
// selectPlayer: Devuelve a un jugador que este en la partida por su nombre
// numberPlayers: Devuelve la longitud de jugadores
// searchIndexPlayer: Devuelve el indice de un jugador según su nombre
// names: Imprime los nombres que estan el juego
// countDices: Devuelve el numero de veces que se dicho tener cierto dado

// shakeTime: Al principio de cada ronda se mueven los vasos con los dados que cada jugador tenga, los puedes comprobar
// actionCheck: Has que yo nadie quiera mirar sus dados se mostrara pasandole un nombre.
// play2User: Elijes entre decir que el otro miente o seguir el juego
// asign: Si elijes no comprobar si miente, debes decir el numero y la cantidad de veces
// play: Por cada ronda controla todos los numeros que salen, y te deja seleccionar las opciones posibles
// play: Devolvera el indice de la ultima operacion

// row: Recopila cada una de estas funciones. Seguira hasta tener un ganador


const exitCase = ['Q', 'E', 'EXIT'];

function playerInMain(index) {
    return marcador.players[index]
}
function selectPlayer(name) {
    return marcador.players[searchIndexPlayer(name)];
}
function numberPlayers() {
    return marcador.names.length;
}
function searchIndexPlayer(name) {
    return marcador.selectIndexUser(name);
}
function names() {
    marcador.names.forEach( name => console.log(name) );
}
function countDices(turn) {
    var numero = 0;
    turn.forEach( turno => numero += turno[1] )
    return numero;
}

function shakeTime() {
    console.log("Ahora turno de mover los dados, al mismo tiempo ");
    for (var i = 0; i < numberPlayers(); i++) {
        var player = playerInMain(i);
        player.dices = shake(player.dices.length);
    }
    actionCheck();
    names();
}
function actionCheck() {
    while (true) {
        console.log("Si nadie más quiere escribir q, e o exit");
        names();
        var playerName = question("Quien quiere mirar sus dados: ").toUpperCase();
        if (exitCase.includes(playerName)) {
            console.log("Nadie mas quiere comprobar sus dados, vamos a jugar")
            return
        }
        if (marcador.names.includes(playerName)) {
            var player = selectPlayer(playerName);
            checkSamePlayer(player);
        }
    }
}

function play2User(turn, indexJugador, indexAnterior) {
    while( true ) {
        var pregunta = question("El anterior miente(lier), Subir la apuesta(s): ").toUpperCase();
        if ( pregunta === 'LIER' ) {
            checkOtherPlayer( playerInMain( indexJugador ), playerInMain( indexAnterior ), turn[ indexAnterior ] )
            return 0;

        } else if( pregunta === 'S' ) {
            return asign(turn[ indexAnterior ]);
        }
    }
}

function asign( numeroTurno = "" ) {
    var data = [];
    var numero = "";
    while(true) {
        if (numeroTurno === "") {
            numero = parseInt(question("numero del dado: "))
        }else {
            numero = numeroTurno[0];
            data.push(numero);
        }
        var veces = parseInt(question("veces del dado: "))
        if (!!numero === true && !!veces === true) {
            if (numeroTurno === "") {
                data.push(numero);
            }
            data.push(veces);
            console.log("\n\n\n\n");
            return(data);
        }
        console.log("Solo numeros porfavor ")
    }
}

function play(jugador) {
    console.log("Hora de jugar");
    var turnoActual = [];
    for ( var i = 0; i < numberPlayers(); i++) {
        turnoActual.push([0,0])
    }
    var indexJugador = jugador;
    var indexAnterior = 0;
    for (var i = 0; i < numberPlayers() + 1; i++) {
        indexJugador += i;
        if ( indexJugador >= numberPlayers() ) {
            indexJugador = indexJugador % numberPlayers();
        }

        indexAnterior = indexJugador === 0 ? marcador.names.length - 1 : indexJugador - 1;
        
        if (i === 0) {
            
            console.log(`${playerInMain(indexJugador).name} tienes ${playerInMain(indexJugador).dices}`);
            turnoActual[indexJugador] = asign();

        } else if( i === numberPlayers() ) {
            var player = playerInMain(indexJugador);
            player.restScore();
            return indexJugador;
        } else {
            console.log(`${playerInMain(indexJugador).name} tienes ${playerInMain(indexJugador).dices} y el anterior dijo que tenia ${turnoActual[indexAnterior]} en total hay ${countDices(turnoActual)}`);
            var datosJugador = play2User(turnoActual, indexJugador, indexAnterior)
            if ( datosJugador !== 0) {
                turnoActual[indexJugador] = datosJugador;
            
            } else {
                return indexJugador;
            }
        }
    }
}


function row() {
    var jugador = 0;
    while (marcador.winner.length === 0) {
        shakeTime();
        var jugadorActual = play(jugador);
        jugador = jugadorActual;
        if ( marcador.names.length === 1) {
            marcador.winner.push(marcador.players[0]);
            break
        }
    }
    console.log(marcador)
}

export { 
    playerInMain, selectPlayer, numberPlayers, searchIndexPlayer, 
    names, countDices ,shakeTime, actionCheck, play2User, asign, play, row
};