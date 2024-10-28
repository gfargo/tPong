import { Box, Text, useApp, useInput } from 'ink';
import React, { useEffect, useState } from 'react';
import { BALL_CHAR, PADDLE_HEIGHT } from './constants.js';

export const Pong = ({
	multiplayer,
}: {
	multiplayer: boolean;
}): JSX.Element | null => {
	if (multiplayer) {
		console.log('Two player mode is not implemented yet');
	}

	const {exit} = useApp();
	const [leftScore, setLeftScore] = useState(0);
	const [rightScore, setRightScore] = useState(0);
	const [leftPaddle, setLeftPaddle] = useState(0);
	const [rightPaddle, setRightPaddle] = useState(0);
	const [ballX, setBallX] = useState(40);
	const [ballY, setBallY] = useState(10);
	const [ballDx, setBallDx] = useState(1);
	const [ballDy, setBallDy] = useState(1);
	const [gameOver, setGameOver] = useState(false);
	const [winner, setWinner] = useState('');
	const [ballSpeed, setBallSpeed] = useState(1);
	const [gameState, setGameState] = useState('menu');

	useInput(
		(
			_input: string,
			key: {upArrow: boolean; downArrow: boolean; escape: boolean; return: boolean},
		) => {
			if (gameState === 'menu') {
				if (key.return) {
					setGameState('playing');
				}
			} else if (gameState === 'playing') {
				if (key.upArrow) {
					setLeftPaddle(prev => Math.max(0, prev - 1));
				} else if (key.downArrow) {
					setLeftPaddle(prev => Math.min(17, prev + 1));
				} else if (key.escape) {
					setGameState('menu');
					resetGame();
				}
			} else if (gameState === 'gameOver') {
				if (key.return) {
					setGameState('menu');
					resetGame();
				} else if (key.escape) {
					exit();
				}
			}
		},
	);

	const resetGame = () => {
		setLeftScore(0);
		setRightScore(0);
		setLeftPaddle(0);
		setRightPaddle(0);
		setBallX(40);
		setBallY(10);
		setBallDx(1);
		setBallDy(1);
		setGameOver(false);
		setWinner('');
		setBallSpeed(1);
	};

	useEffect(() => {
		if (gameState !== 'playing') return;

		const timer = setInterval(() => {
			// Update ball position
			setBallX(x => x + ballDx * ballSpeed);
			setBallY(y => y + ballDy * ballSpeed);

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
				setBallSpeed(prev => Math.min(prev + 0.1, 2)); // Increase speed, max 2x
			}

			// Reset ball if it goes out of bounds
			if (ballX < 0) {
				setBallX(40);
				setBallY(10);
				setBallSpeed(1); // Reset speed when scoring
				setRightScore(prev => {
					const newScore = prev + 1;
					if (newScore >= 5) {
						setGameOver(true);
						setWinner('Right');
						setGameState('gameOver');
					}
					return newScore;
				});
			} else if (ballX > 79) {
				setBallX(40);
				setBallY(10);
				setBallSpeed(1); // Reset speed when scoring
				setLeftScore(prev => {
					const newScore = prev + 1;
					if (newScore >= 5) {
						setGameOver(true);
						setWinner('Left');
						setGameState('gameOver');
					}
					return newScore;
				});
			}
		}, 100);

		return () => clearInterval(timer);
	}, [ballDx, ballDy, leftPaddle, rightPaddle, gameOver, ballSpeed, gameState]);

	const renderGame = () => (
		<Box flexDirection="column">
			<Box justifyContent="space-between" width={80}>
				<Text>Left: {leftScore}</Text>
				<Text>Right: {rightScore}</Text>
				<Text>Ball Speed: {ballSpeed.toFixed(1)}x</Text>
			</Box>
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
						if (x === 40) {
							return <Text key={`${x}-${y}`}>|</Text>;
						}
						return <Text key={`${x}-${y}`}> </Text>;
					})}
				</Box>
			))}
		</Box>
	);

	if (gameState === 'menu') {
		return (
			<Box flexDirection="column" alignItems="center" justifyContent="center">
				<Text>Welcome to Pong!</Text>
				<Text>Use Up and Down arrow keys to move the left paddle</Text>
				<Text>Press Enter to start the game</Text>
				<Text>Press Esc to exit during the game</Text>
			</Box>
		);
	}

	if (gameState === 'gameOver') {
		return (
			<Box flexDirection="column" alignItems="center" justifyContent="center">
				<Text>{winner} player wins!</Text>
				<Text>Game Over</Text>
				<Text>Press Enter to return to menu</Text>
				<Text>Press Esc to exit</Text>
			</Box>
		);
	}

	return renderGame();
};

