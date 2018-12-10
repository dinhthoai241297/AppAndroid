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

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'project'
        }
    }

    componentDidMount() {
        let selectedTab = this.props.location.state && this.props.location.state.tab;
        if (selectedTab) {
            this.setState({ selectedTab });
        }
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
                        renderSelectedIcon={() => <Icon name='work' color='#197bce' />}
                        badgeText=""
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.setState({ selectedTab: 'project' })}>
                        {<Project />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'task'}
                        title="Việc"
                        renderIcon={() => <Icon type='font-awesome' name='tasks' color='#717171' />}
                        renderSelectedIcon={() => <Icon type='font-awesome' name='tasks' color='#197bce' />}
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.setState({ selectedTab: 'task' })}>
                        {<Task />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'notification'}
                        title="Thông báo"
                        renderIcon={() => <Icon name='notifications' color='#717171' />}
                        renderSelectedIcon={() => <Icon name='notifications' color='#197bce' />}
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.setState({ selectedTab: 'notification' })}>
                        {<Notification />}
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'account'}
                        title="Tôi"
                        renderIcon={() => <Icon type='font-awesome' name='user' color='#717171' />}
                        renderSelectedIcon={() => <Icon type='font-awesome' name='user' color='#197bce' />}
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.setState({ selectedTab: 'account' })}>
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
        color: '#197bce'
    }
});

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}

export default connect(mapStateToProps)(Main);
