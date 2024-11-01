import { GAME_HEIGHT, PADDLE_HEIGHT } from '../constants.js'

export const calculateNextPaddlePosition = (
  ballY: number,
  paddleY: number
): number => {
  const paddleCenter = paddleY + PADDLE_HEIGHT / 2
  if (ballY > paddleCenter) {
    return Math.min(GAME_HEIGHT - PADDLE_HEIGHT, paddleY + 1)
  }

  if (ballY < paddleCenter) {
    return Math.max(0, paddleY - 1)
  }

  return paddleY
}
