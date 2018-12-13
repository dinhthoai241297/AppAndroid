import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ProjectDetail extends Component {
    render() {

        // let id = this.props.params.id;
        console.log(this.props.match.params.id);

        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text>
                    project detail page
                </Text>
            </View>
        );
    }
}

export default ProjectDetail;