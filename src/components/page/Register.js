import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import UserApi from '../../api/UserApi';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordCfm: '',
            mess: '',
            fullName: ''
        }
    }

    register = async () => {
        let { username, password, passwordCfm, fullName } = this.state;
        if (username === '' || password === '' || passwordCfm === '' || fullName === '') {
            this.setState({ mess: 'Vui lòng không bỏ trống trường nào!' });
        } else if (password !== passwordCfm) {
            this.setState({ mess: 'Mật khẩu và xác nhận mật khẩu không khớp!' });
        } else {
            let response = await UserApi.register({ user: { username, password, fullName } });
            let rs = await response.json();
            let mes = '';
            mes = rs.code === 200 ? 'Tạo tài khoản thành công!' : rs.message;
            ToastAndroid.show(mes, ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#595c6e' }}>
                <View style={{ backgroundColor: '#686c80', marginHorizontal: 20, paddingHorizontal: 10, paddingVertical: 30 }}>
                    <View style={{ marginBottom: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>
                            ĐĂNG KÝ
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'red' }}>
                            {this.state.mess}
                        </Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.cusLabel}>
                            full name
                        </Text>
                        <TextInput
                            style={style.cusInput}
                            placeholder="Họ & Tên"
                            onChangeText={fullName => this.setState({ fullName })}
                            onTouchStart={() => this.setState({ mess: '' })}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.cusLabel}>
                            username
                        </Text>
                        <TextInput
                            style={style.cusInput}
                            placeholder="Tài khoản"
                            onChangeText={username => this.setState({ username })}
                            onTouchStart={() => this.setState({ mess: '' })}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={style.cusLabel}>
                            password
                        </Text>
                        <TextInput
                            style={style.cusInput}
                            placeholder="Mật khẩu"
                            onChangeText={password => this.setState({ password })}
                            onTouchStart={() => this.setState({ mess: '' })}
                        />
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={style.cusLabel}>
                            password comfirm
                        </Text>
                        <TextInput
                            style={style.cusInput}
                            placeholder="Xác nhận mật khẩu"
                            onChangeText={passwordCfm => this.setState({ passwordCfm })}
                            onTouchStart={() => this.setState({ mess: '' })}
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            onPress={this.register}
                            title="Đăng ký"
                            color="#61d775"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.history.push('/login')}
                        >
                            <Text>
                                Quay lại đăng nhập.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        );
    }
}

const style = StyleSheet.create({
    cusInput: {
        height: 40, paddingLeft: 0,
        color: 'white', paddingBottom: 10,
        borderBottomColor: '#595c6e', borderBottomWidth: 1
    },
    cusLabel: {
        color: 'white', fontSize: 12,
        fontFamily: 'roboto'
    }
});

export default Register;