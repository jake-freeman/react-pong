import React from 'react';
import { GameField } from '../GameField';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GameField />
        );
    }
}
