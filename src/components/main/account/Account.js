import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import background from '../../../assets/image/background_user.jpg';
import { Button } from 'react-native-elements';
import { logoutApi } from '../../../actions/UserActions';
import { Link } from 'react-router-native';

class Account extends Component {

    componentDidMount() {
        console.log('account didmount');
    }

    render() {
        let { user } = this.props;
        return (
            <ScrollView
                style={{ backgroundColor: '#dce1e7' }}
            >
                <View style={{
                    height: 200,
                    marginBottom: 15
                }}>
                    <ImageBackground
                        source={background}
                        style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}

                    >
                        <View style={{ flexDirection: 'row', margin: 20 }}>
                            <View style={{
                                width: 60, height: 60, backgroundColor: 'green',
                                justifyContent: 'center', alignItems: 'center',
                                borderRadius: 60, borderWidth: 1, borderColor: 'white',
                                marginRight: 10
                            }}>
                                <Icon type='font-awesome' name='user' color='white' size={40} />
                            </View>
                            <View style={{
                                justifyContent: 'space-around'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 18
                                }}>
                                    {user.fullName}
                                </Text>
                                <Text style={{
                                    color: 'white'
                                }}>
                                    Project: 0 | Task: 0
                            </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: '#7c7c7c' }}>
                            Thông tin
                        </Text>
                    </View>
                    <Link to='/updatePassword'
                        style={styles.lItem}
                        underlayColor='#f3f3f3'
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>
                                Đổi mật khẩu
                                </Text>
                            <Icon
                                type='font-awesome' name='angle-right'
                                color='#adadad'
                                size={18}
                            />
                        </View>
                    </Link>
                    <Link to='/update'
                        style={styles.lItem}
                        underlayColor='#f3f3f3'
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>
                                Cập nhật thông tin
                            </Text>
                            <Icon
                                type='font-awesome' name='angle-right'
                                color='#adadad'
                                size={18}
                            />
                        </View>
                    </Link>
                </View>
                <View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: '#7c7c7c' }}>
                            Lời mời
                        </Text>
                    </View>
                    <Link to='/invite'
                        style={styles.lItem}
                        underlayColor='#f3f3f3'
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>
                                Dự án
                            </Text>
                            <Icon
                                type='font-awesome' name='angle-right'
                                color='#adadad'
                                size={18}
                            />
                        </View>
                    </Link>
                </View>
                <View style={{ padding: 20 }}>
                    <Button
                        title='Đăng xuất' onPress={() => this.props.logoutApi(this.props.token)}
                        backgroundColor='#197bce'
                        color='white'
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    lItem: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',
        marginBottom: 1
    }
});

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        token: state.UserReducer.token
    }
}

const mapDispatchToProp = (dispatch, props) => {
    return {
        logoutApi: token => dispatch(logoutApi(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Account);