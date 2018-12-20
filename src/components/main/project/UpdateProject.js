import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button, DatePickerAndroid, ToastAndroid } from 'react-native';
import { formatDate } from '../../../custom/Func';
import { Icon } from 'react-native-elements';
import ProjectApi from '../../../api/ProjectApi';

class UpdateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            endTime: undefined
        }
    }

    componentDidMount() {
        let { name, description, endTime } = this.props.project;
        endTime = new Date(endTime);
        this.setState({ name, description, endTime });
    }

    openDatePicker = async () => {
        let { endTime } = this.state;
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: endTime || new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ endTime: new Date(year, month, day) });
            }

        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    update = async () => {
        let { name, description, endTime } = this.state;
        let { id } = this.props.project;
        let rs = await ProjectApi.update({ id, name, description, endTime });
        let res = await rs.json();
        if (res && res.code === 200) {
            ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('Cập nhật thất bại vui lòng thử lại sau!', ToastAndroid.SHORT);
        }
    }

    render() {

        let { name, description, endTime } = this.state;

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
                        onPress={this.props.closeModal}
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
                                    Cập nhật dự án
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
                                    onTouchStart={() => this.setState({ mess: '' })}
                                    value={name}
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
                                        value={endTime ? formatDate(endTime) : ''}
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
                                    value={description}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Button
                                    onPress={this.update}
                                    title="Cập nhật"
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

export default UpdateProject;