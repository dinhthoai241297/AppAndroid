import React, { Component } from 'react';
import { View, Text, FlatList, ProgressBarAndroid } from 'react-native';
import NotificationApi from '../../../api/NotificationApi';
import NotificationItem from './NotificationItem';
import { connect } from 'react-redux';

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            refreshing: false,
            modalVisible: false,

            next: false,
            loadMore: false,

            page: 1
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = async () => {
        this.setState({ refreshing: true });
        let user = this.props.user.id;
        let rs = await NotificationApi.getList({ page: 1, user });
        let res = await rs.json();
        if (res) {
            console.log(res);
            let { list } = res.data;
            this.setState({ notifications: list, next: res.data.next });
        }
        this.setState({ refreshing: false, page: 1 });
    }

    getListMore = async () => {
        this.setState({ loadMore: true });
        let user = this.props.user.id;
        let { page, next } = this.state;
        if (next) {
            page++;
            let rs = await NotificationApi.getList({ page, user });
            let res = await rs.json();
            if (res) {
                let { list } = res.data;
                this.setState({ notifications: this.state.tasks.concat(list), next: res.data.next, page });
            }
        }
        this.setState({ loadMore: false });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#dce1e7' }}>
                <View style={{
                    padding: 10, justifyContent: 'center',
                    alignItems: 'center', backgroundColor: 'white', marginBottom: 10,
                    elevation: 4, shadowOpacity: 1, shadowColor: 'black'
                }}>
                    <Text style={{ color: '#313131', fontSize: 18 }}>
                        THÔNG BÁO
                    </Text>
                </View>
                <FlatList
                    data={this.state.notifications}
                    renderItem={({ item }) => <NotificationItem notification={item} />}
                    onEndReached={this.getListMore}
                    keyExtractor={(item, index) => index.toString()}
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

export default connect(mapStateToProps)(Notification);