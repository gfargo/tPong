import { Box, Text } from 'ink'
import Gradient from 'ink-gradient'
import React from 'react'
import { GAME_HEIGHT, GAME_WIDTH } from '../constants.js'

export const MenuScreen: React.FC = () => (
  <Box
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    width={GAME_WIDTH}
    height={GAME_HEIGHT}
  >
    <Gradient name="rainbow">
      <Text bold>tPong</Text>
    </Gradient>
    <Gradient name="rainbow">
      <Text>─────────────────────</Text>
    </Gradient>
    <Text color="yellow">Controls:</Text>
    <Text>↑ / ↓ : Move paddle</Text>
    <Text>ESC : Exit game</Text>

    <Gradient name="rainbow">
      <Text>─────────────────────</Text>
    </Gradient>

    <Text color="cyan">Press Enter to start</Text>
  </Box>
)
