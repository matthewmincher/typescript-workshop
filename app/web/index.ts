import * as express from 'express';
const app = express();

app.use('/', (request: express.Request, response: express.Response) => response.send("Hello, world!"));
app.listen(3000, () => console.log("Listening on :3000"));