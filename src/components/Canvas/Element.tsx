import React from 'react';
import { Rect, Circle, Line, Text } from 'react-konva';
import { useAppStore } from '../../store/AppStore';

export const Elements = () => {
  const { elements } = useAppStore();
  
  return (
    <>
      {elements.map(element => {
        switch (element.type) {
          case 'rectangle':
            return <Rect key={element.id} {...element} />;
          case 'circle':
            return <Circle key={element.id} {...element} />;
          case 'line':
            return <Line key={element.id} {...element} />;
          case 'text':
            return <Text key={element.id} {...element} />;
          default:
            return null;
        }
      })}
    </>
  );
};
