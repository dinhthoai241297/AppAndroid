import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import UserApi from '../../../api/UserApi';
import MemberApi from '../../../api/MemberApi';
import AddUserItem from './AddUserItem';

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            page: 1,
            users: [],
            next: false,
            refreshing: false,
            loadMore: false
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = async () => {
        this.setState({ refreshing: true });
        let { username } = this.state;
        let rs = await UserApi.getList({ username, page: 1 });
        let res = await rs.json();
        if (res) {
            let { list } = res.data;
            let { members } = this.props;
            for (let i = 0; i < list.length; i++) {
                let tmp = members.find(mem => mem.id === list[i].id);
                if (tmp) {
                    list[i].member = true;
                } else {
                    list[i].member = false;
                }
            }
            this.setState({ users: list, next: res.data.next });
        }
        this.setState({ refreshing: false, page: 1 });
    }

    getListMore = async () => {
        this.setState({ loadMore: true });
        let { username, page, next } = this.state;
        if (next) {
            page++;
            let rs = await UserApi.getList({ username, page });
            let res = await rs.json();
            if (res) {
                let { list } = res.data;
                let { members } = this.props;
                for (let i = 0; i < list.length; i++) {
                    let tmp = members.find(mem => mem.id === list[i].id);
                    if (tmp) {
                        list[i].member = true;
                    } else {
                        list[i].member = false;
                    }
                }
                this.setState({ users: this.state.users.concat(list), next: res.data.next, page });
            }
        }
        this.setState({ loadMore: false });
    }

    addUser = user => {
        let { project } = this.props;
        return MemberApi.invite({ project, user });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#dce1e7'
            }}>
                <View
                    style={{
                        paddingVertical: 5, paddingHorizontal: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        elevation: 4,
                        shadowOpacity: 1,
                        shadowColor: 'black'
                    }}
                >
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={this.props.closeModal}
                        >
                            <Icon
                                type='font-awesome'
                                name='arrow-left'
                                size={25}
                                color='#adadad'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 1, paddingHorizontal: 10, height: 35, justifyContent: 'center'
                    }}>
                        <TextInput
                            style={{
                                flex: 1, backgroundColor: '#f4f4f4',
                                color: '#313131', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, height: 35
                            }}
                            placeholder="Tìm kiếm"
                            onChangeText={username => this.setState({ username })}
                            onSubmitEditing={this.getList}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={this.getList}
                        >
                            <Icon
                                type='font-awesome'
                                name='search'
                                size={25}
                                color='#adadad'
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* label user */}
                <View style={{ padding: 10 }}>
                    <Text style={{ color: '#7c7c7c' }}>
                        Kết quả tìm kiếm
                    </Text>
                </View>

                {/* list user */}
                <FlatList
                    data={this.state.users}
                    renderItem={({ item }) => <AddUserItem addUser={() => this.addUser(item.id)} user={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.getListMore}
                    onEndReachedThreshold={0.1}
                    onRefresh={this.getList}
                    refreshing={this.state.refreshing}
                    ListFooterComponent={
                        this.state.loadMore && <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <ProgressBarAndroid />
                        </View>
                    }
                />
            </View>
        );
    }
}

export default AddUser;