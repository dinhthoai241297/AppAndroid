import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import { formatDate } from '../../../custom/Func';
import MemberApi from '../../../api/MemberApi';

class MemberItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            loading: false
        }
    }

    changeStatus = async () => {
        this.setState({ loading: true });
        let { id, status } = this.props.member;
        let project = this.props.project.id;
        let response = await MemberApi.changeStatus({ id, status, project });
        let res = await response.json();
        if (res.code === 200) {
            if (res.data) {
                this.props.member.status = res.data.member.status;
            } else {
                this.props.member.status = -1;
            }
            this.setState({ show: false });
            this.forceUpdate();
        }
        this.setState({ loading: false });
    }

    show = () => {
        let { project, user, member } = this.props;
        if (project.status === 1 && user.id === project.owner.id && user.id != member.id) {
            this.setState({ show: !this.state.show });
        }
    }

    render() {
        let { member } = this.props;
        let { show, loading } = this.state;
        if (member && member.status === -1) {
            return null;
        }
        let { status } = member;
        let color = status === 0 ? '#61d775' : status === 1 ? '#61d775' : status === 2 ? '#adadad' : status === 3 ? '#ff5722' : '#ff5722';
        let label = status === 1 ? 'Ngừng việc' : status === 3 ? 'Hủy mời' : status === 2 ? 'Tiếp tục' : '';
        return (
            <View>
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
                    <TouchableOpacity
                        onPress={this.show}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10, backgroundColor: color, width: 100
                            }}
                        >
                            <Text style={{ color: 'white' }}>
                                {status === 0 ? 'ADMIN' : status === 1 ? 'Hoạt động' : status === 2 ? 'Đã ngưng' : status === 3 ? 'Đã mời' : 'Xin vào'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {show && <View style={{
                    paddingVertical: 10, paddingHorizontal: 50,
                    marginBottom: 10, backgroundColor: 'white',
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    {loading ? <ProgressBarAndroid /> : <Button
                        onPress={this.changeStatus}
                        title={label}
                        color='#018fe5'
                        accessibilityLabel="Learn more about this purple button"
                    />}
                </View>}
            </View>
        );
    }
}

export default MemberItem;