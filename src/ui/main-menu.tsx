import { Box, Text } from 'ink'
import Gradient from 'ink-gradient'
import React from 'react'
import { GAME_HEIGHT, GAME_WIDTH, TITLE_ART } from '../constants.js'

export function MenuScreen() {
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      borderStyle={'round'}
      borderDimColor
      padding={1}
      paddingX={3}
    >
      <Box marginBottom={1}>
        <Gradient name="summer">
          <Text bold>{TITLE_ART}</Text>
        </Gradient>
      </Box>
      <Box marginTop={1}>
        <Text color="yellow">Press Enter to start</Text>
      </Box>

      <Box
        marginTop={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Text dimColor>Controls:</Text>
        <Text dimColor>↑ / ↓ : Move paddle</Text>
        <Text dimColor>ESC : Exit game</Text>
      </Box>
    </Box>
  )
}
