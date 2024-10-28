import { Box, Text, useApp, useInput } from 'ink';
import React, { useEffect, useState } from 'react';
import { BALL_CHAR, PADDLE_HEIGHT } from './constants.js';

export const Pong = () => {
	const {exit} = useApp();
	const [leftPaddle, setLeftPaddle] = useState(0);
	const [rightPaddle, setRightPaddle] = useState(0);
	const [ballX, setBallX] = useState(40);
	const [ballY, setBallY] = useState(10);
	const [ballDx, setBallDx] = useState(1);
	const [ballDy, setBallDy] = useState(1);

	useInput(
		(
			_input: string,
			key: {upArrow: boolean; downArrow: boolean; escape: boolean},
		) => {
			if (key.upArrow) {
				setLeftPaddle(prev => Math.max(0, prev - 1));
			} else if (key.downArrow) {
				setLeftPaddle(prev => Math.min(17, prev + 1));
			} else if (key.escape) {
				exit();
			}
		},
	);

	useEffect(() => {
		const timer = setInterval(() => {
			// Update ball position
			setBallX(x => x + ballDx);
			setBallY(y => y + ballDy);

			// Simple AI for right paddle
			setRightPaddle(prev => {
				if (ballY > prev + PADDLE_HEIGHT / 2) {
					return Math.min(17, prev + 1);
				} else if (ballY < prev + PADDLE_HEIGHT / 2) {
					return Math.max(0, prev - 1);
				}
				return prev;
			});

			// Ball collision with top and bottom
			if (ballY <= 0 || ballY >= 19) {
				setBallDy(dy => -dy);
			}

			// Ball collision with paddles
			if (
				(ballX <= 1 &&
					ballY >= leftPaddle &&
					ballY < leftPaddle + PADDLE_HEIGHT) ||
				(ballX >= 78 &&
					ballY >= rightPaddle &&
					ballY < rightPaddle + PADDLE_HEIGHT)
			) {
				setBallDx(dx => -dx);
			}

			// Reset ball if it goes out of bounds
			if (ballX < 0 || ballX > 79) {
				setBallX(40);
				setBallY(10);
			}
		}, 100);

		return () => clearInterval(timer);
	}, [ballDx, ballDy, leftPaddle, rightPaddle]);

	return (
		<Box flexDirection="column">
			{Array.from({length: 20}).map((_, y) => (
				<Box key={y}>
					{Array.from({length: 80}).map((_, x) => {
						if (x === Math.round(ballX) && y === Math.round(ballY)) {
							return <Text key={`${x}-${y}`}>{BALL_CHAR}</Text>;
						}
						if (x === 0 && y >= leftPaddle && y < leftPaddle + PADDLE_HEIGHT) {
							return <Text key={`${x}-${y}`}>█</Text>;
						}
						if (
							x === 79 &&
							y >= rightPaddle &&
							y < rightPaddle + PADDLE_HEIGHT
						) {
							return <Text key={`${x}-${y}`}>█</Text>;
						}
						return <Text key={`${x}-${y}`}> </Text>;
					})}
				</Box>
			))}
		</Box>
	);
};
