import { defineServer, defineRoom, listen } from 'colyseus';
import { DEFAULT_SERVER_PORT, GAME_ROOM_NAME } from '@fsm/shared';
import { GameRoom } from './rooms/GameRoom.js';

const port = Number(process.env.PORT ?? DEFAULT_SERVER_PORT);

const server = defineServer({
  rooms: {
    [GAME_ROOM_NAME]: defineRoom(GameRoom),
  },
});

await listen(server, port);
console.info(`[server] Colyseus http://localhost:${port} adresinde hazır`);
