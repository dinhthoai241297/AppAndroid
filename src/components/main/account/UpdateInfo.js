import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { updateApi } from '../../../actions/UserActions';
import { Redirect } from 'react-router-native';
import { Icon } from 'react-native-elements';

class UpdateInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: ''
        }
    }

    update = () => {
        let { fullName } = this.state;
        if (fullName === '') {
            this.setState({ mes: 'Vui lòng không để trống trường nào!' });
        } else {
            this.props.update({ fullName }, this.props.token).then(res => {
                if (res.code === 200) {
                    ToastAndroid.show('Cập nhật thông tin thành công', ToastAndroid.SHORT);
                    this.backAccount();
                } else {
                    ToastAndroid.show('Có lỗi xảy ra vui lòng thử lại!', ToastAndroid.SHORT);
                }
            });
        }
    }

    backAccount = () => {
        this.props.history.push({
            pathname: '/',
            state: {
                tab: 'account'
            }
        });
    }

    render() {

        let { user } = this.props;
        console.log('UpdateInfo:', user);
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
                        onPress={this.backAccount}
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
                                    Cập nhật thông tin
                        </Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: 'red' }}>
                                    {this.state.mes}
                                </Text>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={style.cusLabel}>
                                    Họ và Tên
                        </Text>
                                <TextInput
                                    style={style.cusInput}
                                    placeholder="Họ & Tên"
                                    onChangeText={fullName => this.setState({ fullName })}
                                    onTouchStart={() => this.setState({ mess: '' })}
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

const mapStateToProp = state => {
    return {
        user: state.UserReducer.user,
        token: state.UserReducer.token
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        update: (user, token) => dispatch(updateApi(user, token))
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(UpdateInfo);