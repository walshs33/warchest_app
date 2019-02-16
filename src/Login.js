import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';
import firebase from 'react-native-firebase';

const {width, height} = Dimensions.get('window');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    }
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if(user != null) {
      this.setState({loggedIn: true, loading: false});
      return;
    }
    this.setState({loading: false});
  }

  componentWillUnmount() {
    return null;
  }

  loginButtonPress() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((response) => {
      console.log(response);
      if(response.user != null) {
        alert('logged in!')
        this.setState({loggedIn: true});
      }
    })
    .catch(error => alert(error));
  }

  logoutButtonPress() {
    firebase.auth().signOut()
    .then((response) => {
      console.log(response);
      this.setState({loggedIn: false, email: '', password: ''});
      alert('logged out!');
    })
    .catch(error => alert(error));
  }

  createAccountButtonPress() {
    this.props.navigation.navigate('Signup', {
      onGoBack: () => this.componentDidMount(),
    });
  }

  render() {
    if(this.state.loggedIn) {
      const user = firebase.auth().currentUser._user;
      console.log(user);
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent:'center', padding: 15}}>
          <Text>You are logged in as {user.email}</Text>
          {
            !user.emailVerified ?
            <Button
              title='Send verification email'
              buttonStyle={{width: width - 30, marginTop: 15}}
              onPress={() => alert('email button pressed')}
            />
            :
            <View></View>
          }
          <Button
            title='Logout'
            buttonStyle={{width: width - 30, marginTop: 15}}
            onPress={() => this.logoutButtonPress()}
          />
        </View>
      )
    } else {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent:'center', padding: 15}}>
          <Input
            placeholder='Email'
            value={this.state.email}
            inputStyle={{width: width - 30, marginTop: 15}}
            onChangeText={(text) => this.setState({email: text})}
            onSubmitEditing={() => this.password.focus()}
          />
          <Input
            ref={(input) => {this.password = input}}
            placeholder='Password'
            value={this.state.password}
            secureTextEntry={true}
            inputStyle={{width: width - 30, marginTop: 15}}
            onChangeText={(text) => this.setState({password: text})}
            onSubmitEditing={() => this.loginButtonPress()}
          />
          <Button
            title='Login'
            buttonStyle={{width: width - 30, marginTop: 15}}
            onPress={() => this.loginButtonPress()}
          />
          <Button
            title='Create Account'
            buttonStyle={{width: width - 30, marginTop: 15}}
            onPress={() => this.createAccountButtonPress()}
          />
        </View>
      )
    }
  }
}
