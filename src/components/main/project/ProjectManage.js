import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class ProjectManage extends Component {
    render() {

        let { project } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: '#dce1e7' }}>
                {/* label update info */}
                <View style={{ padding: 10 }}>
                    <Text style={{ color: '#7c7c7c' }}>
                        Thông tin
                        </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                >
                    <View style={{
                        padding: 10, backgroundColor: 'white',
                        flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 1
                    }}>
                        <Text>
                            Cập nhật thông tin dự án
                        </Text>
                        <Icon
                            type='font-awesome' name='angle-right'
                            color='#adadad'
                            size={18}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ProjectManage;