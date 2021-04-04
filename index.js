const app = require("./app");
require("./config/db");

const environment = process.env.NODE_ENV || "development";

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => console.log(`Servidor levantado en el puerto ${port} en el ambiente de ${environment}`));
