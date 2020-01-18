import React from 'react';
import styled from 'styled-components';
import { Paddle } from '../Paddle';
import { Ball } from '../Ball';
import { Scoreboard } from '../Scoreboard';

const PADDLE_HEIGHT = 175;
const PADDLE_WIDTH = 20;

const BALL_DIAMETER = 20;

const BOARD_WIDTH = 1280;
const BOARD_HEIGHT = 720;

const TICK_DURATION = 10;

const GameFieldView = styled.div`
    background-color: #0d0d0d;
    width: ${BOARD_WIDTH}px;
    height: ${BOARD_HEIGHT}px;
`;

export class GameField extends React.Component {
    constructor(props) {
        super(props);

        const startingY = (BOARD_HEIGHT / 2) - (PADDLE_HEIGHT / 2);

        this.state = {
            p1: {
                x: 200,
                y: startingY,
                score: 0,
            },
            p2: {
                x: 1080,
                y: startingY,
                score: 0,
            },
            ball: this._getInitBallState(),
            input: {
                arrowUp: false,
                arrowDown: false,
            },
        };

        this._lastTick = Date.now();
    }

    componentDidMount() {
        document.addEventListener('keydown', this._handleKeyDown, false);
        document.addEventListener('keyup', this._handleKeyUp, false);

        this.tick();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._handleKeyDown, false);
        document.removeEventListener('keyup', this._handleKeyUp, false);
    }

    tick = () => {
        const now = Date.now();
        const elapsed = now - this._lastTick;

        this._lastTick = now;

        if (elapsed > TICK_DURATION) {
            this._applyInputsToPaddles(elapsed);
            this._applyVelocityToBall(elapsed);
        }

        requestAnimationFrame(this.tick);
    }

    _getInitBallState() {
        const left = Math.random() >= 0.5;

        return {
            x: (BOARD_WIDTH / 2) - (BALL_DIAMETER / 2),
            y: (BOARD_HEIGHT / 2) - (BALL_DIAMETER / 2),
            velocity: {
                x: ((Math.random() - 0.5) * 0.25) + (0.5 * (left ? 1 : -1)),
                y: ((Math.random() - 0.5) * 0.25),
            }
        };
    }

    _applyInputsToPaddles = (elapsed) => {
        const { input: { arrowUp, arrowDown } } = this.state;

        elapsed = Math.min(elapsed, 100);

        if (arrowUp || arrowDown) {
            let velocity = 0;

            velocity += arrowUp ? -0.5 : 0;
            velocity += arrowDown ? 0.5 : 0;

            if (velocity !== 0) {
                this.setState((state) => {
                    let { p1 } = state;

                    p1.y += (velocity * elapsed);

                    p1.y = Math.max(0, Math.min(p1.y, BOARD_HEIGHT - PADDLE_HEIGHT));

                    return {
                        p1,
                    };
                });
            }
        }
    }

    _applyVelocityToBall = (elapsed) => {
        elapsed = Math.min(elapsed, 100);

        this.setState((state) => {
            let { ball } = state;

            let nextX = -1;
            let nextY = -1;

            const calcNextXY = () => {
                nextX = ball.x + (ball.velocity.x * elapsed);
                nextY = ball.y + (ball.velocity.y * elapsed);
            };

            calcNextXY();

            if (!this._withinBounds('x', nextX, BALL_DIAMETER)) {
                ball = this._getInitBallState();

                let { p1, p2 } = state;

                if (nextX < 0) {
                    p2.score++;
                }
                else {
                    p1.score++;
                }

                return {
                    ball,
                    p1,
                    p2,
                };
            }

            if (!this._withinBounds('y', nextY, BALL_DIAMETER)) {
                ball.velocity.y = -ball.velocity.y;

                calcNextXY();
            }

            this._handlePaddleCollision(state);

            calcNextXY();

            ball.x = nextX;
            ball.y = nextY;

            return {
                ball,
            };
        });
    }

    _withinBounds(xOrY, pos, gurth) {
        let outerBound = null;

        if (xOrY === 'x') {
            outerBound = BOARD_WIDTH;
        }
        else if (xOrY === 'y') {
            outerBound = BOARD_HEIGHT;
        }
        else {
            throw new Error();
        }

        return pos > 0 && pos <= (outerBound - gurth);
    }

    _handlePaddleCollision(state) {
        const { p1, p2, ball } = state;
        const paddles = [p1, p2];

        const isCollision = () => {
            const ballBounds = {
                left: ball.x,
                right: ball.x + BALL_DIAMETER,
                top: ball.y,
                bottom: ball.y + BALL_DIAMETER,
            };

            return paddles.some((paddle) => {
                const paddleBounds = {
                    left: paddle.x,
                    right: paddle.x + PADDLE_WIDTH,
                    top: paddle.y,
                    bottom: paddle.y + PADDLE_HEIGHT,
                };

                return !(
                    ((ballBounds.right < paddleBounds.left) || (ballBounds.left > paddleBounds.right)) ||
                    ((ballBounds.bottom < paddleBounds.top) || (ballBounds.top > paddleBounds.bottom))
                );
            });
        };

        if (isCollision()) {
            ball.velocity.x = -ball.velocity.x;
        }

        while (isCollision()) {
            ball.x += ball.velocity.x;
        }
    }

    _handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                // Up pressed
                this.setState((state) => {
                    let { input } = state;

                    return {
                        input: {
                            ...input,
                            arrowUp: true,
                        }
                    };
                });
                break;
            case 'ArrowDown':
                // Down pressed
                this.setState((state) => {
                    let { input } = state;

                    return {
                        input: {
                            ...input,
                            arrowDown: true,
                        }
                    };
                });
                break;
        }

        event.preventDefault();
    }

    _handleKeyUp = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                // Up pressed
                this.setState((state) => {
                    let { input } = state;

                    return {
                        input: {
                            ...input,
                            arrowUp: false,
                        }
                    };
                });
                break;
            case 'ArrowDown':
                // Down pressed
                this.setState((state) => {
                    let { input } = state;

                    return {
                        input: {
                            ...input,
                            arrowDown: false,
                        }
                    };
                });
                break;
        }
    }

    render() {
        const { p1, p2, ball } = this.state;

        return (
            <GameFieldView>
                <Scoreboard p1={p1.score} p2={p2.score} />
                <Paddle
                    height={PADDLE_HEIGHT}
                    width={PADDLE_WIDTH}
                    x={p1.x}
                    y={p1.y}
                />
                <Paddle
                    height={PADDLE_HEIGHT}
                    width={PADDLE_WIDTH}
                    x={p2.x}
                    y={p2.y}
                />
                <Ball
                    height={BALL_DIAMETER}
                    width={BALL_DIAMETER}
                    x={ball.x}
                    y={ball.y}
                />
            </GameFieldView>
        );
    }
}
