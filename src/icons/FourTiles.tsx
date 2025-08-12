import React from 'react';
import Svg, { Rect } from 'react-native-svg';

export const FourTilesSvg = ({ size = 32, color = '#ffffff90', gap = 2, borderRadius = 4 }) => {
  const tileSize = 14;
  
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Верхний левый квадрат */}
      <Rect
        x="0"
        y="0"
        width={tileSize}
        height={tileSize}
        rx={borderRadius}
        fill={color}
      />
      
      {/* Верхний правый квадрат */}
      <Rect
        x={tileSize + gap}
        y="0"
        width={tileSize}
        height={tileSize}
        rx={borderRadius}
        fill={color}
      />
      
      {/* Нижний левый квадрат */}
      <Rect
        x="0"
        y={tileSize + gap}
        width={tileSize}
        height={tileSize}
        rx={borderRadius}
        fill={color}
      />
      
      {/* Нижний правый квадрат */}
      <Rect
        x={tileSize + gap}
        y={tileSize + gap}
        width={tileSize}
        height={tileSize}
        rx={borderRadius}
        fill={color}
      />
    </Svg>
  );
};