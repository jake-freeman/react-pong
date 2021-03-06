import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaddleView = styled.div.attrs(props => ({
    style: {
        width: `${props.width}px`,
        height: `${props.height}px`,
        left: `${props.x}px`,
        top: `${props.y}px`,
    }
}))`
    background-color: #e0e0e0;
    position: absolute;
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
