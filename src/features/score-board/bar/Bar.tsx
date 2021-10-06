import React from "react";

type BarProps = { 
  height?:number;
  color?: string; 
  value: number 
};
const width = 250;


export const Bar : React.FunctionComponent<BarProps> = ({color = '#0ac', value = 0, height = 30}: BarProps) => { // color default value provided
  return (
    <svg width={width} height={height} arial-label="average bar">
      <g>
        <rect rx="5" width={width} height={height} fillOpacity={0.4} fill={color} />
        <rect rx="5" width={value*2} height={height} fill={color} />
        <text
          className="bar-text"
          x={value*2 - 20}
          y={height/2}
          alignmentBaseline="middle"
          fill="white"
          fontSize="14"
        >
          {value}
        </text>
      </g>
    </svg>
  );
}


