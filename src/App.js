import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { NativeRouter, Route, BackButton } from 'react-router-native';
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
import AddProject from './components/main/project/AddProject';
import ProjectDetail from './components/main/project/ProjectDetail';

const { width, height } = Dimensions.get('window');

// #dce1e7 main background - xám
// #018fe5 header - selected - xanh dương
// #8bccf3 unselect - xanh dương lạt
// #f4f4f4 background input,select... - xám
// #61d775 button - xanh lá
// #7c7c7c màu label - xám đậm

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: false });
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('@token');
        if (token) {
            this.setState({ loading: true });
            let response = await UserApi.loginToken({ token });
            let res = await response.json();
            if (res && res.code === 200) {
                let { user } = res.data;
                this.props.loginState({ token, user });
            } else {
                AsyncStorage.setItem('@token', null);
                this.setState({ loading: false });
            }
        } else {
            this.setState({ loading: false });
        }
    }

    render() {

        console.log(this.state.loading);

        return (
            <NativeRouter>
                <BackButton>
                    {this.state.loading ? <Loading /> : <View style={{ flex: 1, zIndex: 1 }}>
                        <Route exact path="/" component={Main} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/update" component={UpdateInfo} />
                        <Route path="/updatePassword" component={UpdatePassword} />
                        <Route path="/addProject" component={AddProject} />
                        <Route path="/projectDetail/:id" component={ProjectDetail} />
                    </View>}
                </BackButton>
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