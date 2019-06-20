const fs = require('fs');
/**
 *  loadJSONdata read data from file and parse it
 *  @param {string} path - path of the file
 *  @return {json} the data parsed
 */
function loadJSONData(path) {
    return JSON.parse(fs.readFileSync(path))
}

/**
 *  Players is used to load and access data
 *  it expose a simple set of basic function
 *  getIndex
 *  getPlayer
 *  getPlayers
 *  deletePlayer
 */
class players {
    constructor(path) {
        this.players = loadJSONData(path).players.sort((a, b) => a.id - b.id);
    }

    /**
     *  getIndex return the player for the given id
     *  @param {number} - id of the player
     *  @return {number} - index of the player or -1
     */
    getIndex(id) {
       return this.players.findIndex(e => e.id === id)
    }


    /**
     * getPlayer return the player according to the id
     * @param {number} - id of the player
     * @return {player | null}
     */
    getPlayer(id) {
        const index = this.getIndex(id);
        if (index !== -1) {
            return this.players[index];    
        }
        return null
    }

    /**
     *  getPlayers return an array of stored players
     *  @return {Array<player>}
     */
    getPlayers() {
        return this.players;
    }


    /**
     * delete the player assocaited to the id
     * @param {number} - id of the player
     * @return {boolean} - true if the player have been deleted
     */
    deletePlayer(id) {
        const index = this.getIndex(id);
        if (index !== -1) {
            this.players.splice(index, 1)
            return true;
        }
        return false;
    }
}

module.exports = players;
