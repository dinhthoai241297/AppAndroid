import React, { Component } from 'react';
import { View, Text, FlatList, ProgressBarAndroid, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import Loading from '../../page/Loading';
import TaskApi from '../../../api/TaskApi';
import AddTask from './AddTask';
import { Icon } from 'react-native-elements';
import { formatDate } from '../../../custom/Func';
import TaskItem from '../task/TaskItem';

class ProjectTask extends Component {

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
        this.getList();
    }

    getList = async () => {
        this.setState({ refreshing: true });
        let { project } = this.props;
        let { key } = this.state;
        let rs = await TaskApi.getList({ project: project.id, page: 1, key });
        let res = await rs.json();
        if (res) {
            let { list } = res.data;
            this.setState({ tasks: list, next: res.data.next });
        }
        this.setState({ refreshing: false, page: 1 });
    }

    getListMore = async () => {
        this.setState({ loadMore: true });
        let { project } = this.props;
        let { next, page, key } = this.state;
        if (next) {
            page++;
            let rs = await TaskApi.getList({ project: project.id, page, key });
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

        let { members, project, user } = this.props;
        let { modalVisible } = this.state;

        return (
            <View style={{ flex: 1, backgroundColor: '#dce1e7' }}>

                {project ? <View>
                    {/* Modal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}
                    >
                        <AddTask addTask={this.addTask}
                            project={project} members={members} user={user}
                            toggleModal={() => this.setState({ modalVisible: !modalVisible })}
                        />
                    </Modal>
                    {/* /Modal */}

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
                                <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
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
                                    {user.id === project.owner.id && <View
                                        style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}
                                    >
                                        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
                                            <Icon
                                                type='font-awesome' name='plus-circle'
                                                color='#018fe5'
                                                size={40}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    }
                                </View>
                            </View>
                        }
                    />
                </View> : <Loading />}
            </View>
        );
    }
}

export default ProjectTask;