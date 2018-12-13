import React, { Component } from 'react';
import { View, ProgressBarAndroid } from 'react-native';

class Loading extends Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ProgressBarAndroid />
            </View>
        );
    }
}

export default Loading;