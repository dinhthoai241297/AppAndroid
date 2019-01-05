import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, ProgressBarAndroid, ScrollView, ToastAndroid, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import UpdateProject from './UpdateProject';

class ProjectManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            stopping: false
        }
    }

    closeModal = () => {
        this.setState({ modalVisible: false });
        this.props.loadProject();
    }

    stopProject = async () => {
        if (this.props.project.status === 1) {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc rằng muốn kết thúc dự án!',
                [
                    { text: 'Hủy', onPress: () => { }, style: 'cancel' },
                    {
                        text: 'Đồng ý', onPress: async () => {
                            this.setState({ stopping: true });
                            let res = await this.props.stopProject();
                            if (res) {
                                ToastAndroid.show('Dự án kết thúc!', ToastAndroid.SHORT);
                            } else {
                                ToastAndroid.show('Có lỗi xảy ra, vui lòng thử lại!', ToastAndroid.SHORT);
                            }
                            this.setState({ stopping: false });
                        }
                    }
                ]
            );
        }
    }

    render() {

        let { project, user } = this.props;

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#dce1e7' }}>
                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <UpdateProject project={project} closeModal={this.closeModal} />
                </Modal>
                {/* /Modal */}

                {/* label update info */}
                <View style={{ padding: 10 }}>
                    <Text style={{ color: '#7c7c7c' }}>
                        Thông tin
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.setState({ modalVisible: true })}
                >
                    <View style={{
                        padding: 10, backgroundColor: 'white',
                        flexDirection: 'row', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 1
                    }}>
                        <Text>
                            Cập nhật thông tin dự án
                        </Text>
                        <Icon
                            type='font-awesome' name='angle-right'
                            color='#adadad'
                            size={18}
                        />
                    </View>
                </TouchableOpacity>
                {(() => {
                    if (project.owner.id === user.id) {
                        return (
                            <View style={{
                                paddingVertical: 10, paddingHorizontal: 30,
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                                {this.state.stopping ? <ProgressBarAndroid /> : <Button
                                    onPress={this.stopProject}
                                    title={project.status === 1 ? 'Kết thúc dự án' : 'Đã kết thúc'}
                                    color={project.status === 1 ? '#018fe5' : '#adadad'}
                                    accessibilityLabel="Learn more about this purple button"
                                />}
                            </View>
                        );
                    }
                })()}
            </ScrollView>
        );
    }
}

export default ProjectManage;