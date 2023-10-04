import { useState } from 'react';
import { ColorResult } from 'react-color';

import { Divider, StyledCirclePicker, StyledColorPickerWrapper } from './color-picker.styles';
import { ColorPickerProps } from './color-picker.props';
import { StyledTypography } from '../../../shared/styles';

export const _ColorPicker = (props: ColorPickerProps) => {
  const [color, setColor] = useState(props.color);

  const handleColorChange = (color: ColorResult) => {
    props.onColorChange(color.hex);
    setColor(color.hex);
  };

  return (
    <StyledColorPickerWrapper>
      <StyledTypography variant="body1" fontWeight={'600'}>
        {props.title}
      </StyledTypography>
      <Divider />
      <StyledCirclePicker
        isInverted={!!color}
        color={color}
        onChange={(color) => {
          handleColorChange(color);
        }}
      />
    </StyledColorPickerWrapper>
  );
};