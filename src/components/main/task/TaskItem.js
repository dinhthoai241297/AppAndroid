import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, ProgressBarAndroid, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import { formatDate } from '../../../custom/Func';

const colors = ['', '#adadad', '#61d775', '#ff5722', 'red'];
const labels = ['', 'Đợi', 'Làm', 'Kết thúc', 'Trễ hẹn'];

class TaskItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            report: '',
            loading: false
        }
    }

    report = async () => {
        this.setState({ loading: true, expand: false });
        let { report } = this.state;
        let { id } = this.props.task;
        let res = await this.props.report(id, report);
        if (res.code === 200) {
            this.props.task.status = 3;
            this.props.task.report = report;
            this.props.task.endTime = new Date();
            ToastAndroid.show('Báo cáo thành công!', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('Có lỗi xảy ra!', ToastAndroid.SHORT);
        }
        this.setState({ loading: false });
    }

    render() {

        let { task, user } = this.props;
        let { expand, loading } = this.state;
        let fail = (new Date(task.deadLine)).getTime() < (new Date()).getTime() && task.status !== 3;
        if (fail) {
            task.status = 4;
        }

        return (
            <View style={{ flex: 1, marginBottom: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon type='font-awesome' name='list-alt' color='#313131' size={14} />
                            <Text style={{ color: '#313131', fontSize: 18, marginLeft: 10 }}>
                                {task.name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                type='font-awesome' name='user'
                                color='#313131' size={14}
                            />
                            <Text style={{ color: '#313131', marginLeft: 10 }}>
                                {task.emp.fullName}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Icon
                                type='font-awesome'
                                name='clock-o'
                                color='#adadad' size={14}
                            />
                            <Text style={{ color: '#adadad', fontSize: 12, marginLeft: 10 }}>
                                {formatDate(task.startTime)}
                            </Text>
                            <Text style={{ color: '#adadad', fontSize: 12 }}>
                                {' - '}
                            </Text>
                            <Text style={{ color: '#adadad', fontSize: 12 }}>
                                {formatDate(task.deadLine)}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.setState({ expand: !expand })}
                    >
                        <View style={{
                            padding: 5, width: 100, flex: 1,
                            justifyContent: 'space-between', alignItems: 'center',
                            backgroundColor: colors[task.status], flexDirection: 'row'
                        }}>
                            {loading && <ProgressBarAndroid />}
                            {!loading && <Text style={{ color: 'white', marginRight: 10, fontSize: 16 }}>
                                {labels[task.status]}
                            </Text>}
                            {!loading && <Icon
                                type='font-awesome'
                                name={expand ? 'angle-up' : 'angle-down'}
                                color='white' size={16}
                            />}
                        </View>
                    </TouchableOpacity>
                </View>
                {expand && <View style={{ padding: 10, paddingTop: 0, backgroundColor: 'white', marginBottom: 5 }}>
                    <View>
                        <Text style={{ color: '#adadad' }}>
                            Mô tả
                        </Text>
                        <Text style={{ paddingLeft: 10, color: '#313113', padding: 5, backgroundColor: '#f4f4f4' }}>
                            {task.description}
                        </Text>
                    </View>
                    {task.report ? <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#adadad' }}>
                                Báo cáo
                            </Text>
                            <Text style={{ color: '#adadad' }}>
                                {formatDate(task.endTime)}
                            </Text>
                        </View>
                        <Text style={{ paddingLeft: 10, color: '#313113', padding: 5, backgroundColor: '#f4f4f4' }}>
                            {task.report}
                        </Text>
                    </View> : null}
                    {/* update report */}
                    {(task.status === 2 && task.emp.id === user.id) && <View>
                        <Text style={{ color: '#adadad' }}>
                            Báo cáo
                        </Text>
                        <TextInput
                            style={{
                                height: 80, textAlignVertical: 'top',
                                padding: 5, backgroundColor: '#f4f4f4'
                            }}
                            value={this.state.report}
                            placeholder="Báo cáo"
                            numberOfLines={3}
                            multiline={true}
                            onChangeText={report => this.setState({ report })}
                        />
                        <View style={{ paddingHorizontal: 50, paddingTop: 10 }}>
                            <Button
                                title="Gửi"
                                backgroundColor='#61d775'
                                onPress={this.report}
                                style={{ width: 150 }}
                            />
                        </View>
                    </View>}
                </View>}
            </View>
        );
    }
}

export default TaskItem;