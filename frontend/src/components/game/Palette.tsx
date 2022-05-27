import React, { useState } from 'react';

import ColorButton from './ColorButton';
import { basicColors } from '../../game/utils';
import { DrawDataContext } from './DrawDataProvider';
import { useContext } from 'react';

type RecentColors = [string, string, string];

const Palette: React.FC = () => {
  const { drawData, setDrawData } = useContext(DrawDataContext);

  const [recentColors, setRecentColors] = useState<RecentColors>(['#000000', '#ffffff', '#ffffff']);
  const [inputColor, setInputColor] = useState(drawData.color);

  const changeColor = (
    e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const colorHex = e.currentTarget.value;
    setDrawData((drawData) => ({ ...drawData, color: colorHex }));
    setInputColor(colorHex);

    if (recentColors.includes(colorHex)) return;
    setRecentColors((recentColors) => [colorHex, ...recentColors.slice(0, 2)] as RecentColors);
  };

  const mapRecentColorsButtons = (recentColors: string[]) =>
    recentColors.map((color, index) => (
      <ColorButton key={color + index} changeColor={changeColor} color={color}></ColorButton>
    ));

  return (
    <div className="flex w-44 flex-col gap-4 ">
      <div className="flex flex-wrap gap-2">{mapRecentColorsButtons(recentColors)}</div>
      <hr className="w-40" style={{ height: '2px', background: 'black' }} />
      <div className="flex flex-wrap gap-2">{mapRecentColorsButtons(basicColors)}</div>
      <input
        className="color-input"
        type="color"
        onChange={(e) => setInputColor(e.currentTarget.value)}
        onBlur={changeColor}
        value={inputColor}
      />
    </div>
  );
};

export default Palette;
