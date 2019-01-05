import React, { Component } from 'react';
import { View, Text, FlatList, ProgressBarAndroid, TextInput } from 'react-native';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import Loading from '../../page/Loading';
import TaskApi from '../../../api/TaskApi';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            refreshing: false,
            key: '',
            modalVisible: false,

            next: false,
            loadMore: false,

            page: 1
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.getList();
        }, 0);
    }

    getList = async () => {
        this.setState({ refreshing: true });
        let emp = this.props.user.id;
        let { key } = this.state;
        let rs = await TaskApi.getList({ emp, page: 1, key });
        let res = await rs.json();
        if (res) {
            let { list } = res.data;
            this.setState({ tasks: list, next: res.data.next });
        }
        this.setState({ refreshing: false, page: 1 });
    }

    getListMore = async () => {
        this.setState({ loadMore: true });
        let emp = this.props.user.id;
        let { next, page, key } = this.state;
        if (next) {
            page++;
            let rs = await TaskApi.getList({ emp, page, key });
            let res = await rs.json();
            if (res) {
                let { list } = res.data;
                this.setState({ tasks: this.state.tasks.concat(list), next: res.data.next, page });
            }
        }
        this.setState({ loadMore: false });
    }

    addTask = task => {
        return TaskApi.addTask({ task });
    }

    report = async (id, report) => {
        let rs = await TaskApi.report({ report, id });
        let res = await rs.json();
        return res;
    }

    render() {
        let { user } = this.props;

        return (

            <View style={{ flex: 1, backgroundColor: '#dce1e7' }}>

                {user ? <View>

                    <FlatList
                        data={this.state.tasks}
                        renderItem={({ item }) => <TaskItem report={this.report} user={user} task={item} />}
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
                        ListHeaderComponent={
                            <View
                                style={{ flex: 1, backgroundColor: 'white', marginBottom: 10 }}
                            >
                                <View style={{ flex: 1, padding: 10 }}>
                                    <TextInput
                                        style={{
                                            flex: 1, backgroundColor: '#f4f4f4',
                                            paddingHorizontal: 10, paddingVertical: 5,
                                            color: '#313131'

                                        }}
                                        placeholder="Tìm kiếm"
                                        onChangeText={key => this.setState({ key })}
                                        onSubmitEditing={this.getList}
                                    />
                                </View>
                            </View>
                        }
                        ListEmptyComponent={
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text>
                                    Không có công việc nào!
                                </Text>
                            </View>
                        }
                    />
                </View> : <Loading />}
            </View>
        );
    }
}

const mapStateToProp = state => {
    return {
        user: state.UserReducer.user
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {

    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Task);