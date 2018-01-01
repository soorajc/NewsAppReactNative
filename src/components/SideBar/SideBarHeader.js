/**
 * This file handles the code for SideBar
 * The theme for login screen is updated realtime using getTheme function
 * The Names for menu are taken from the array menuItems
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Dimensions,
  View,
} from 'react-native';


const appLogoLocation = require('../../assets/applogo.png');

const { height } = Dimensions.get('window');

export default class SideBarHeader extends Component {

  propTypes = {
    menuHeaderImageLocation: PropTypes.string.isRequired,
    menuHeaderBackgroundColor: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={{ height: 0.3 * height, backgroundColor: this.props.menuHeaderBackgroundColor, alignItems: 'center', justifyContent: 'center' }}>
        <Image resizeMode="contain" source={appLogoLocation} style={{ width: 150, height: 150 }} />
      </View>
    );
  }
}
