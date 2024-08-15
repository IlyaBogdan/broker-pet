import { EventEmitter } from 'events';
import { WebSocketEntry } from '../..';
import { WebSocket } from 'ws';

interface MessageFormat {
  [key: string]: any;
  method: String;
  clients?: Array<any>
}

export class BroadcastEvent extends EventEmitter {
  
  public data?: MessageFormat = undefined;

  constructor() {
    super();
  }

  public setMessage(data: MessageFormat): this {
    this.data = data;

    return this;
  }
}

const broadCast = new BroadcastEvent();

broadCast.on('broadcast', (data: MessageFormat) => {
  WebSocketEntry.getServer()
    .then((server) => {
      //const clients = data.clients ?? server.clients;
      const clients = server.clients;

      clients.forEach((client: WebSocket) => {
        const message = JSON.stringify(data);

        if (data.clients) delete data.clients;
        client.send(message);
      })
    });
});

export { broadCast }