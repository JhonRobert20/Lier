import { marcador, Player } from './clases.mjs';
import { question } from 'readline-sync';
import { names, row } from './game.mjs';


const exitCase = ['Q', 'E', 'EXIT'];

// Consistira en el mentiroso con dados. Cada Jugador tiene 6 dados al iniciar la partida
// Puedes mirar los dados que tienes
// Puedes decri que el otro miente o seguirle la corriente
// Sabes cuantos dados tienen tus rivales
// Si tienes 0 dados has perdido
// Gana quien sobreviva

function main() {
    console.log(`Hola, Quien quiere jugar a los dados? \n`);
    while(true) {
        console.log("Si nadie más quiere escribir q, e o exit");
        var playerName = question("Nombre del jugador : ").toUpperCase();
        if (playerName.length > 0) {
            if ( exitCase.includes(playerName)) {
                break
            }
            if ( marcador.names.includes(playerName)) {
                console.log("No se pueden llamar igual")
            } else {
                new Player(playerName); 
            }
        } else {
            console.log("El nombre almenos debe tener un caracter");
        }
    }
    if (marcador.names.length > 0) {
        console.log("Los que van  jugar seran: ");
        names();
        row();

    } else {
        console.log("Nadie ha sido añadido, nadie quiere jugar");
    }
}
main()