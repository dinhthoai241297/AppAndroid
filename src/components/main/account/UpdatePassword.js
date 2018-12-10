import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { updatePasswordApi } from '../../../actions/UserActions';
import { Redirect } from 'react-router-native';
import { Icon } from 'react-native-elements';
import md5 from 'md5';

class UpdateInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordOld: '',
            passwordNew: '',
            passwordNewCfm: ''
        }
    }

    update = () => {
        let { passwordOld, passwordNew, passwordNewCfm } = this.state;
        if (passwordOld === '' || passwordNew === '' || passwordNewCfm === '') {
            this.setState({ mes: 'Vui lòng không để trống trường nào!' });
        } else if (passwordNew !== passwordNewCfm) {
            this.setState({ mes: 'Mật khẩu và xác nhận mật khẩu không khớp!' });
        } else {
            this.props.update(md5(passwordOld), md5(passwordNew), this.props.token).then(res => {
                console.log('update password:', res);
                if (res.code === 200) {
                    ToastAndroid.show('Cập nhật mật khẩu thành công!', ToastAndroid.SHORT);
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
            <View style={{ flex: 1, backgroundColor: '#595c6e' }}>
                <View
                    style={{
                        padding: 10,
                        backgroundColor: '#686c80',
                        alignItems: 'flex-start'
                    }}
                >
                    <TouchableOpacity
                        onPress={this.backAccount}
                    >
                        <Icon
                            type='font-awesome'
                            name='arrow-left'
                            size={25}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: '#595c6e' }}>
                    <View style={{ backgroundColor: '#686c80', marginHorizontal: 20, paddingHorizontal: 10, paddingVertical: 30 }}>
                        <View style={{ marginBottom: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>
                                Thay đổi mật khẩu
                        </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'red' }}>
                                {this.state.mes}
                            </Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={style.cusLabel}>
                                Mật khẩu cũ
                            </Text>
                            <TextInput
                                style={style.cusInput}
                                placeholder="Mật khẩu cũ"
                                onChangeText={passwordOld => this.setState({ passwordOld })}
                                onTouchStart={() => this.setState({ mess: '' })}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={style.cusLabel}>
                                Mật khẩu mới
                            </Text>
                            <TextInput
                                style={style.cusInput}
                                placeholder="Mật khẩu mới"
                                onChangeText={passwordNew => this.setState({ passwordNew })}
                                onTouchStart={() => this.setState({ mess: '' })}
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={style.cusLabel}>
                                Xác nhận mật khẩu mới
                            </Text>
                            <TextInput
                                style={style.cusInput}
                                placeholder="Xác nhận mật khẩu mới"
                                onChangeText={passwordNewCfm => this.setState({ passwordNewCfm })}
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

const mapStateToProp = state => {
    return {
        user: state.UserReducer.user,
        token: state.UserReducer.token
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        update: (passwordOld, passwordNew, token) => dispatch(updatePasswordApi(passwordOld, passwordNew, token))
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(UpdateInfo);