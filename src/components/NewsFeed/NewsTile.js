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
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { height, width } = Dimensions.get('window');

const htmlStyles = StyleSheet.create({
  p: {
    color: 'black',
    fontSize: 18,
    textAlign:'left',
    fontFamily: 'sans-serif-light',
  },
});

export default class NewsTile extends Component {

  propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.func.isRequired,
    }).isRequired,
  };

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

  render() {
    return (
      <TouchableOpacity onPress={()=>this.props.goToSinglePost()} style={styles.itemContainer}>
          <Image resizeMode="contain" source={this.props.thumbnail} style={styles.image} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    flex: 1,
    borderColor: '#80CBC4',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  image: {
    width: 200,
    height: 200,
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
