import React from 'react';
import Svg, { Rect } from 'react-native-svg';

export const ThreeBarsSvg = ({ 
  color = '#ffffff90',
  gap = 2,
  borderRadius = 2,
  heights = [18, 24, 12] // [маленькая, средня/я, большая]
}) => {
  const columnWidth = 8; // Фиксированная ширина всех колонок
  
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32">
      {/* Маленькая колонка (левая) */}
      <Rect
        x={0}
        y={32 - heights[0]} // Выравнивание по нижнему краю
        width={columnWidth}
        height={heights[0]}
        rx={borderRadius}
        fill={color}
      />
      
      {/* Средняя колонка (центральная) */}
      <Rect
        x={columnWidth + gap}
        y={32 - heights[1]}
        width={columnWidth}
        height={heights[1]}
        rx={borderRadius}
        fill={color}
      />
      
      {/* Большая колонка (правая) */}
      <Rect
        x={(columnWidth + gap) * 2}
        y={32 - heights[2]}
        width={columnWidth}
        height={heights[2]}
        rx={borderRadius}
        fill={color}
      />
    </Svg>
  );
};