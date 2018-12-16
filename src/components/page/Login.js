import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { loginApi } from '../../actions/UserActions';
// import md5 from 'md5';
import { Redirect } from 'react-router-native';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    login = () => {
        let { username, password } = this.state;
        if (username === '' || password === '') {
            this.setState({ mes: 'Vui lòng không để trống trường nào!' });
        } else {
            // password = md5(passowrd) // product
            this.props.loginApi(username, password).then(res => {
                if (res.code !== 200) {
                    ToastAndroid.show(res.message, ToastAndroid.SHORT);
                }
            });
        }
    }

    render() {

        let { user } = this.props;
        if (user) {
            return <Redirect to="/" />
        }

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#dce1e7' }}>
                    <View style={{ backgroundColor: 'white', marginHorizontal: 20, paddingHorizontal: 10, paddingVertical: 30 }}>
                        <View style={{ marginBottom: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, color: '#313131' }}>
                                ĐĂNG NHẬP
                        </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'red' }}>
                                {this.state.mes}
                            </Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={style.cusLabel}>
                                Tài khoản
                        </Text>
                            <TextInput
                                style={style.cusInput}
                                placeholder="Tài khoản"
                                onChangeText={username => this.setState({ username })}
                                onTouchStart={() => this.setState({ mess: '' })}
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={style.cusLabel}>
                                Mật khẩu
                        </Text>
                            <TextInput
                                style={style.cusInput}
                                placeholder="Mật khẩu"
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                onTouchStart={() => this.setState({ mess: '' })}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Button
                                onPress={this.login}
                                title="Đăng nhập"
                                color="#61d775"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.props.history.push('/register')}
                            >
                                <Text>
                                    Bạn chưa có tài khoản?
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </ScrollView>
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
        user: state.UserReducer.user
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        loginApi: (username, password) => dispatch(loginApi(username, password))
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Login);