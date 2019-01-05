import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Project from './project/Project';
import Task from './task/Task';
import Account from './account/Account';
import Notification from './notification/Notification';
import { Icon } from 'react-native-elements';
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import * as actions from '../../actions/TabAction';

class Main extends Component {

    constructor(props) {
        super(props);
        let selectedTab = this.props.mainTab;
        this.state = {
            selectedTab: selectedTab || 'project'
        }
    }


    changeTab = selectedTab => {
        this.props.changeMainTab(selectedTab);
        this.setState({ selectedTab });
    }

    goTask = () => {
        this.setState({ selectedTab: 'task' });
    }

    goInvite = () => {
        this.props.history.push('/invite');
    }

    render() {

        let { user } = this.props;
        if (!user) {
            return <Redirect to='/login' />
        }
        return (
            <View style={{ flex: 1 }}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'project'}
                        title="Dự án"
                        renderIcon={() => <Icon name='work' color='#717171' />}
                        renderSelectedIcon={() => <Icon name='work' color='#018fe5' />}
                        badgeText=""
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.changeTab('project')}>
                        {<Project />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'task'}
                        title="Việc"
                        renderIcon={() => <Icon type='font-awesome' name='tasks' color='#717171' />}
                        renderSelectedIcon={() => <Icon type='font-awesome' name='tasks' color='#018fe5' />}
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.changeTab('task')}>
                        {<Task />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'notification'}
                        title="Thông báo"
                        renderIcon={() => <Icon name='notifications' color='#717171' />}
                        renderSelectedIcon={() => <Icon name='notifications' color='#018fe5' />}
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.changeTab('notification')}>
                        {<Notification goTask={this.goTask} goInvite={this.goInvite} />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'account'}
                        title="Tôi"
                        renderIcon={() => <Icon type='font-awesome' name='user' color='#717171' />}
                        renderSelectedIcon={() => <Icon type='font-awesome' name='user' color='#018fe5' />}
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.changeTab('account')}>
                        {<Account />}
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navItem: {
        color: '#717171'
    },
    navItemSelected: {
        color: '#018fe5'
    }
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeMainTab: tab => dispatch(actions.changeMainTab(tab))
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        mainTab: state.TabReducer.mainTab
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
