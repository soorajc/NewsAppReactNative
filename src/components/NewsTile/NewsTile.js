/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  Text,
  Dimensions,
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
  "XLM": require('../../assets/xlm.png'),
  "EOS": require('../../assets/eos.png'),
  "BTG": require('../../assets/btg.png'),
  "QTUM": require('../../assets/qtum.png'),
  "NEO": require('../../assets/neo.jpg'),
  "ETC": require('../../assets/etc.png'),
  "BCC": require('../../assets/bccoin.png'),
  "LSK": require('../../assets/lsk.png'),
  "TRX": require('../../assets/trx.png'),
  "XVG": require('../../assets/verge.png'),
}


const twitterUrl = { "BTC": '<a class="twitter-timeline" href="https://twitter.com/BTCTN?ref_src=twsrc%5Etfw">Tweets by BTCTN</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "ETH": '<a class="twitter-timeline" href="https://twitter.com/ethereumproject?ref_src=twsrc%5Etfw">Tweets by ethereumproject</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "BCH": '<a class="twitter-timeline" href="https://twitter.com/BitcoinCashFans?ref_src=twsrc%5Etfw">Tweets by BitcoinCashFans</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "XRP": '<a class="twitter-timeline" href="https://twitter.com/Ripple?ref_src=twsrc%5Etfw">Tweets by Ripple</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "LTC": '<a class="twitter-timeline" href="https://twitter.com/LitecoinProject?ref_src=twsrc%5Etfw">Tweets by LitecoinProject</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "ADA": '<a class="twitter-timeline" href="https://twitter.com/CardanoStiftung?ref_src=twsrc%5Etfw">Tweets by CardanoStiftung</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "MIOTA": '<a class="twitter-timeline" href="https://twitter.com/iotatoken?ref_src=twsrc%5Etfw">Tweets by iotatoken</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "DASH": '<a class="twitter-timeline" href="https://twitter.com/Dashpay?ref_src=twsrc%5Etfw">Tweets by Dashpay</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "XEM": '<a class="twitter-timeline" href="https://twitter.com/NEMofficial?ref_src=twsrc%5Etfw">Tweets by NEMofficial</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "XMR": '<a class="twitter-timeline" href="https://twitter.com/monerocurrency?ref_src=twsrc%5Etfw">Tweets by monerocurrency</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "XLM": '<a class="twitter-timeline" href="https://twitter.com/StellarOrg?ref_src=twsrc%5Etfw">Tweets by StellarOrg</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "EOS": '<a class="twitter-timeline" href="https://twitter.com/EOS_io?ref_src=twsrc%5Etfw">Tweets by EOS_io</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "BTG": '<a class="twitter-timeline" href="https://twitter.com/bitcoingold?ref_src=twsrc%5Etfw">Tweets by bitcoingold</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "QTUM": '<a class="twitter-timeline" href="https://twitter.com/QtumOfficial?ref_src=twsrc%5Etfw">Tweets by QtumOfficial</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "NEO": '<a class="twitter-timeline" href="https://twitter.com/NEO_Blockchain?ref_src=twsrc%5Etfw">Tweets by NEO_Blockchain</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "ETC": '<a class="twitter-timeline" href="https://twitter.com/eth_classic?ref_src=twsrc%5Etfw">Tweets by eth_classic</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "BCC": '<a class="twitter-timeline" href="https://twitter.com/bitconnect?ref_src=twsrc%5Etfw">Tweets by bitconnect</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "LSK": '<a class="twitter-timeline" href="https://twitter.com/LiskHQ?ref_src=twsrc%5Etfw">Tweets by LiskHQ</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "TRX": '<a class="twitter-timeline" href="https://twitter.com/Tronfoundation?ref_src=twsrc%5Etfw">Tweets by Tronfoundation</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  "XVG": '<a class="twitter-timeline" href="https://twitter.com/vergecurrency?ref_src=twsrc%5Etfw">Tweets by vergecurrency</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
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

  render() {
    return (
      <View style={styles.nameContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={()=>this.props.handlePress(this.props.price, this.props.symbol)} style={{ flex: 0.25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <Image resizeMode="contain" source={imageSet[this.props.symbol]} style={{ width: 25, height: 25, marginTop: 5 }} />
            <Text style={{ marginTop: 5, fontSize: 13, fontWeight: 'bold', color: 'black' }}>{this.props.title === 'Ethereum Classic' ? 'ETC' : this.props.title}</Text>
            <Text style={{ marginTop: 5, marginBottom: 5, fontSize: 13, fontWeight: 'bold', color: 'black' }}>{this.props.price + ' $'}</Text>
          </TouchableOpacity>
          <View style={this.props.hourRate > 0 ? styles.positive : styles.negative}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>1h</Text>
            <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'white' }}>{this.props.hourRate + '%'}</Text>
          </View>
          <View style={this.props.dailyRate > 0 ? styles.positive : styles.negative}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>24h</Text>
            <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'white' }}>{this.props.dailyRate + '%'}</Text>
          </View>
          <View style={this.props.weeklyRate > 0 ? styles.positive : styles.negative}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>7d</Text>
            <Text style={{ marginTop: 5, fontWeight: 'bold', color: 'white' }}>{this.props.weeklyRate + '%'}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', padding: 15, }}>
          <View style={{ flex: 0.7, alignItems: 'flex-start', justifyContent :'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Last Updated - {Moment.unix(this.props.lastUpdated).format('LTS')}
          </Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <TouchableOpacity onPress={()=>this.props.handleTwitter(twitterUrl[this.props.symbol])} style={{ alignSelf: 'flex-end', alignItems: 'center', padding: 10, justifyContent: 'center',  backgroundColor: '#009CFA' }}>
              <Icon name="twitter" size={25} color="white" />
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: 0.30 * height,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
});
