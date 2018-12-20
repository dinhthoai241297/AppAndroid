import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { formatDate } from '../../../custom/Func';

class NotificationItem extends Component {
    render() {

        let { notification } = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', marginBottom: 1 }}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        type='font-awesome'
                        name='circle' size={14}
                        color={notification.status === 2 ? '#61d775' : '#adadad'}
                    />
                </View>
                <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                    <Icon
                        type='font-awesome' name='plus-circle'
                        color='#313131'
                        size={40}
                    />
                </View>
                <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>
                            {notification.notiType === 1 ? 'Lời mời' : 'Nhiệm vụ'}
                        </Text>
                        <Text>
                            {formatDate(notification.createdAt)}
                        </Text>
                    </View>
                    <Text style={{ color: '#7c7c7c' }}>
                        {notification.notification}
                    </Text>
                </View>
            </View>
        );
    }
}

export default NotificationItem;