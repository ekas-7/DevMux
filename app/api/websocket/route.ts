import { getServerSession } from "next-auth";
import { WebSocketServer } from 'ws';
import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { WebSocket } from 'ws';
import { authOptions } from "../auth/[...nextauth]/route";

interface WebSocketMessage {
    type: string;
    content: string;
}

const socketUserMap = new WeakMap<WebSocket, {
    userId: string;
    username: string;
}>();

export default async function handler(req: NextApiRequest, res: any) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    if (!res.socket.server.ws) {
        const wsServer = new WebSocketServer({
            noServer: true
        });

        wsServer.on('connection', (socket: WebSocket) => {
            socketUserMap.set(socket, {
                userId: session.user?.id || '',
                username: session.user?.name || 'Anonymous'
            });

            socket.send(JSON.stringify({
                type: 'welcome',
                data: {
                    message: 'Welcome to the chat!',
                    userId: session.user?.id,
                    username: session.user?.name
                }
            }));

            socket.on('message', (message: Buffer) => {
                try {
                    const data = JSON.parse(message.toString()) as WebSocketMessage;
                    const userData = socketUserMap.get(socket);

                    if (!userData) return;

                    wsServer.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'message',
                                data: {
                                    content: data.content,
                                    userId: userData.userId,
                                    username: userData.username,
                                    timestamp: new Date().toISOString()
                                }
                            }));
                        }
                    });
                } catch (error) {
                    console.error('Error handling message:', error);
                }
            });

            socket.on('close', () => {
                socketUserMap.delete(socket);
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