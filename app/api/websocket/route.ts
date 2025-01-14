import { getServerSession } from "next-auth";
import { WebSocket, WebSocketServer } from 'ws';
import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

// Extend WebSocket type to include userId
interface CustomWebSocket extends WebSocket {
  userId?: string;
}

export default async function handler(req: NextApiRequest, res: any) {
  const session = await getServerSession(req);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!res.socket.server.ws) {
    const wsServer = new WebSocketServer({
      noServer: true
    });

    wsServer.on('connection', (socket: CustomWebSocket) => {
      const userId = session.user?.id;
      socket.userId = userId;

      socket.send(JSON.stringify({
        type: 'welcome',
        data: { message: 'Welcome to the WebSocket server!', userId }
      }));

      socket.on('message', (message) => {
        try {
          const data = JSON.parse(message.toString());
          
          wsServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'message',
                data: {
                  ...data,
                  userId: socket.userId,
                  username: session.user?.name
                }
              }));
            }
          });
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });
    });

    res.socket.server.ws = wsServer;

    const server = res.socket.server;
    server.on('upgrade', (request: IncomingMessage, socket: Socket, head: Buffer) => {
      if (request.url === '/api/websocket') {
        wsServer.handleUpgrade(request, socket, head, (ws) => {
          wsServer.emit('connection', ws, request);
        });
      }
    });
  }

  res.end();
} 