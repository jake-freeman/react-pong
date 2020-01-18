import React from 'react';
import styled from 'styled-components';
import { Paddle } from '../Paddle';
import { Ball } from '../Ball';

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
                y: startingY,
            },
            p2: {
                y: startingY,
            },
            ball: {
                x: (BOARD_WIDTH / 2) - (BALL_DIAMETER / 2),
                y: (BOARD_HEIGHT / 2) - (BALL_DIAMETER / 2),
                velocity: {
                    x: ((Math.random() - 0.5) * 0.25) + 0.45,
                    y: ((Math.random() - 0.5) * 0.25),
                }
            },
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
                ball.velocity.x = -ball.velocity.x;

                calcNextXY();
            }

            if (!this._withinBounds('y', nextY, BALL_DIAMETER)) {
                ball.velocity.y = -ball.velocity.y;

                calcNextXY();
            }

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
                <Paddle
                    height={PADDLE_HEIGHT}
                    width={PADDLE_WIDTH}
                    x={200}
                    y={p1.y}
                />
                <Paddle
                    height={PADDLE_HEIGHT}
                    width={PADDLE_WIDTH}
                    x={1080}
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
