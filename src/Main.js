import React from 'react';
import { View, Text, TouchableNativeFeedback, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';

const {width, height} = Dimensions.get('window');

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    return null;
  }

  componentWillUnmount() {
    return null;
  }

  // fix image sizes/ratios
  render() {
    return(
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{backgroundColor: 'red', width: width, alignItems: 'center'}}>
          <Image
            source={require('../assets/logos/mtglogo.jpg')}
            style={{height: 60, width: width / 2, margin: 10}}
          />
        </View>
        <View style={{backgroundColor: 'blue', width: width, alignItems: 'center'}}>
          <Image
            source={require('../assets/logos/yugiohlogo.jpg')}
            style={{height: 60, width: width / 2, margin: 10}}
          />
        </View>
        <View style={{backgroundColor: 'red', width: width, alignItems: 'center'}}>
          <Image
            source={require('../assets/logos/pokemonlogo.png')}
            style={{height: 60, width: width / 3, margin: 10}}
          />
        </View>
        <View style={{backgroundColor: 'blue', width: width, alignItems: 'center'}}>
          <Image
            source={require('../assets/logos/mtglogo.jpg')}
            style={{height: 60, width: width / 2, margin: 10}}
          />
        </View>
      </View>
    )
  }
}
