import React from 'react';
import { Box, Text } from 'ink';
import { GAME_WIDTH, GAME_HEIGHT } from './constants.js';

interface GameOverScreenProps {
  winner: string;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ winner }) => (
  <Box flexDirection="column" alignItems="center" justifyContent="center" width={GAME_WIDTH} height={GAME_HEIGHT}>
    <Text bold color="red">Game Over</Text>
    <Text>─────────────────────</Text>
    <Text color="green">{winner} player wins!</Text>
    <Text>─────────────────────</Text>
    <Text color="yellow">Press Enter to return to menu</Text>
    <Text color="yellow">Press Esc to exit</Text>
  </Box>
);
