import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Task extends Component {
    render() {
        return (
            <View>
                <Text>
                    task page
                </Text>
                <Text>
                </Text>
            </View>
        );
    }
}

const mapStateToProp = state => {
    return {
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Task);