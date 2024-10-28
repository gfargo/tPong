import React from 'react';
import { Box, Text } from 'ink';
import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';

export const MenuScreen: React.FC = () => (
  <Box flexDirection="column" alignItems="center" justifyContent="center" width={GAME_WIDTH} height={GAME_HEIGHT}>
    <Text bold color="green">Welcome to Pong!</Text>
    <Text>─────────────────────</Text>
    <Text color="yellow">Controls:</Text>
    <Text>↑ / ↓ : Move paddle</Text>
    <Text>ESC : Exit game</Text>
    <Text>─────────────────────</Text>
    <Text color="cyan">Press Enter to start</Text>
  </Box>
);
