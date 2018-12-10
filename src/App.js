import React, { Component } from 'react';
import { View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import Main from './components/main/Main';
import Login from './components/page/Login';
import Register from './components/page/Register';
import Loading from './components/page/Loading';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import UserApi from './api/UserApi';
import { loginState } from './actions/UserActions';
import UpdateInfo from './components/main/account/UpdateInfo';
import UpdatePassword from './components/main/account/UpdatePassword';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false });
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('@token');
        if (token) {
            this.setState({ loading: true });
            UserApi.loginToken({ token })
                .then(response => response.json())
                .then(res => {
                    if (res.code === 200) {
                        let { user } = res.data;
                        this.props.loginState({ token, user });
                    } else if (res.code === 101) {
                        AsyncStorage.setItem('@token', null);
                        this.props.loginState({ token: null, user: null });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {

        return (
            <NativeRouter>
                {this.state.loading ? <Loading /> : <View style={{ flex: 1 }}>
                    <Route exact path="/" component={Main} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/update" component={UpdateInfo} />
                    <Route path="/updatePassword" component={UpdatePassword} />
                </View>}
            </NativeRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        loginState: data => dispatch(loginState(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);