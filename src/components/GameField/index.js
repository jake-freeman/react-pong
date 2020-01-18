import React from 'react';
import styled from 'styled-components';
import { Paddle } from '../Paddle';

const PADDLE_HEIGHT = 175;
const PADDLE_WIDTH = 20;

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
                x: 0,
                y: 0,
                velocity: {
                    x: 0,
                    y: 0,
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
        }

        requestAnimationFrame(this.tick);
    }

    _applyInputsToPaddles = (elapsed) => {
        const { input: { arrowUp, arrowDown } } = this.state;

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
        const { p1, p2 } = this.state;

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
            </GameFieldView>
        );
    }
}
