import { Box, Text, useApp, useInput } from 'ink';
import React, { useEffect, useState } from 'react';
import {
	BALL_CHAR,
	BALL_SPEED_INCREMENT,
	GAME_HEIGHT,
	GAME_SPEED,
	GAME_WIDTH,
	INITIAL_BALL_POSITION,
	INITIAL_BALL_SPEED,
	LEFT_PADDLE_X,
	MAX_BALL_SPEED,
	PADDLE_HEIGHT,
	RIGHT_PADDLE_X,
	WINNING_SCORE,
} from './constants.js';
import { GameOverScreen } from './GameOverScreen.js';
import { MenuScreen } from './MenuScreen.js';
import { updateAIPaddle } from './PaddleAI.js';

export const Pong = ({
	multiplayer,
}: {
	multiplayer: boolean;
}): JSX.Element | null => {
	const {exit} = useApp();
	const [leftScore, setLeftScore] = useState(0);
	const [rightScore, setRightScore] = useState(0);
	const [leftPaddle, setLeftPaddle] = useState(0);
	const [rightPaddle, setRightPaddle] = useState(0);
	const [ballX, setBallX] = useState(INITIAL_BALL_POSITION.x);
	const [ballY, setBallY] = useState(INITIAL_BALL_POSITION.y);
	const [ballDx, setBallDx] = useState(1);
	const [ballDy, setBallDy] = useState(1);
	const [gameOver, setGameOver] = useState(false);
	const [winner, setWinner] = useState('');
	const [ballSpeed, setBallSpeed] = useState(INITIAL_BALL_SPEED);
	const [gameState, setGameState] = useState('menu');

	useInput(
		(
			input: string,
			key: {
				upArrow: boolean;
				downArrow: boolean;
				escape: boolean;
				return: boolean;
			},
		) => {
			if (gameState === 'menu') {
				if (key.return) {
					setGameState('playing');
				}
			} else if (gameState === 'playing') {
				if (key.upArrow) {
					setLeftPaddle(prev => Math.max(0, prev - 1));
				} else if (key.downArrow) {
					setLeftPaddle(prev =>
						Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev + 1),
					);
				}

				if (multiplayer) {
					if (input === 'w') {
						setRightPaddle(prev => Math.max(0, prev - 1));
					} else if (input === 's') {
						setRightPaddle(prev =>
							Math.min(GAME_HEIGHT - PADDLE_HEIGHT, prev + 1),
						);
					}
				}

				if (key.escape) {
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
		setBallX(INITIAL_BALL_POSITION.x);
		setBallY(INITIAL_BALL_POSITION.y);
		setBallDx(1);
		setBallDy(1);
		setGameOver(false);
		setWinner('');
		setBallSpeed(INITIAL_BALL_SPEED);
	};

	useEffect(() => {
		if (gameState !== 'playing') {
			return;
		}

		const timer = setInterval(() => {
			setBallX(prevX => {
				const newX = prevX + ballDx * ballSpeed;
				if (
					newX <= LEFT_PADDLE_X + 1 &&
					ballY >= leftPaddle &&
					ballY < leftPaddle + PADDLE_HEIGHT
				) {
					setBallDx(prev => -prev);
					return LEFT_PADDLE_X + 2;
				}
				if (
					newX >= RIGHT_PADDLE_X - 1 &&
					ballY >= rightPaddle &&
					ballY < rightPaddle + PADDLE_HEIGHT
				) {
					setBallDx(prev => -prev);
					return RIGHT_PADDLE_X - 2;
				}
				return newX;
			});

			setBallY(prevY => {
				const newY = prevY + ballDy * ballSpeed;
				if (newY <= 0 || newY >= GAME_HEIGHT - 1) {
					setBallDy(prev => -prev);
					return newY <= 0 ? 1 : GAME_HEIGHT - 2;
				}
				return newY;
			});

			// Update AI paddle if not in multiplayer mode
			if (!multiplayer) {
				setRightPaddle(prev => updateAIPaddle(ballY, prev));
			}

			// Increase ball speed on paddle hit
			if (
				(ballX <= LEFT_PADDLE_X + 2 &&
					ballY >= leftPaddle &&
					ballY < leftPaddle + PADDLE_HEIGHT) ||
				(ballX >= RIGHT_PADDLE_X - 2 &&
					ballY >= rightPaddle &&
					ballY < rightPaddle + PADDLE_HEIGHT)
			) {
				setBallSpeed(prev =>
					Math.min(prev + BALL_SPEED_INCREMENT, MAX_BALL_SPEED),
				);
			}

			// Reset ball if it goes out of bounds
			if (ballX < 0) {
				setBallX(INITIAL_BALL_POSITION.x);
				setBallY(INITIAL_BALL_POSITION.y);
				setBallSpeed(INITIAL_BALL_SPEED);
				setRightScore(prev => {
					const newScore = prev + 1;
					if (newScore >= WINNING_SCORE) {
						setGameOver(true);
						setWinner('Right');
						setGameState('gameOver');
					}
					return newScore;
				});
			} else if (ballX > GAME_WIDTH - 1) {
				setBallX(INITIAL_BALL_POSITION.x);
				setBallY(INITIAL_BALL_POSITION.y);
				setBallSpeed(INITIAL_BALL_SPEED);
				setLeftScore(prev => {
					const newScore = prev + 1;
					if (newScore >= WINNING_SCORE) {
						setGameOver(true);
						setWinner('Left');
						setGameState('gameOver');
					}
					return newScore;
				});
			}
		}, GAME_SPEED);

		return () => clearInterval(timer);
	}, [
		ballDx,
		ballDy,
		leftPaddle,
		rightPaddle,
		gameOver,
		ballSpeed,
		gameState,
		multiplayer,
	]);

	const renderGame = () => (
		<Box flexDirection="column">
			<Box justifyContent="space-between" width={GAME_WIDTH}>
				<Text color="cyan">Left: {leftScore}</Text>
				<Text color="yellow">Ball Speed: {ballSpeed.toFixed(1)}x</Text>
				<Text color="magenta">Right: {rightScore}</Text>
			</Box>
			{Array.from({length: GAME_HEIGHT}).map((_, y) => (
				<Box key={y}>
					{Array.from({length: GAME_WIDTH}).map((_, x) => {
						if (Math.round(ballX) === x && Math.round(ballY) === y) {
							return (
								<Text key={`${x}-${y}`} color="yellow">
									{BALL_CHAR}
								</Text>
							);
						}
						if (
							x === LEFT_PADDLE_X &&
							y >= leftPaddle &&
							y < leftPaddle + PADDLE_HEIGHT
						) {
							return (
								<Text key={`${x}-${y}`} color="cyan">
									█
								</Text>
							);
						}
						if (
							x === RIGHT_PADDLE_X &&
							y >= rightPaddle &&
							y < rightPaddle + PADDLE_HEIGHT
						) {
							return (
								<Text key={`${x}-${y}`} color="magenta">
									█
								</Text>
							);
						}
						if (x === GAME_WIDTH / 2) {
							return (
								<Text key={`${x}-${y}`} color="white">
									|
								</Text>
							);
						}
						return <Text key={`${x}-${y}`}> </Text>;
					})}
				</Box>
			))}
			<Box justifyContent="center" width={GAME_WIDTH}>
				<Text color="white">
					{multiplayer ? 'Multiplayer Mode' : 'Single Player Mode'}
				</Text>
			</Box>
		</Box>
	);

	if (gameState === 'menu') {
		return <MenuScreen />;
	}

	if (gameState === 'gameOver') {
		return <GameOverScreen winner={winner} />;
	}

	return renderGame();
};
