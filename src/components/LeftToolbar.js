import React from 'react';
import { 
  RectangleOutlined, 
  TextFieldsOutlined, 
  PanToolOutlined, 
  CircleOutlined 
} from '@mui/icons-material';

const LeftToolbar = ({ selectedTool, onSelectTool }) => {
  const tools = [
    { 
      name: 'select', 
      icon: <PanToolOutlined />,
      tooltip: 'Select and move'
    },
    { 
      name: 'rectangle', 
      icon: <RectangleOutlined />,
      tooltip: 'Rectangle'
    },
    { 
      name: 'circle', 
      icon: <CircleOutlined />,
      tooltip: 'Circle'
    },
    { 
      name: 'text', 
      icon: <TextFieldsOutlined />,
      tooltip: 'Text'
    }
  ];

  return (
    <div className="left-toolbar">
      {tools.map((tool) => (
        <button 
          key={tool.name}
          className={`tool-button ${selectedTool === tool.name ? 'active' : ''}`}
          onClick={() => onSelectTool(tool.name)}
          title={tool.tooltip}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default LeftToolbar;