const server = require('./app');
const { PORT } = require('./config');

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
