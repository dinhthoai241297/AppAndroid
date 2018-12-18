import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ProgressBarAndroid } from 'react-native';
import { Icon, Button } from 'react-native-elements';

class AddUserItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adding: false
        }
    }


    addUser = async () => {
        this.setState({ adding: true });
        if (this.props.user.member) {
            ToastAndroid.show('Người dùng này đã được thêm!', ToastAndroid.SHORT);
        } else {
            let rs = await this.props.addUser();
            let res = await rs.json();
            if (res.code === 200) {
                this.props.user.member = true;
                ToastAndroid.show('Mời thành công!', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Có lỗi xảy ra vui lòng thử lại!', ToastAndroid.SHORT);
            }
        }
        this.setState({ adding: false });
    }

    render() {

        let { user } = this.props;
        let color = user.member ? '#adadad' : '#61d775';

        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row', marginBottom: 1, backgroundColor: 'white',
                    borderLeftColor: '#018fe5', borderLeftWidth: 5
                }}>
                    <View style={{ padding: 10, justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                type='font-awesome' name='user'
                                color='#313131' size={14}
                            />
                            <Text style={{ color: '#313131', marginLeft: 10 }}>
                                {user.fullName}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                type='font-awesome'
                                name='clock-o'
                                color='#313131' size={14}
                            />
                            <Text style={{ color: '#313131', marginLeft: 10 }}>
                                {user.username}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        {this.state.adding ? <ProgressBarAndroid styleAttr='Normal' /> : <Button
                            onPress={this.addUser}
                            title="Thêm"
                            backgroundColor={color}
                            color='white'
                            buttonStyle={{ height: 35 }}
                            borderRadius={5}
                            accessibilityLabel="Learn more about this purple button"
                        />}
                    </View>
                </View>
            </View>
        );
    }
}

export default AddUserItem;