import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.setState({
            data: [
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
                test = '123123',
            ]
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <SearchBar
                    lightTheme
                    icon={{ type: 'font-awesome', name: 'search' }}
                    containerStyle={{ backgroundColor: 'white' }}
                    inputStyle={{ backgroundColor: '#717171' }}
                    placeholder='Type Here...' />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => <View style={{ flex: 1, backgroundColor: 'blue', padding: 10, borderBottomColor: 'black', borderBottomWidth: 1 }}>
                        <Text>{item}</Text>
                    </View>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

export default Project;