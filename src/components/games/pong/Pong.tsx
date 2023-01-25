/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Ball from './Ball';
import Paddle from './Paddle';
import './pong.scss';
type Difficulty = 'easy' | 'medium' | 'hard';
const Pong: React.FC = () => {
    const [ballX, setBallX] = useState(50);
    const [ballY, setBallY] = useState(50);
    const [paddle1Y, setPaddle1Y] = useState(0);
    const [paddle2Y, setPaddle2Y] = useState(170);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [decaSeconds, setDecaSeconds] = useState(0);
    const [keyPressed, setKeyPressed] = useState('none');
    const [boardDimensions, setBoardDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [accelerationY, setAccelerationY] = useState(1);
    const [accelerationX, setAccelerationX] = useState(1);

    const [difficulty, setDifficulty] = useState<Difficulty>('hard');

    const boardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gameStarted) return;
        if (boardRef.current !== null) {
            setBoardDimensions({
                width: boardRef.current.clientWidth,
                height: boardRef.current.clientHeight,
            });
        }
        const initialTime = Date.now();
        const interval = setInterval(() => {
            const time = Math.floor((Date.now() - initialTime) / 10);
            setDecaSeconds(time);
        }, 10);

        return () => clearInterval(interval);
    }, [gameStarted]);

    useEffect(() => {
        if (!gameStarted) return;

        // Move the ball
        setBallX(ballX + accelerationX);
        setBallY(ballY + accelerationY);

        // invert acceleration
        let increaseX = accelerationX * -1 > 0 ? 0.1 : -0.1;
        let increaseY = accelerationY > 0 ? 0.1 : -0.1;
        if (difficulty === 'hard') {
            increaseX = accelerationX * -1 > 0 ? 0.5 : -0.5;
            increaseY = accelerationY > 0 ? 0.5 : -0.5;
        }

        const newAccelerationX = parseFloat((accelerationX * -1 + increaseX).toFixed(2)); // prettier-ignore
        const newAccelerationY = parseFloat((accelerationY + increaseY).toFixed(2)); // prettier-ignore
        // Check for collision with the paddles
        const collidingRightPaddle = ballX >= boardDimensions.width - 25 && ballY>= paddle2Y-14 && ballY <= paddle2Y + 5 + 60; // prettier-ignore
        const collidingLeftPaddle = ballX <= 15 && ballY >= paddle1Y - 14  && ballY <= paddle1Y + 4 + 60; // prettier-ignore
        if (collidingLeftPaddle || collidingRightPaddle) {
            // apply inverted acceleration
            setBallX(ballX + accelerationX * -1);
            setAccelerationY(newAccelerationY);
            setAccelerationX(newAccelerationX);
        }

        // Check for collision with the top and bottom of the game board
        if (ballY <= 0 || ballY >= boardDimensions.height - 10) {
            // Reverse the y-velocity of the ball
            setBallY(ballY + accelerationY * -1);
            setAccelerationY(accelerationY * -1);
        }

        // Check for scoring
        if (ballX <= 0) {
            setScore2(score2 + 1);
            setBallX(boardDimensions.width / 2 - 5);
            setBallY(boardDimensions.height / 2 - 5);
            setAccelerationX(accelerationX - accelerationX + 1);
            setAccelerationY(accelerationY - accelerationY + 1);
        }

        if (ballX >= boardDimensions.width) {
            setScore1(score1 + 1);
            setBallX(boardDimensions.width / 2 - 5);
            setBallY(boardDimensions.height / 2 - 5);
            setAccelerationX(accelerationX - accelerationX - 1);
            setAccelerationY(accelerationY - accelerationY - 1);
        }
        handleAIMovement(difficulty);
    }, [decaSeconds]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (boardDimensions.width <= 0 && boardDimensions.height <= 0) return;
        if (keyPressed === 'none') return;
        if (keyPressed === 'w') {
            if (paddle1Y <= 0) {
                setPaddle1Y(0);
                return;
            }
            setPaddle1Y(paddle1Y - 10);
        }
        if (keyPressed === 's') {
            if (paddle1Y >= boardDimensions.height - 60) {
                const isUnder = paddle1Y >= boardDimensions.height;
                console.log({ paddle1Y, isUnder, boardDimensions });

                setPaddle1Y(boardDimensions.height - 60);
                return;
            }
            setPaddle1Y(paddle1Y + 10);
        }
        setKeyPressed('none');
    }, [keyPressed]);

    function handleKeyDown(e: KeyboardEvent): void {
        e.preventDefault();

        setKeyPressed(e.key);
    }

    function handleAIMovement(difficulty: Difficulty): void {
        function move(
            direction: 'up' | 'down',
            difficulty: Difficulty
        ): number {
            let speed = 1;
            if (difficulty === 'easy') speed = 2;
            if (difficulty === 'medium') speed = 4;
            if (difficulty === 'hard') speed = 4;
            if (direction === 'up') return paddle2Y - speed;
            if (direction === 'down') return paddle2Y + speed;
            return 0;
        }

        let centered = 30;
        if (difficulty === 'easy') centered = 5;
        if (difficulty === 'medium') centered = 15;
        if (difficulty === 'hard') centered = 22;

        if (accelerationX < 0) {
            if (boardDimensions.height / 2 < paddle2Y + 25) {
                setPaddle2Y(paddle2Y - 1);
                return;
            }
            if (boardDimensions.height / 2 > paddle2Y + 35) {
                setPaddle2Y(paddle2Y + 1);
                return;
            }

            return;
        }

        if (ballY + 5 < paddle2Y + centered) {
            if (move('up', difficulty) <= 0) {
                setPaddle2Y(0);
                return;
            }
            setPaddle2Y(move('up', difficulty));
            return;
        }

        if (ballY + 5 > paddle2Y + 60 - centered) {
            if (move('down', difficulty) >= boardDimensions.height - 60) {
                setPaddle2Y(boardDimensions.height - 60);
                return;
            }
            setPaddle2Y(move('down', difficulty));
        }
    }

    return (
        <div className='h-full w-full'>
            <div className='relative grid h-full w-full grid-rows-[1fr_10fr_1fr] flex-col items-center'>
                <div className='scoreboard flex h-full w-full items-start'>
                    <div className='score flex h-full w-full items-center justify-around bg-blue-600'>
                        <p className='text-6xl'>{score1}</p>
                    </div>
                    <div className='score flex h-full w-full items-center justify-around bg-red-600'>
                        <p className='text-6xl'>{score2}</p>
                    </div>
                </div>
                <div
                    ref={boardRef}
                    onClick={() => !gameStarted && setGameStarted(true)}
                    className='game-board'
                    tabIndex={0}
                >
                    <Paddle y={paddle1Y} right={false} />
                    <Paddle y={paddle2Y} right={true} />
                    <Ball x={ballX} y={ballY} />
                    {!gameStarted && (
                        <div className='absolute top-1/2 flex  h-24 w-full -translate-y-1/2 items-center justify-center bg-green-600'>
                            <p className='text-6xl'>Press To Start</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pong;
