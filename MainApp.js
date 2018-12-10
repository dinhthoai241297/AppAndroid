import React, { Component } from 'react';

import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore.dev';
import App from './src/App';

const store = configureStore();

class MainApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default MainApp;