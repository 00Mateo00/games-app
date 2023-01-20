import React, { useState, useEffect } from 'react';
import Ball from './Ball';
import Paddle from './Paddle';
import './pong.scss';

const Pong: React.FC = () => {
    const [ballX, setBallX] = useState(50);
    const [ballY, setBallY] = useState(50);
    const [paddle1Y, setPaddle1Y] = useState(250);
    const [paddle2Y, setPaddle2Y] = useState(250);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [decaSeconds, setDecaSeconds] = useState(0);

    useEffect(() => {
        if (!gameStarted) return;
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
        setBallX(ballX + 1);
        setBallY(ballY + 1);

        // Check for collision with the paddles
        if (ballX <= 15 && ballY >= paddle1Y && ballY <= paddle1Y + 50) {
            // Reverse the x-velocity of the ball
            setBallX(25);
        }

        if (ballX >= 585 && ballY >= paddle2Y && ballY <= paddle2Y + 50) {
            // Reverse the x-velocity of the ball
            setBallX(565);
        }

        // Check for collision with the top and bottom of the game board
        if (ballY <= 0 || ballY >= 390) {
            // Reverse the y-velocity of the ball
            setBallY(ballY * -1);
        }

        // Check for scoring
        if (ballX <= 0) {
            setScore2(score2 + 1);
            setBallX(300);
            setBallY(200);
        }

        if (ballX >= 600) {
            setScore1(score1 + 1);
            setBallX(300);
            setBallY(200);
        }
    }, [decaSeconds]);

    return (
        <div>
            <div className='scoreboard'>
                <div className='score'>{score1}</div>
                <div className='score'>{score2}</div>
            </div>
            <div
                className='game-board'
                onMouseMove={(e) => setPaddle1Y(e.clientY)}
                onKeyDown={(e) => {
                    if (e.keyCode === 38) {
                        setPaddle2Y(paddle2Y - 20);
                    } else if (e.keyCode === 40) {
                        setPaddle2Y(paddle2Y + 20);
                    }
                }}
                tabIndex={0}
            >
                <Paddle y={paddle2Y} right={false} />
                <Paddle y={paddle2Y} right={true} />
                <Ball x={ballX} y={ballY} />
            </div>
            <button onClick={() => setGameStarted(!gameStarted)}>
                {gameStarted ? 'Stop' : 'Start'}
            </button>
        </div>
    );
};

export default Pong;
