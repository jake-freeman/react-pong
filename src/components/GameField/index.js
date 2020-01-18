import React from 'react';
import styled from 'styled-components';
import { Paddle } from '../Paddle';

const PADDLE_HEIGHT = 175;
const PADDLE_WIDTH = 20;

const BOARD_WIDTH = 1280;
const BOARD_HEIGHT = 720;

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
            p1Y: startingY,
            p2Y: startingY,
        };
    }

    render() {
        const { p1Y, p2Y } = this.state;

        return (
            <GameFieldView>
                <Paddle
                    height={PADDLE_HEIGHT}
                    width={PADDLE_WIDTH}
                    x={200}
                    y={p1Y}
                />
                <Paddle
                    height={PADDLE_HEIGHT}
                    width={PADDLE_WIDTH}
                    x={1080}
                    y={p2Y}
                />
            </GameFieldView>
        );
    }
}
