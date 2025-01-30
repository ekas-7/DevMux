import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

// Define the props for the TextUpdaterNode component
interface TextUpdaterNodeProps {
  data: { value: string }; // Expecting a value property for text input
  isConnectable: boolean;  // Is the node connectable to other nodes
}

const handleStyle = { left: 10 };

const TextUpdaterNode: React.FC<TextUpdaterNodeProps> = ({ data, isConnectable }) => {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      {/* Target handle for connections */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">Text:</label>
        {/* Input field to update the text */}
        <input
          id="text"
          name="text"
          onChange={onChange}
          value={data.value}
          className="nodrag"
        />
      </div>
      {/* Source handle for connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TextUpdaterNode;
