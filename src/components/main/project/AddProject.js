import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ToastAndroid, DatePickerAndroid, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import { Icon } from 'react-native-elements';
import ProjectApi from '../../../api/ProjectApi';
import { formatDate } from '../../../custom/Func';

class AddProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            endTime: undefined,
            name: '',
            description: ''
        }
    }

    backProject = () => {
        this.props.history.push({
            pathname: '/',
            state: {
                tab: 'project'
            }
        });
    }

    addProject = () => {
        let { name, endTime, description } = this.state;
        ProjectApi.addProject({
            project: {
                name, endTime, description
            },
            token: this.props.token
        }).then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    ToastAndroid.show('Tạo project thành công!', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Có lỗi xảy ra vui lòng thử lại!', ToastAndroid.SHORT);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    openDatePicker = async () => {
        let { endTime } = this.state;
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: endTime
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ endTime: new Date(year, month, day) });
            }

        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {

        let { user } = this.props;
        if (!user) {
            return <Redirect to='/login' />
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#dce1e7' }}>
                <View
                    style={{
                        padding: 10,
                        backgroundColor: 'white',
                        alignItems: 'flex-start',
                        elevation: 4,
                        shadowOpacity: 1,
                        shadowColor: 'black'
                    }}
                >
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
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#dce1e7' }}>
                        <View style={{ backgroundColor: 'white', marginHorizontal: 20, paddingHorizontal: 10, paddingVertical: 30 }}>
                            <View style={{ marginBottom: 10, alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: '#313131' }}>
                                    Thêm dự án
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'red' }}>
                                    {this.state.mes}
                                </Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={style.cusLabel}>
                                    Tên dự án
                            </Text>
                                <TextInput
                                    style={style.cusInput}
                                    placeholder="Tên dự án"
                                    onChangeText={name => this.setState({ name })}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={style.cusLabel}>
                                    Dự kiến hoành thành
                                </Text>
                                <TouchableOpacity onPress={this.openDatePicker}>
                                    <TextInput
                                        style={style.cusInput}
                                        editable={false}
                                        placeholder="Hoàn thành"
                                        value={this.state.endTime ? formatDate(this.state.endTime) : ''}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={style.cusLabel}>
                                    Mô tả dự án
                            </Text>
                                <TextInput
                                    style={{ ...style.cusInput, height: 80, textAlignVertical: 'top' }}
                                    placeholder="Mô tả dự án"
                                    numberOfLines={3}
                                    multiline={true}
                                    onChangeText={description => this.setState({ description })}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Button
                                    onPress={this.addProject}
                                    title="Thêm dự án"
                                    color="#61d775"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const style = StyleSheet.create({
    cusInput: {
        height: 40, paddingLeft: 0,
        color: '#313131', paddingBottom: 10,
        borderBottomColor: '#adadad', borderBottomWidth: 1
    },
    cusLabel: {
        color: '#313131', fontSize: 12
    }
});

const mapStateToProp = state => {
    return {
        user: state.UserReducer.user,
        token: state.UserReducer.token
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(AddProject);