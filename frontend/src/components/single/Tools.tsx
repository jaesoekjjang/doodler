import React, { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { toolType, lineWidth } from '../../recoil/canvasAtom';
import ToolButton from './ToolButton';
import ToolWidth from './ToolWidth';

import { setTool, getToolWidth } from '../../game/api';
import type { Tools as ToolsType } from '../../game/models/Tools';

const Tools = () => {
  const [clickedTool, setClickedTool] = useRecoilState(toolType);
  const setWidth = useSetRecoilState(lineWidth);

  const handleClickTool: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const tool = e.currentTarget.value;
      if (tool == clickedTool) return;

      setClickedTool(tool as ToolsType);
      setTool(tool as ToolsType);
      setWidth(getToolWidth());
    },
    [clickedTool]
  );

  return (
    <div className="flex flex-col gap-2">
      <div>
        <ToolButton toolType="pencil" clickedTool={clickedTool} handleClickTool={handleClickTool} />
        <ToolButton toolType="eraser" clickedTool={clickedTool} handleClickTool={handleClickTool} />
      </div>
      <ToolWidth />
    </div>
  );
};

export default Tools;