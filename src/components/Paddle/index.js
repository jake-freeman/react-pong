import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaddleView = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: #e0e0e0;
    position: absolute;
    left: ${props => props.x}px;
    top: ${props => props.y}px;
`;

export class Paddle extends React.Component {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }

    render() {
        return (
            <PaddleView {...this.props} />
        );
    }
}
