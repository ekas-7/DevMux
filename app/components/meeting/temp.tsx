import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,  // Import the Connection type
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import TextUpdaterNode and other custom nodes
import TextUpdaterNode from './TextUpdaterNode';

// Define the node structure explicitly
interface CustomNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { value: string };
}

const initialNodes: CustomNode[] = [
];

const nodeTypes = { textUpdater: TextUpdaterNode };

const DrawingCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
  const [edges, setEdges] = useState<any[]>([]); // Update with the correct type for edges
  const [selectedShape, setSelectedShape] = useState<string>('textUpdater'); // State to track selected node type
  const [isAddingNode, setIsAddingNode] = useState<boolean>(false); // State to track if the add button was clicked

  // Handle node changes (dragging, resizing, etc.)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds) as CustomNode[]),
    [setNodes],
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  // Handle node connection (edges)
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  // Handle click on the canvas to add a new node
  const onCanvasClick = (event: React.MouseEvent) => {
    // console.log("heyy");
    
    // if (isAddingNode) {
      const canvasBounds = event.currentTarget.getBoundingClientRect();
      const position = { x: event.clientX - canvasBounds.left, y: event.clientY - canvasBounds.top };
      console.log("Added another block");
      
      const newNode: CustomNode = {
        id: `node-${nodes.length + 1}`,
        type: selectedShape,
        position,
        data: { value: 'New Node' },
      };

      setNodes((nds) => [...nds, newNode]);
      setIsAddingNode(false); // Reset the state after adding the node
    // }
  };

  // Update the selected shape when a button is clicked
  const selectShape = (shape: string) => {
    setSelectedShape(shape);
  };

  // Enable the node addition when the "Add Node" button is clicked
  const enableNodeAdding = () => {
    setIsAddingNode(true);
  };

  return (
    <div className="w-full h-full">
      {/* Toolbar for selecting shapes */}
      <div className="shape-selector-toolbar" style={{ padding: '10px', backgroundColor: '#f4f4f4', display: 'flex' }}>
        <button onClick={onCanvasClick} style={{ margin: '0 10px', backgroundColor: 'black', color: 'white' }}>
          Add Text Updater
        </button>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ backgroundColor: '#B8CEFF' }}
        // onClick={onCanvasClick} // Add the onClick handler for the canvas
      >
        {/* Background and Controls */}
        <Background variant={BackgroundVariant.Dots} />
        <Controls className="custom-controls" />
      </ReactFlow>
    </div>
  );
};

export default DrawingCanvas;
