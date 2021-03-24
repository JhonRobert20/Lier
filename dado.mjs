import { question } from "readline-sync";

// Shake: Mueve los dados y los retorna
// checkSamePlayer: Permite a un jugador mirar sus dados
// checkOtherPlayer: Compueba si decia la verdad o mentia, resta un punto a quien falle
// checkDices: Comprueba si la cantidad de numero dicha es verdadera

function shake(n) {
    var dados = [];
    for( var i= 0; i<n; i++) {
        dados.push( Math.floor( Math.random() * 6 ) +1 );
    }
    return dados;
}

function checkSamePlayer(player) {

    console.log(player.dices);
    question("Puls cualquier letra para salir: ");
    console.log("\n\n\n\nNo mires arriba");
}

function checkOtherPlayer( player1, player2, player2Say ) {
    if ( checkDices(player2.dices, player2Say)) {
        player1.restScore();
    } else {
        player2.restScore();
    }
}

function checkDices( player2Dices, player2Say ) {
    var numero = player2Say[0];
    var veces = player2Say[1];
    var vecesReales = 0;
    for ( var i = 0; i<player2Dices.length; i++) {
        var dado = player2Dices[i];
        if (dado === numero) vecesReales++;
    }
    return vecesReales === veces ? true : false;
}

export { shake, checkSamePlayer, checkOtherPlayer, checkDices }