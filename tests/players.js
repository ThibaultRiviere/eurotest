const assert = require('assert');
const players = require('../lib/players');

describe('unit tests for player', () => {
    it('get all players', () => {
        const store = new players('./data/headtohead.json');
        const all = store.getPlayers();
        assert(all.length === 5);
    });

    it('get specific player', () => {
        const store = new players('./data/headtohead.json');
        const id = 52;
        const player = store.getPlayer(id);
        assert(player.id === id);
    });

    it('get unexisting player', () => {
        const store = new players('./data/headtohead.json');
        const id = 42;
        const player = store.getPlayer(id);
        assert(player === null);
    });

    it('delete specific player', () => {
        const store = new players('./data/headtohead.json');
        const id = 52;
        const before = store.getPlayer(id);
        assert(store.deletePlayer(id));
        const after = store.getPlayer(id);
        assert(before !== after);
    });

    it('delete unexisting player', () => {
        const store = new players('./data/headtohead.json');
        const id = 42;
        assert(store.getPlayer(id) === null);
        assert(store.deletePlayer(id) === false);
    });
});
