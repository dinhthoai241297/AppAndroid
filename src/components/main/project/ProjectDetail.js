import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, Modal, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AddUser from './AddUser';

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }


    backProject = () => {
        this.props.history.push('/');
    }

    addMember = () => {

    }

    render() {
        // let id = this.props.params.id;
        console.log(this.props.match.params.id);

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
                    <AddUser toggleModal={() => this.setState({ modalVisible: !this.state.modalVisible })} />
                </Modal>
                {/* /Modal */}

                <View
                    style={{
                        padding: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        elevation: 4,
                        shadowOpacity: 1,
                        shadowColor: 'black',
                        // shadowRadius: 10,
                        // shadowOffset: { width: 10, height: 10 }
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <TouchableOpacity
                            onPress={this.backProject}
                        >
                            <Icon
                                type='font-awesome'
                                name='arrow-left'
                                size={25}
                                color='#adadad'
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#adadad' }}>
                            Dự án
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <ScrollView style={{ backgroundColor: '#dce1e7' }}>
                    <View style={{
                        backgroundColor: 'white', padding: 40,
                        justifyContent: 'center', alignItems: 'center',
                        marginTop: 5
                    }}>
                        <Icon name='work' color='#018fe5' size={60} />
                        <Text style={{ fontSize: 18 }}>
                            Dự án mới
                        </Text>
                        <Text style={{ fontSize: 14, color: '#adadad' }}>
                            16/12/2018
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Phạm Đình Thoại
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
                                this is a test project, this project using sailsjs for api,
                                mongodb for store data, and react native for code android
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
                            <View style={{
                                flexDirection: 'row', marginBottom: 1, backgroundColor: 'white',
                                borderLeftColor: '#018fe5', borderLeftWidth: 5
                            }}>
                                <View style={{ padding: 10, justifyContent: 'space-between', flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon
                                            type='font-awesome' name='user'
                                            color='#313131' size={14}
                                        />
                                        <Text style={{ color: '#313131', marginLeft: 10 }}>
                                            Phạm Đình Thoại
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon
                                            type='font-awesome'
                                            name='clock-o'
                                            color='#313131' size={14}
                                        />
                                        <Text style={{ color: '#313131', marginLeft: 10 }}>
                                            12/12/2018
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: '61d775', justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 10, backgroundColor: '#61d775'
                                    }}
                                >
                                    <Text style={{ color: 'white' }}>
                                        Hoạt động
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* add member */}
                        <View style={{
                            paddingHorizontal: 40, paddingVertical: 10, backgroundColor: 'white'
                        }}>
                            <Button
                                onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                                title="Thêm thành viên"
                                color="#018fe5"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default ProjectDetail;