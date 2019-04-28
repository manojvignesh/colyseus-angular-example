import {Server} from 'colyseus';
import {ChatRoom} from './chat-room';
import {createServer} from 'http';
import * as express from 'express';

const port = Number(process.env.PORT) || 2657;
const app = express();

const server = createServer(app);
const gameServer = new Server({server});

gameServer.register('chat', ChatRoom).then(() => {
  gameServer.listen(port);
  console.log(`Listening on http://localhost:${port}`);
});
