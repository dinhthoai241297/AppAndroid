import React, { Component } from 'react';
import { Animated, Text, View } from 'react-native';

class Dot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zoomAni: new Animated.Value(15),  // Initial value for opacity: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id === nextProps.index) {
            let { time } = nextProps;
            Animated.timing(                  // Animate over time
                this.state.zoomAni,            // The animated value to drive
                {
                    toValue: 25,                   // Animate to opacity: 1 (opaque)
                    duration: time,              // Make it take a while
                }
            ).start();
            setTimeout(() => {
                Animated.timing(                  // Animate over time
                    this.state.zoomAni,            // The animated value to drive
                    {
                        toValue: 15,                   // Animate to opacity: 1 (opaque)
                        duration: time,              // Make it take a while
                    }
                ).start();
            }, time);
        }
    }

    render() {
        return (
            <Animated.View                 // Special animatable View
                style={{
                    width: this.state.zoomAni,
                    height: this.state.zoomAni,
                    borderRadius: 15,
                    backgroundColor: 'white',
                    marginRight: 8
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default Dot;