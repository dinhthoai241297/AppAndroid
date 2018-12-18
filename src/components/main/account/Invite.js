import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import MemberApi from '../../../api/MemberApi';
import { connect } from 'react-redux';
import InviteItem from './InviteItem';

class Invite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            page: 1,
            invites: [],
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
        let user = this.props.user.id;
        let rs = await MemberApi.getListInvite({ user, page: 1 });
        let res = await rs.json();
        if (res) {
            let { list } = res.data;
            this.setState({ invites: list, next: res.data.next });
        }
        this.setState({ refreshing: false, page: 1 });
    }

    getListMore = async () => {
        this.setState({ loadMore: true });
        let { page, next } = this.state;
        if (next) {
            page++;
            let user = this.props.user.id;
            let rs = await MemberApi.getListInvite({ page, user });
            let res = await rs.json();
            if (res) {
                let { list } = res.data;
                this.setState({ invites: list, next: res.data.next });
            }
        }
        this.setState({ loadMore: false });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#dce1e7'
            }}>
                <View
                    style={{
                        padding: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        elevation: 4,
                        shadowOpacity: 1,
                        shadowColor: 'black'
                    }}
                >
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.history.push('/')}
                        >
                            <Icon
                                type='font-awesome'
                                name='arrow-left'
                                size={25}
                                color='#adadad'
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* label user */}
                <View style={{ padding: 10 }}>
                    <Text style={{ color: '#7c7c7c' }}>
                        Lời mời
                    </Text>
                </View>

                {/* list user */}
                <FlatList
                    data={this.state.invites}
                    renderItem={({ item }) => <InviteItem invite={item} />}
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

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}

export default connect(mapStateToProps)(Invite);