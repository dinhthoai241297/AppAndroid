import React, { Component } from 'react';
import { View, Text, FlatList, Picker, TouchableOpacity, Alert, ProgressBarAndroid, TextInput } from 'react-native';
import { SearchBar, Icon, Button } from 'react-native-elements';
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
            page: 1,
            refreshing: false,
            loadMore: false
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

    loadListProject = async () => {
        this.setState({ refreshing: true });
        let { key, project, status } = this.state;
        await this.props.loadListProject(key, project, status, 1, this.props.user.id);
        this.setState({ refreshing: false });
        this.setState({ page: 1 });
    }

    loadMoreListApi = async () => {
        if (this.props.data.next) {
            this.setState({ loadMore: true });
            let { key, project, status, page } = this.state;
            page++;
            await this.props.loadMoreListApi(key, project, status, page, this.props.user.id);
            this.setState({ page, loadMore: false });
        }
    }

    handleChangeStatus = status => {
        this.setState({
            page: 1, status
        }, this.loadListProject);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#dce1e7' }}>
                <FlatList
                    data={this.props.data.projects}
                    renderItem={({ item }) => <ProjectItem project={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.loadMoreListApi}
                    onEndReachedThreshold={0.1}
                    onRefresh={this.loadListProject}
                    refreshing={this.state.refreshing}
                    ListFooterComponent={
                        this.state.loadMore && <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Button
                            title='Tải thêm'
                            onPress={this.loadMoreListApi}
                            backgroundColor='#018fe5'
                            color='white'
                        /> */}
                            <ProgressBarAndroid />
                        </View>
                    }
                    ListHeaderComponent={
                        <View
                            style={{ flex: 1, backgroundColor: 'white', marginBottom: 10 }}
                        >
                            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                                {/* <SearchBar
                                    containerStyle={{
                                        backgroundColor: 'white', borderBottomWidth: 0,
                                        borderTopWidth: 0, flex: 1,
                                        padding: 0, margin: 0
                                    }}
                                    inputStyle={{
                                        backgroundColor: '#f4f4f4', color: '#313131',
                                        margin: 8, height: 40
                                    }}
                                    icon={{ type: 'font-awesome', name: 'search' }}
                                    placeholder='Tìm kiếm' /> */}
                                <View style={{ flex: 1, padding: 10 }}>
                                    <TextInput
                                        style={{
                                            flex: 1, backgroundColor: '#f4f4f4',
                                            paddingHorizontal: 10, paddingVertical: 5,
                                            color: '#313131'

                                        }}
                                        placeholder="Tìm kiếm"
                                        onChangeText={key => this.setState({ key })}
                                        onSubmitEditing={this.loadListProject}
                                    />
                                </View>
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 8 }}
                                >
                                    <Link to='/addProject' component={TouchableOpacity}>
                                        <Icon
                                            type='font-awesome' name='plus-circle'
                                            color='#018fe5'
                                            size={40}
                                        />
                                    </Link>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    flex: 1, paddingTop: 0, paddingBottom: 8, paddingLeft: 8, paddingRight: 4,
                                }}>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.project}
                                        style={{ height: 40, flex: 1, backgroundColor: '#f4f4f4', borderRadius: 50 }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ project: itemValue })}>
                                        <Picker.Item label="Tất cả" value="all" />
                                        <Picker.Item label="Tham gia" value="join" />
                                        <Picker.Item label="Sở hữu" value="owner" />
                                    </Picker>
                                </View>
                                <View style={{
                                    flex: 1, paddingTop: 0, paddingBottom: 8, paddingLeft: 4, paddingRight: 8,
                                }}>
                                    <Picker
                                        prompt='Trạng thái dự án'
                                        selectedValue={this.state.status}
                                        style={{ height: 40, flex: 1, backgroundColor: '#f4f4f4', borderRadius: 50 }}
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
        loadListProject: (key, project, status, page, id) => dispatch(projectActions.loadListApi(key, project, status, page, id)),
        loadMoreListApi: (key, project, status, page, id) => dispatch(projectActions.loadMoreListApi(key, project, status, page, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);