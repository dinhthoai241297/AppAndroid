import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import UpdateProject from './UpdateProject';

class ProjectManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    closeModal = () => {
        this.setState({ modalVisible: false });
        this.props.loadProject();
    }

    render() {

        let { project } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: '#dce1e7' }}>

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
            </View>
        );
    }
}

export default ProjectManage;