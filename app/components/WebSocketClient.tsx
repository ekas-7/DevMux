import { useEffect, useState } from 'react';

export function WebSocketClient() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        // Create WebSocket connection
        const ws = new WebSocket(`ws://${window.location.host}/api/websocket`);

        ws.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prev => [...prev, data]);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        setSocket(ws);

        // Cleanup on unmount
        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && inputMessage) {
            socket.send(JSON.stringify({
                type: 'message',
                data: inputMessage
            }));
            setInputMessage('');
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold">WebSocket Chat</h2>
                <div className="border rounded p-4 h-64 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            {JSON.stringify(msg)}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="border rounded px-2 py-1 flex-grow"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
} 