import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';
import firebase from 'react-native-firebase';

const {width, height} = Dimensions.get('window');

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      created: false,
      createdUser: null,
    };
  }

  componentDidMount() {
    return null;
  }

  componentWillUnmount() {
    return null;
  }

  signUpButtonPress() {
    if(this.state.password == this.state.passwordConfirm) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        console.log(response);
        this.setState({created: true, createdUser: response.user._user});
      })
      .catch(error => alert(error));
    } else {
      alert('Passwords do not match');
    }
  }

  render() {
    if(this.state.created) {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent:'center', padding: 15}}>
          <Text>Thank you {this.state.createdUser.email}!</Text>
          <Button
            title='Back to account'
            buttonStyle={{width: width - 30, marginTop: 15}}
            onPress={() => {
              this.props.navigation.state.params.onGoBack();
              this.props.navigation.goBack();
            }}
          />
        </View>
      )
    }
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
          onSubmitEditing={() => this.passwordConfirm.focus()}
        />
        <Input
          ref={(input) => {this.passwordConfirm = input}}
          placeholder='Confirm Password'
          value={this.state.passwordConfirm}
          secureTextEntry={true}
          inputStyle={{width: width - 30, marginTop: 15}}
          onChangeText={(text) => this.setState({passwordConfirm: text})}
          onSubmitEditing={() => this.signUpButtonPress()}
        />
        <Button
          title='Create Account'
          buttonStyle={{width: width - 30, marginTop: 15}}
          onPress={() => this.signUpButtonPress()}
        />
      </View>
    )
  }
}
