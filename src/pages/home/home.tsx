// home.tsx
import React, { useState } from 'react';
import {
  StyledHomeDescription,
  StyledHomeTitle,
  StyledHomeWrapper,
  StyledCheckpointInfo,
  StyledLink,
  StyledCheckpointInfoWrapper,
} from './home.styles'; // Import StyledBox
import { LinearProgressBar } from '../../shared';
import { IHomeProps } from './home.props';
import { Box, Tooltip } from '@mui/material';

export const Home = (props: IHomeProps) => {
  const { title } = props;
  const [activeCheckpoint, setActiveCheckpoint] = useState(0);

  const handleCheckpointClick = (index: number) => {
    setActiveCheckpoint(index);
  };

  return (
    <StyledHomeWrapper>
      <StyledHomeTitle>{title}</StyledHomeTitle>
      <StyledHomeDescription>
        This project is part of the BPR2 or, in other words, Bachelor project for the last semester in Software
        Engineering at the VIA University College.
      </StyledHomeDescription>
      <LinearProgressBar activeCheckpoint={activeCheckpoint} />
      <Tooltip title="Click to read more!" placement="top" arrow>
        <StyledCheckpointInfoWrapper>
          {activeCheckpoint === 0 && (
            <StyledCheckpointInfo
              onClick={() => {
                handleCheckpointClick(activeCheckpoint + 1);
              }}>
              Implemented with React, MUI, Redux, Typescript, AWS Amplify & so many other cool technologies!! 😎
            </StyledCheckpointInfo>
          )}
          {activeCheckpoint === 1 && (
            <StyledCheckpointInfo
              onClick={() => {
                handleCheckpointClick(activeCheckpoint + 1);
              }}>
              Developed by Stefan Georgiev & Yoana Miteva 🤓
            </StyledCheckpointInfo>
          )}
          {activeCheckpoint === 2 && (
            <StyledCheckpointInfo
              onClick={() => {
                handleCheckpointClick(activeCheckpoint + 1);
              }}>
              Deployed on AWS Amplify with CI/CD through Github Actions 🚀
            </StyledCheckpointInfo>
          )}
          {activeCheckpoint === 3 && (
            <StyledCheckpointInfo
              onClick={() => {
                handleCheckpointClick(0);
              }}>
              {' '}
              Check out more of our projects on Github!! 🤗 <br />
              <Box>
                <StyledLink>
                  <a href="https://github.com/NoHop3" target="_blank">
                    Stefan's GitHub
                  </a>
                </StyledLink>
                {'&'}
                <StyledLink>
                  <a href="https://github.com/YoyoMy" target="_blank">
                    Yoana's GitHub
                  </a>
                </StyledLink>
              </Box>
            </StyledCheckpointInfo>
          )}
        </StyledCheckpointInfoWrapper>
      </Tooltip>
    </StyledHomeWrapper>
  );
};
