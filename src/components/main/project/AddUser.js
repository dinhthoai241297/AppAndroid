import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import UserApi from '../../../api/UserApi';

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            page: 1,
            users: [],
            next: false
        }
    }

    search = async () => {
        let { username, page } = this.state;
        let rs = await UserApi.search({ username, page });
        let res = await rs.json();
        if (res) {
            this.setState({ users: res.data.list, next: res.data.next });
            console.log(res.data.list);
        }
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
                        shadowColor: 'black',
                        // shadowRadius: 10,
                        // shadowOffset: { width: 10, height: 10 }
                    }}
                >
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={this.props.toggleModal}
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
                            onSubmitEditing={() => this.search}
                        />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={this.search}
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
                <ScrollView>

                </ScrollView>
            </View>
        );
    }
}

export default AddUser;