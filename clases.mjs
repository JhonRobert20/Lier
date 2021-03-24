class Marcador {

    static instance;

    constructor( name = 'Lier' ) {
        
        if ( !!Marcador.instance ) {
            return Marcador.instance;
        }
        Marcador.instance = this;
        this.name = name;
        this.players = [];
        this.names = [];
        this.winner = [];

        return this;
    }
    addUser(player) {
        if (this.players.includes(player)) {
            console.log(`${player.name} ya ha sido añadido al juego`)
        } else {
            console.log(`${player.name} ha sido añadido`)
            this.players.push(player);
            this.names.push(player.name);
        }
    }
    selectUser(playerName) {
        return this.players[this.selectIndexUser(playerName)]
    }
    selectIndexUser(playerName) {
        return this.names.indexOf(playerName);
    }
    updateScoreUser(player) {
        if (this.names.includes(player.name)) {
            console.log(`${player.name}: ${player.score}`);
            var index = this.selectIndexUser(player.name);
            if (player.score === 0) {
                this.players.splice(index, 1);
                this.names.splice(index, 1);
            } else {
                this.players.splice(index, 1, player);
            }
        }
        else {
            console.log(`${player.name} no esta en el juego`)
        }
    }
}
const marcador = new Marcador();
class Player{
    
    static instance;
    constructor( name = 'Player') {
        Player.instance = this;
        this.name = name;
        this.score = 6;
        this.dices = [0, 0, 0, 0 , 0, 0];
        this.addPlayerToTheGame();
        return this;
    }
    restScore() {
        if (this.score > 0) {
            this.score -= 1;
            this.dices.splice(0, 1);
            marcador.updateScoreUser(this);
            return; 
        }
        console.log("No se puede restar más puntos, el jugador ha perdido")

    }

    getScore() {
        return this.score;
    }
    getName() {
        return this.name;
    }
    addDices(dices) {
        this.dices = dices;
    }
    addPlayerToTheGame() {
        marcador.addUser(this);
    }
}


export { Marcador, Player, marcador }