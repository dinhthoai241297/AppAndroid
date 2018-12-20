import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import ProjectTask from './ProjectTask';
import { Link } from 'react-router-native';
import TabNavigator from 'react-native-tab-navigator';
import ProjectDes from './ProjectDes';
import ProjectApi from '../../../api/ProjectApi';
import ProjectManage from './ProjectManage';

class ProjectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'description',
            project: undefined,
            members: []
        }
    }

    componentDidMount() {
        this.loadProject();
    }

    loadProject = async () => {
        let { id } = this.props.match.params;
        if (id) {
            let rs = await ProjectApi.getOne({ id });
            let res = await rs.json();
            if (res) {
                let { project } = res.data;
                let owner = { ...project.owner };
                owner.status = 0;
                let members = [owner, ...project.members];
                this.setState({ project, members });
            }
        }
    }

    changeTab = selectedTab => {
        // this.props.changeMainTab(selectedTab);
        this.setState({ selectedTab });
    }

    render() {
        let { members, project } = this.state;
        let { id } = this.props.user;
        let tmp = members.find(mem => mem.id === id);
        let member = false, owner = false;
        owner = project && project.owner.id == id;
        if (tmp && tmp.status !== 3 && tmp.status !== 4) {
            member = true;
        }

        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        padding: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        elevation: 4,
                        shadowOpacity: 1,
                        shadowColor: 'black',
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Link to='/' component={TouchableOpacity}>
                            <Icon
                                type='font-awesome'
                                name='arrow-left'
                                size={25}
                                color='#adadad'
                            />
                        </Link>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#adadad' }}>
                            Dự án
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>

                {/* tab */}
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'description'}
                        title="Thông tin"
                        renderIcon={() => <Icon name='work' color='#717171' />}
                        renderSelectedIcon={() => <Icon name='work' color='#018fe5' />}
                        badgeText=""
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.changeTab('description')}>
                        {<ProjectDes loadProject={this.loadProject} members={this.state.members} project={this.state.project} />}
                    </TabNavigator.Item>
                    {member && <TabNavigator.Item
                        selected={this.state.selectedTab === 'task'}
                        title="Việc"
                        renderIcon={() => <Icon type='font-awesome' name='tasks' color='#717171' />}
                        renderSelectedIcon={() => <Icon type='font-awesome' name='tasks' color='#018fe5' />}
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.changeTab('task')}>
                        {<ProjectTask user={this.props.user}
                            members={this.state.members}
                            project={this.state.project}
                        />}
                    </TabNavigator.Item>}
                    {owner && <TabNavigator.Item
                        selected={this.state.selectedTab === 'setting'}
                        title="Quản lý"
                        renderIcon={() => <Icon name='notifications' color='#717171' />}
                        renderSelectedIcon={() => <Icon name='notifications' color='#018fe5' />}
                        titleStyle={styles.navItem}
                        selectedTitleStyle={styles.navItemSelected}
                        onPress={() => this.changeTab('setting')}>
                        {<ProjectManage loadProject={this.loadProject} project={this.state.project} />}
                    </TabNavigator.Item>}
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

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}


export default connect(mapStateToProps)(ProjectDetail);