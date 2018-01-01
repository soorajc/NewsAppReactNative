/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';
import TitleBar from '../TitleBar/TitleBar';
import {
  Image,
  Text,
  Dimensions,
  ScrollView,
  Linking,
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

const etoroUrl = 'https://content.etoro.com/lp/new-crypto/?dl=30002065&utm_medium=Affiliate&utm_source=70142&utm_content=10521&utm_serial=trackapp&utm_campaign=trackapp&utm_term=';
const coinBaseUrl = 'https://www.coinbase.com/join/5a437fc83bb47602807c75da';
const localBitCoin = 'https://localbitcoins.com/buy-bitcoins-online/?ch=lvw8';
const coinMama = 'https://www.coinmama.com/?ref=sooraj';
const paxFul  = 'https://paxful.com/roots/buy-bitcoin/index?affiliate=onxQZ57MkZq';

export default class Buyers extends Component {

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
    };
  }

  handleToggle() {
    if (this.state.toggle) {
      this.setState({ toggle: false });
    } else {
      this.setState({ toggle: true });
    }
  }

  goBack(){
    const { goBack } = this.props.navigation;
    goBack();
  }

  handleUrl(url){
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const {state} = this.props.navigation;
    return (
      <ScrollView>
        <TitleBar
          homeHeaderColor="#3F51B5"
          homeIconColor="white"
          leftIcon="arrow-left"
          logoUrl="https://cdn.dribbble.com/users/261302/screenshots/1361907/logoplaceholder.png"
          handleLeftIconPress={() => this.goBack()}
          handleRightIconPress={() => this.goBack()}
        />
        <View style={{ height: height * 0.45 }}>
          <Image style={{ height: height * 0.3, width: width }} source={require('../../assets/etoro.jpg')} />
          <TouchableOpacity onPress={() => this.handleUrl(etoroUrl)} style={{ height: 80, width: width, backgroundColor: '#388E3C', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Start Trading With Etoro</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: height * 0.45 }}>
          <Image style={{ height: height * 0.3, width: width }} source={require('../../assets/pax.jpg')} />
          <TouchableOpacity onPress={() => this.handleUrl(paxFul)} style={{ height: 80, width: width, backgroundColor: '#388E3C', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Start Trading With PaxFul</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: height * 0.45 }}>
          <Image style={{ height: height * 0.3, width: width }} source={require('../../assets/coinbase.jpg')} />
          <TouchableOpacity onPress={() => this.handleUrl(coinBaseUrl)} style={{ height: 80, width: width, backgroundColor: '#388E3C', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Start Trading With CoinBase</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: height * 0.45 }}>
          <Image style={{ height: height * 0.3, width: width }} source={require('../../assets/localbit.png')} />
          <TouchableOpacity onPress={() => this.handleUrl(localBitCoin)} style={{ height: 80, width: width, backgroundColor: '#388E3C', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Start Trading With LocalBitCoin</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: height * 0.45 }}>
          <Image style={{ height: height * 0.3, width: width }} source={require('../../assets/coinmama.jpg')} />
          <TouchableOpacity onPress={() => this.handleUrl(coinMama)} style={{ height: 80, width: width, backgroundColor: '#388E3C', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Start Trading With CoinMama</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    justifyContent: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
});
