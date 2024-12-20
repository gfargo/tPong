import { Box, Text } from 'ink'
import React from 'react'
import { GAME_HEIGHT, GAME_WIDTH } from '../constants.js'

type GameOverScreenProperties = {
  readonly winner: string
}

export function GameOverScreen({ winner }: GameOverScreenProperties) {
  return (
    <Box
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
    >
      <Text bold color="red">
        Game Over
      </Text>
      <Text>─────────────────────</Text>
      <Text color="green">{winner} player wins!</Text>
      <Text>─────────────────────</Text>
      <Text color="yellow">Press Enter to return to menu</Text>
      <Text color="yellow">Press Esc to exit</Text>
    </Box>
  )
}
