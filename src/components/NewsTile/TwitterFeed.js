/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import HtmlView from 'react-native-htmlview';
import {
  Image,
  Text,
  Share,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  WebView,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const htmlStyles = StyleSheet.create({
  p: {
    color: 'black',
    fontSize: 18,
    textAlign:'left',
    fontFamily: 'sans-serif-light',
  },
});

export default class TwitterFeed extends Component {

  propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      arriverData: '',
      load: true,
      dataObtained: true,
    };
  }

  shareContent(){
    Share.share({
    message: 'https://www.usatoday.com/story/money/cars/2017/10/27/bmw-creates-whole-new-suv-line-x-2/804659001/',
    url: 'http://bam.tech',
    title: 'Share News'
  }, {
    // Android only:
    dialogTitle: 'Share BAM goodness',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  })
  }

  handleView = () => {
    this.setState({ load: false });
  }

  render() {
    const { state }= this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={this.state.load?styles.showView:styles.hideView}>
        <ActivityIndicator size="large" color="black" style={{ marginTop: 0.5 * height }} />
      </View>
      <WebView
        startInLoadingState={false}
        domStorageEnabled
        onLoad={this.handleView.bind(this)}
        style={this.state.load?styles.hide:styles.show}
        source={{ html: '<a class="twitter-timeline" href="https://twitter.com/CryptoCoiners?ref_src=twsrc%5Etfw">Tweets by CryptoCoiners</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' }}
        javaScriptEnabledAndroid
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  hide: {
    height: 0,
    width: 0,
  },
  show: {
    flex: 1,
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
    height: 0.438 * height,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
  },
  image: {
    width: null,
    height: null,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  hideView: {
    width: 0,
    height: 0,
  },
  showView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nameContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  }
});
