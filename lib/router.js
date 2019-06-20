const players = require('../lib/players');

/**
 * notFound set the status code to 404
 */
function notFound(res) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).end('not found');
}


/**
 *  LoadRoute will add the http routes to the router
 *  @params {Express.Router} - express router
 *  @return {Express.Router}
 */
function loadRoutes(router) {
    const store = new players('./data/headtohead.json');

    router.get('/players/:id', (req, res) => {
        const player = store.getPlayer(parseInt(req.params.id, 10));
        if (player === null) {
            return notFound(res);
        }
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(player));
    });

    router.get('/players', (req, res) => {
        const data = JSON.stringify(store.getPlayers());
        res.setHeader('Content-Type', 'application/json');
        return res.end(data);
    });

    router.delete('/players/:id', (req, res) => {
        if (!store.deletePlayer(parseInt(req.params.id, 10))) {
            return notFound(res);
        }
        return res.status(201).end();
    });

    // Use to handle everything with 404
    // except the router declared
    router.use((req, res, next) => notFound(res));
    return router;
}

module.exports = loadRoutes;
