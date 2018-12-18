import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { formatDate } from '../../../custom/Func';

class MemberItem extends Component {

    render() {
        let { member } = this.props;
        let { status } = member;
        color = status === 0 ? '#61d775' : status === 1 ? '#61d775' : status === 2 ? '#adadad' : status === 3 ? '#ff5722' : '#ff5722';
        return (
            <View style={{
                flexDirection: 'row', marginBottom: 1, backgroundColor: 'white',
                borderLeftColor: '#018fe5', borderLeftWidth: 5
            }}>
                <View style={{ padding: 10, justifyContent: 'space-between', flex: 3 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            type='font-awesome' name='user'
                            color='#313131' size={14}
                        />
                        <Text style={{ color: '#313131', marginLeft: 10 }}>
                            {member.fullName}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            type='font-awesome'
                            name='clock-o'
                            color='#313131' size={14}
                        />
                        <Text style={{ color: '#313131', marginLeft: 10 }}>
                            {formatDate(member.createdAt)}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10, backgroundColor: color
                    }}
                >
                    <Text style={{ color: 'white' }}>
                        {status === 0 ? 'ADMIN' : status === 1 ? 'Hoạt động' : status === 2 ? 'Đã ngưng' : status === 3 ? 'Đã mời' : 'Xin vào'}
                    </Text>
                </View>
            </View>
        );
    }
}

export default MemberItem;