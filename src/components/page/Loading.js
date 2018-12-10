import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Dot from './Dot';

class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            time: 300
        }
        this.interval;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let { index } = this.state;
            index++;
            index %= 4;
            this.setState({ index });
        }, this.state.time);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        let { index } = this.state;
        return (
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#686c80', justifyContent: 'center', alignItems: 'center' }}>
                <Dot index={index} id={0} time={this.state.time} />
                <Dot index={index} id={1} time={this.state.time} />
                <Dot index={index} id={2} time={this.state.time} />
                <Dot index={index} id={3} time={this.state.time} />
            </View>
        );
    }
}

export default Loading;