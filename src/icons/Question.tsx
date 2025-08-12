import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const QuestionSvg = ({ 
  size = 32,
  color = '#ffffff90',
  thickness = 5.5
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      {/* Основная часть знака вопроса с укороченным хвостиком */}
      <Path
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.5 11.5c0-4 3.5-7 7.5-7s7.5 3 7.5 7c0 3.5-2.5 6-5 7-1.2.6-2 1.5-2 2.2"  // Изменил "3v1" на "2.2"
      />
      
      {/* Точка остается на прежнем месте */}
      <Circle
        cx="20"
        cy="28.5"
        r="3.5"
        fill={color}
      />
    </Svg>
  );
};