import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AddUser from './AddUser';
import Loading from '../../page/Loading';
import ProjectApi from '../../../api/ProjectApi';
import MemberItem from './MemberItem';
import { formatDate } from '../../../custom/Func';
import { connect } from 'react-redux';

class ProjectDes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    genListMember = () => {
        let { members } = this.props;
        let rs = null;
        if (members) {
            rs = members.map((mem, index) => <MemberItem key={index} member={mem} />);
        }
        return rs;
    }

    closeModal = () => {
        this.setState({ modalVisible: false }, this.props.loadProject);
    }

    render() {

        let { project } = this.props;

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#dce1e7'
                }}
            >
                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible} onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                >
                    <AddUser project={project && project.id} members={this.props.members} closeModal={this.closeModal} />
                </Modal>
                {/* /Modal */}

                {/* require project */}
                {project ? <ScrollView style={{ backgroundColor: '#dce1e7' }}>
                    <View style={{
                        backgroundColor: 'white', padding: 40,
                        justifyContent: 'center', alignItems: 'center',
                        marginTop: 5
                    }}>
                        <Icon name='work' color='#018fe5' size={60} />
                        <Text style={{ fontSize: 18 }}>
                            {project.name}
                        </Text>
                        <Text style={{ fontSize: 14, color: '#adadad' }}>
                            {formatDate(project.createdAt)}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {project.owner.fullName}
                        </Text>
                    </View>
                    {/* Description */}
                    <View>
                        {/* label */}
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#7c7c7c' }}>
                                Giới thiệu dự án
                            </Text>
                        </View>
                        <View style={{ padding: 10, backgroundColor: 'white' }}>
                            <Text>
                                {project.description}
                            </Text>
                        </View>
                    </View>
                    {/* member */}
                    <View>
                        {/* label */}
                        <View style={{ padding: 10 }}>
                            <Text style={{ color: '#7c7c7c' }}>
                                Thành viên
                            </Text>
                        </View>
                        {/* list member */}
                        <View style={{ marginBottom: 5 }}>
                            {/* member item */}
                            {this.genListMember()}
                        </View>
                        {/* add member */}
                        {this.props.user.id === project.owner.id && <View style={{
                            paddingHorizontal: 40, paddingVertical: 10, backgroundColor: 'white'
                        }}>
                            <Button
                                onPress={() => this.setState({ modalVisible: true })}
                                title="Thêm thành viên"
                                color="#018fe5"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>}
                    </View>
                </ScrollView> : <Loading />}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}

export default connect(mapStateToProps)(ProjectDes);