import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ProgressBarAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import { formatDate } from '../../../custom/Func';
import MemberApi from '../../../api/MemberApi';

const ACCESS = 'Tham gia';
const DENY = 'Từ chối';

class InviteItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            label: ''
        }
    }

    resInvite = async type => {
        let { processing, label } = this.state;
        if (!processing) {
            this.setState({ processing: true });
            let { id } = this.props.invite;
            let rs = type === 1 ? await MemberApi.accessInvite({ id }) : await MemberApi.denyInvite({ id });
            let res = await rs.json();
            if (res && res.code === 200) {
                ToastAndroid.show('Thành công', ToastAndroid.SHORT);
                label = type === 1 ? ACCESS : DENY;
            } else {
                ToastAndroid.show('Thất bại', ToastAndroid.SHORT);
            }
            this.setState({ processing: false, label });
        }
    }

    render() {

        let { invite } = this.props;
        let { label, processing } = this.state;

        return (
            <View style={{
                flex: 1, backgroundColor: 'white',
                marginBottom: 1, flexDirection: 'row'
            }}>
                <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 18 }}>
                        {invite.project.name}
                    </Text>
                    <Text style={{ color: '#adadad' }}>
                        {formatDate(invite.createdAt)}
                    </Text>
                </View>
                {processing ? <ProgressBarAndroid /> : label === '' ? <View style={{ flexDirection: 'row', padding: 10 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.resInvite(2)}
                        >
                            <Icon
                                type='font-awesome'
                                name='times'
                                size={25}
                                color='red'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity
                            onPress={() => this.resInvite(1)}
                        >
                            <Icon
                                type='font-awesome'
                                name='check'
                                size={25}
                                color='#61d775'
                            />
                        </TouchableOpacity>
                    </View>
                </View> : <View style={{
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: label === ACCESS ? '#61d775' : 'red', padding: 10
                }}>
                        <Text style={{ color: 'white' }}>
                            {label}
                        </Text>
                    </View>}
            </View>
        );
    }
}

export default InviteItem;