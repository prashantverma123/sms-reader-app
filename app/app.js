import React, { Component } from "react";
import { Provider } from "react-redux";
import {createRootNavigator} from "./router";
import store from './stores';
import {storage} from  './utils'
import {StyleProvider,Root} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';
import {saveUserFromAync} from "./actions/LoginAction";
import SplashScreen from 'react-native-splash-screen'


class App extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             signedIn: false,
             checkedSignIn: false
         };
     }
     componentDidMount() {
         SplashScreen.hide();
          (async () =>{
             try {
                 const userdata = await storage.getJSONData('user');
                 if (userdata ) {
                     if(JSON.parse(userdata).token){
                         store.dispatch(saveUserFromAync(JSON.parse(userdata)));
                         this.setState({signedIn:true});
                     }
                 }
                 this.setState({checkedSignIn:true});
             }
             catch(e) {
                 console.log('Error1', e);
             }
         })();

     }
    render() {
        const { checkedSignIn, signedIn } = this.state;
        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);
        return (<Provider store={store}>
            <StyleProvider style={getTheme(platform)}>
                <Root><Layout></Layout></Root>
                </StyleProvider>
        </Provider>);
    }
}

export default App;
