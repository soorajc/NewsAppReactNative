/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import HtmlView from 'react-native-htmlview';
var WebViewAndroid = require('react-native-webview-android');
import TitleBar from '../TitleBar/TitleBar';
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
const loader = require('../../assets/loader.gif');

const htmlStyles = StyleSheet.create({
  p: {
    color: 'black',
    fontSize: 18,
    textAlign:'left',
    fontFamily: 'sans-serif-light',
  },
});

export default class ShoppingSiteDetails extends Component {

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
      arriverData: '',
      load: true,
      dataObtained: true,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
    };
  }

  goBack() {
      // you can use this callback to control web view
      if(this.state.backButtonEnabled){
          this.refs.WEBVIEW_REF.goBack();
      }else{
        const { goBack } = this.props.navigation;
        goBack();
      }
    }


    reload() {
      this.refs.WEBVIEW_REF.reload();
    }

    onNavigationStateChange(event) {
      this.setState({
        backButtonEnabled: event.canGoBack,
        forwardButtonEnabled: event.canGoForward,
        url: event.url,
        status: event.title,
        load: event.loading
      });
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
      <TitleBar
        homeHeaderColor="#3F51B5"
        homeIconColor="white"
        leftIcon="arrow-left"
        logoUrl="https://cdn.dribbble.com/users/261302/screenshots/1361907/logoplaceholder.png"
        handleLeftIconPress={() => this.goBack()}
        handleRightIconPress={() => this.goBack()}
      />
      <View style={this.state.load?styles.showView:styles.hideView}>
        <ActivityIndicator color="black" size="large"  animating={this.state.load ? true : false } />
      </View>
      <WebView
        startInLoadingState={false}
        domStorageEnabled
        ref="WEBVIEW_REF"
        onLoad={this.handleView.bind(this)}
        style={this.state.load?styles.hide:styles.show}
        source={{ uri: state.params.content}}
        javaScriptEnabledAndroid
        onNavigationStateChange=
      {this.onNavigationStateChange.bind(this)}
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
    marginTop: height * 0.35,
  },
  showLoader: {
    height: 40,
  },
  hideLoader: {
    height: 0,
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
