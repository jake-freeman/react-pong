import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BOARD_WIDTH = 1280;
const BOARD_HEIGHT = 200;

const ScoreboardView = styled.div`
    width: ${BOARD_WIDTH}px;
    height: ${BOARD_HEIGHT}px;
    position: absolute;
`;

export class Scoreboard extends React.Component {
    static propTypes = {
        p1: PropTypes.number,
        p2: PropTypes.number,
    }

    static defaultProps = {
        p1: 0,
        p2: 0,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScoreboardView>

            </ScoreboardView>
        );
    }
}
