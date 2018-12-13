import React, { Component } from 'react';
import { View, Text, FlatList, Picker, TouchableOpacity } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import ProjectItem from './ProjectItem';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import * as projectActions from '../../../actions/ProjectActions';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: 'all',
            status: 0,
            key: '',
            page: 1
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        this.loadListProject();
    }

    goAddProject = () => {
        this.props.history.push('/addProject');
    }

    loadListProject = () => {
        let { key, project, status, page } = this.state;
        this.props.loadListProject(key, project, status, page, this.props.user.id);
    }

    handleChangeStatus = status => {
        this.setState({
            page: 1, status
        }, this.loadListProject);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#adadad' }}>
                <FlatList
                    data={this.props.data.projects}
                    renderItem={({ item }) => <ProjectItem project={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <View
                            style={{ flex: 1, backgroundColor: 'white', marginBottom: 10 }}
                        >
                            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                                <SearchBar
                                    containerStyle={{
                                        backgroundColor: 'white', borderBottomWidth: 0,
                                        borderTopWidth: 0, flex: 1,
                                        padding: 0, margin: 0
                                    }}
                                    inputStyle={{
                                        backgroundColor: '#adadad', color: 'white',
                                        margin: 8, height: 40
                                    }}
                                    icon={{ type: 'font-awesome', name: 'search' }}
                                    placeholder='Tìm kiếm' />
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 8 }}
                                >
                                    <Link to='/addProject'>
                                        <Icon
                                            type='font-awesome' name='plus-circle'
                                            color='#adadad'
                                            size={40}
                                        />
                                    </Link>
                                </View>
                            </View>
                            <View style={{ flex: 1, height: 0.5, backgroundColor: '#595959' }}></View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Picker
                                        selectedValue={this.state.project}
                                        style={{ height: 40, flex: 1 }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ project: itemValue })}>
                                        <Picker.Item label="Tất cả" value="all" />
                                        <Picker.Item label="Tham gia" value="join" />
                                        <Picker.Item label="Sở hữu" value="owner" />
                                    </Picker>
                                </View>
                                <View
                                    style={{ height: 40, width: 1, backgroundColor: '#595959' }}
                                >
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Picker
                                        selectedValue={this.state.status}
                                        style={{ height: 40, flex: 1 }}
                                        onValueChange={(itemValue, itemIndex) => this.handleChangeStatus(itemValue)}>
                                        <Picker.Item label="Tất cả" value={0} />
                                        <Picker.Item label="Thực hiện" value={1} />
                                        <Picker.Item label="Kết thúc" value={3} />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.ProjectReducer,
        user: state.UserReducer.user,
        token: state.UserReducer.token,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadListProject: (key, project, status, page, id) => dispatch(projectActions.loadListApi(key, project, status, page, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);