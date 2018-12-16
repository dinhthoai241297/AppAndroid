import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

const formatDate = date => {
    let a = new Date(date);
    return a.getDate() + '/' + (a.getMonth() + 1) + '/' + a.getFullYear();
}

class ProjectItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    render() {

        let { project } = this.props;
        let { open } = this.state;

        return (
            <View style={{
                flex: 1, flexDirection: 'row', marginBottom: 2,
                backgroundColor: 'white', padding: 10,
                alignItems: 'center'
            }}>
                <View style={{
                    marginRight: 10
                }}>
                    <Icon
                        name='work'
                        color={project.status === 1 ? '#37c684' : '#adadad'}
                        size={40}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18 }}>
                            {project.name}
                        </Text>
                        <Link to={'/projectDetail/' + project._id}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 3 }}>
                                    {formatDate(project.createdAt)}
                                </Text>
                                <Icon
                                    type='font-awesome' name='angle-right'
                                    color='#adadad'
                                    size={18}
                                />
                            </View>
                        </Link>
                    </View>
                    <Text>
                        {project.owner[0].fullName}
                    </Text>
                    <Text style={{ color: '#adadad', fontSize: 12 }}>
                        {project.status === 1 ? 'Working' : 'Closed'}
                    </Text>

                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    show: {
        display: 'flex'
    },
    hiden: {
        display: 'none'
    }
});

export default ProjectItem;