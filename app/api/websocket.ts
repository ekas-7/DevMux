import { WebSocket, WebSocketServer } from 'ws';
import { NextApiRequest } from 'next';
import type { Server as HTTPServer } from 'http';
import type { Socket } from 'net';

// Define message interface
interface WebSocketMessage {
    type: string;
    data: any;
}

export default function handler(req: NextApiRequest, res: any) {
    if (!res.socket.server.ws) {
        console.log('Setting up WebSocket server');
        
        // Create new WebSocket server using WebSocketServer instead of Server
        const wsServer = new WebSocketServer({
            noServer: true
        });

        // Handle WebSocket connections
        wsServer.on('connection', (socket: WebSocket) => {
            console.log('New client connected');

            // Send welcome message
            socket.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

            // Handle incoming messages with type safety
            socket.on('message', (message: Buffer | ArrayBuffer | Buffer[]) => {
                try {
                    const data: WebSocketMessage = JSON.parse(message.toString());
                    console.log('Received:', data);

                    // Broadcast message to all clients
                    wsServer.clients.forEach((client: WebSocket) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'message',
                                data: data
                            }));
                        }
                    });
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });

            // Handle client disconnection
            socket.on('close', () => {
                console.log('Client disconnected');
            });
        });

        // Store WS server instance
        res.socket.server.ws = wsServer;

        // Handle upgrade of the HTTP connection to WebSocket
        const server: HTTPServer = res.socket.server;
        server.on('upgrade', (request: NextApiRequest, socket: Socket, head: Buffer) => {
            if (request.url === '/api/websocket') {
                wsServer.handleUpgrade(request, socket, head, (ws) => {
                    wsServer.emit('connection', ws, request);
                });
            }
        });
    }

    res.end();
}
