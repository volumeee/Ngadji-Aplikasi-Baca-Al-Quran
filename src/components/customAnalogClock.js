import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Line, Text} from 'react-native-svg';
import {useTime} from '../helper/time';
import tw from '../utils/tailwind';

const Clock = () => {
  const {hours, minutes, seconds} = useTime();

  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const secondDegrees = seconds * 6;

  const dotCenterHeight = 5;

  return (
    <View style={tw` justify-end items-end -inset-y-9 -inset-x-4`}>
      <Svg height="212" width="210" pointerEvents="none">
        <Circle
          cx="150"
          cy="150"
          r="60"
          fill="transparent"
          stroke="#1F2421"
          strokeWidth="0.4"
        />
        {Array.from(Array(60), (_, i) => i).map((m, i) => (
          <Line
            key={i}
            x1={150 + (m % 0 === 0 ? 45 : 50) * Math.cos((Math.PI * m) / 30)}
            y1={150 + (m % 0 === 0 ? 45 : 50) * Math.sin((Math.PI * m) / 30)}
            x2={150 + 55 * Math.cos((Math.PI * m) / 30)}
            y2={150 + 55 * Math.sin((Math.PI * m) / 30)}
            stroke="#1F2421"
            strokeWidth={m % 5 === 0 ? 1 : 0.5}
          />
        ))}
        {['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'].map(
          (label, i) => (
            <Text
              key={i}
              x={150 + 43 * Math.cos((Math.PI * i) / 6)}
              y={150 + 43 * Math.sin((Math.PI * i) / 6)}
              textAnchor="middle"
              alignmentBaseline="central"
              dominantBaseline="central"
              fontSize={10}
              fill="#1F2421">
              {label}
            </Text>
          ),
        )}
        <Line
          x1="150"
          y1="150"
          x2={150 + 25 * Math.sin((Math.PI * hourDegrees) / 180)}
          y2={150 - 25 * Math.cos((Math.PI * hourDegrees) / 180)}
          stroke="#1F2421"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Line
          x1="150"
          y1="150"
          x2={150 + 40 * Math.sin((Math.PI * minuteDegrees) / 180)}
          y2={150 - 40 * Math.cos((Math.PI * minuteDegrees) / 180)}
          stroke="#1F2421"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Line
          x1="150"
          y1="150"
          x2={150 + 35 * Math.sin((Math.PI * secondDegrees) / 180)}
          y2={150 - 35 * Math.cos((Math.PI * secondDegrees) / 180)}
          stroke="red"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <Circle cx="150" cy="150" r="3" fill="#1F2421" />
      </Svg>
    </View>
  );
};

export default Clock;
