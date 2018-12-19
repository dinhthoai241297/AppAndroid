import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, ScrollView, StyleSheet, DatePickerAndroid, Picker, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';

class AddTask extends Component {

    constructor(props) {
        super(props);
        this.init = {
            name: '',
            description: '',
            startTime: undefined,
            deadLine: undefined,
            emp: ''
        }
        this.state = {
            ...this.init
        }
    }

    addTask = async () => {
        let { name, description, startTime, deadLine, emp } = this.state;
        if (name === '' || description === '' || !startTime || !deadLine || emp === '') {
            ToastAndroid.show('Vui lòng không để trống trường nào!', ToastAndroid.SHORT);
        } else {
            let task = {
                name, description, startTime,
                deadLine, emp, owner: this.props.user.id,
                project: this.props.project.id
            }
            let rs = await this.props.addTask(task);
            let res = await rs.json();
            if (res.code === 200) {
                ToastAndroid.show('Thêm công việc thành công!', ToastAndroid.SHORT);
                // this.setState({ ...this.init });
            } else {
                ToastAndroid.show('Thêm công thất bại, vui lòng thử lại sau!', ToastAndroid.SHORT);
            }
        }
        console.log(name, description, startTime, deadLine, emp);
    }

    openDatePicker = async type => {
        let date, { startTime, deadLine } = this.state, today = new Date();
        if (type === 'startTime') {
            date = startTime || today;
        } else {
            date = deadLine || startTime || today;
        }
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let d = new Date(year, month, day);
                this.setState({ [type]: d });
            }

        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    genListMember = () => {
        let rs = null, { members } = this.props;
        if (members) {
            members = members.filter(mem => mem.status === 1 || mem.status === 0);
            rs = members.map((mem, index) => <Picker.Item key={index} label={mem.fullName} value={mem.id} />);
        }
        return rs;
    }

    render() {
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
                        onPress={this.props.toggleModal}
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
                                    Thêm Công việc
                                </Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'red' }}>
                                    {this.state.mes}
                                </Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={style.cusLabel}>
                                    Tên công việc
                                </Text>
                                <TextInput
                                    value={this.state.name}
                                    style={style.cusInput}
                                    placeholder="Tên công việc"
                                    onChangeText={name => this.setState({ name })}
                                />
                            </View>
                            <View style={{ marginBottom: 10, borderBottomColor: '#adadad', borderBottomWidth: 1 }}>
                                <Text style={style.cusLabel}>
                                    Thành viên
                                </Text>
                                <Picker
                                    prompt='Người thực hiện'
                                    selectedValue={this.state.emp}
                                    style={{ height: 40, paddingLeft: 0, color: '#313131' }}
                                    onValueChange={(emp, itemIndex) => this.setState({ emp })}
                                >
                                    <Picker.Item label='Người thực hiện' value='' />
                                    {this.props.members && this.genListMember()}
                                </Picker>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={style.cusLabel}>
                                    Bắt đầu
                            </Text>
                                <TouchableOpacity onPress={() => this.openDatePicker('startTime')}>
                                    <TextInput
                                        style={style.cusInput}
                                        editable={false}
                                        placeholder="Bắt đầu"
                                        value={this.state.startTime ? this.state.startTime.toDateString() : ''}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={style.cusLabel}>
                                    Deadline
                                </Text>
                                <TouchableOpacity onPress={() => this.openDatePicker('deadLine')}>
                                    <TextInput
                                        style={style.cusInput}
                                        editable={false}
                                        placeholder="Deadline"
                                        value={this.state.deadLine ? this.state.deadLine.toDateString() : ''}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={style.cusLabel}>
                                    Mô tả công việc
                                </Text>
                                <TextInput
                                    style={{ ...style.cusInput, height: 80, textAlignVertical: 'top' }}
                                    value={this.state.description}
                                    placeholder="Mô tả công việc"
                                    numberOfLines={3}
                                    multiline={true}
                                    onChangeText={description => this.setState({ description })}
                                />
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Button
                                    onPress={this.addTask}
                                    title="Thêm công việc"
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

export default AddTask;