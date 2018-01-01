/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ListView,
  StyleSheet,
  DrawerLayoutAndroid,
} from 'react-native';
import SideBar from '../SideBar/SideBar';
import TitleBar from '../TitleBar/TitleBar';
import NewsTile from '../NewsFeed/NewsTile';


const { width, height } = Dimensions.get('window');
const appLogoLocation = require('../../assets/bit.png');
const loader = require('../../assets/loader.gif');

const feeder = [
  {
    "Name": "Zazzle",
    "Image": require('../../assets/zazzle.png'),
    "Content": 'https://www.zazzle.com/bitcoin+accessories?rf=238537406198217157',
  },

  {
    "Name": "Etsy",
    "Image": require('../../assets/etsy.png'),
    "Content": 'https://www.etsy.com/market/bitcoin',
  },

  {
    "Name": "Crypto Clothing",
    "Image": require('../../assets/cc.jpg'),
    "Content": 'https://cryptoclothing.org/',
  },

  {
    "Name": "All Things Decentral",
    "Image": require('../../assets/decn.jpg'),
    "Content": 'https://allthingsdecentral.com/',
  }
]

export default class ShoppingWebSites extends Component {

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
      dataSource: '',
      showSearchBar: false,
      dataObtained: true,
    };
  }


  resetData() {
    this.setState({ newsData: newsData });
  }

  goToSinglePost(content) {
    const { navigate } = this.props.navigation;
    navigate('ShopDetails', { "content": content });
  }


  goToSearch() {
    if (this.state.showSearchBar) {
      this.setState({ showSearchBar: false });
    } else {
      this.setState({ showSearchBar: true });
    }
  }

  render() {
    const list = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const { state } = this.props.navigation;
    const handleSideBarNavigation = (screenName) => {
      if (screenName !== state.routeName) {
        const { navigate } = this.props.navigation;
        const screen = screenName.replace(/ +/g, "");
        navigate(screen);
        this.drawer.closeDrawer();
      } else {
        this.drawer.closeDrawer();
      }
    };
    return (
      <DrawerLayoutAndroid
        ref={(el) => { this.drawer = el; }}
        drawerWidth={0.72 * width}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={
          () => <SideBar
            menuHeaderBackgroundColor="white"
            menuHeaderImageLocation={appLogoLocation}
            menuItemBackgroundColor="#757575"
            menuItemColor="white"
            menuItemFontFamily="sans-serif-medium"
            menuItemBorderColor="black"
            menuFooterBackgroundColor="white"
            menuFooterTextColor="black"
            menuFooterText="© 2018 Dynamisk"
            handleSideBarNavigation={handleSideBarNavigation}
          />
        }
      >
        <TitleBar
          homeHeaderColor="#3F51B5"
          homeIconColor="white"
          leftIcon="bars"
          logoUrl="https://cdn.dribbble.com/users/261302/screenshots/1361907/logoplaceholder.png"
          handleLeftIconPress={() => this.drawer.openDrawer()}
          handleRightIconPress={() => this.goToSearch()}
        />
        <ListView
          style={{ flex: 0.9 }}
          dataSource={list.cloneWithRows(feeder)}
          renderRow={item =>
            <NewsTile
              title={item.Name}
              thumbnail={item.Image}
              goToSinglePost={() => this.goToSinglePost(item.Content)}
            />
          }
        />
      </DrawerLayoutAndroid>
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
  searchView: {
    backgroundColor: 'white',
    padding: 10,
  },
  hideView: {
    width: 0,
    height: 0,
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
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  nameContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
});
