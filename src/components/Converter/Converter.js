/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import TitleBar from '../TitleBar/TitleBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const imageSet = { "BTC": require('../../assets/btc.png'),
  "ETH": require('../../assets/eth.png'),
  "BCH": require('../../assets/bch.png'),
  "XRP": require('../../assets/ripple.png'),
  "LTC": require('../../assets/ltc.png'),
  "ADA": require('../../assets/ada.png'),
  "MIOTA": require('../../assets/iota.png'),
  "DASH": require('../../assets/dash.png'),
  "XEM": require('../../assets/xem.png'),
  "XMR": require('../../assets/xmr.png'),
}
export default class NewsTile extends Component {

  static navigationOptions = {
    header: null,
  };

  propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      coin: '',
      currency: '',
      toggle: false,
      placeholder: '',
      result: 'Enter a value to see the rate',
    };
  }

  componentWillMount() {
    const { state } = this.props.navigation;
    const label = 'Enter the amount in ' + state.params.symbol;
    this.setState({ placeholder: label });
  }

  goBack(){
    const { goBack } = this.props.navigation;
    goBack();
  }

  handleToggle() {
    const {state} = this.props.navigation;
    this.setState({ result: 'Enter a value to see the rate', text: '' });
    if (this.state.toggle) {
      const label = 'Enter the amount in ' + state.params.symbol;
      this.setState({ toggle: false, placeholder: label });
    } else {
      const label = 'Enter the amount in USD';
      this.setState({ toggle: true, placeholder: label });
    }
  }

  handleConversion(amount) {
    console.log(amount);
    this.setState({ text: amount.text });
    const {state} = this.props.navigation;
    const rate = state.params.price;
    if (!this.state.toggle) {
      const convertedRate = (rate * amount.text);
      const result = amount.text +' '+state.params.symbol + " = " + convertedRate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " USD";
      this.setState({ result: result });
    } else {
      const convertedRate = (amount.text / rate);
      const result = amount.text +' USD ' + " = " + convertedRate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +" "+state.params.symbol;
      this.setState({ result: result });
    }
  }

  render() {
    const {state} = this.props.navigation;
    return (
      <View style={styles.nameContainer}>
        <TitleBar
          homeHeaderColor="#3F51B5"
          homeIconColor="white"
          leftIcon="arrow-left"
          logoUrl="https://cdn.dribbble.com/users/261302/screenshots/1361907/logoplaceholder.png"
          handleLeftIconPress={() => this.goBack()}
          handleRightIconPress={() => this.goBack()}
        />
        <View style={{ flex: 0.2, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> {!this.state.toggle ? state.params.symbol + " TO USD CONVERTER" : "USD TO " + state.params.symbol + " CONVERTER" }</Text>
          <TouchableOpacity style={{ padding: 10, marginTop: 10, backgroundColor: '#D81B60' }} onPress={() => this.handleToggle()}>
            <Icon name="exchange" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.8, backgroundColor: 'white', padding: 10 }}>
          <TextInput
            style={{ height: 60, borderColor: 'gray', borderWidth: 1 }}
            placeholder={this.state.placeholder}
            keyboardType='numeric'
            placeholderTextColor="black"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.handleConversion({ text })}
            value={this.state.text}
          />
          <TouchableOpacity style={{ height: height * 0.2, backgroundColor: '#3F51B5', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {this.state.result}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  positive: {
    flex: 0.25,
    backgroundColor: '#43A047',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: 'white',
  },
  negative: {
    flex: 0.25,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  nameContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
});
