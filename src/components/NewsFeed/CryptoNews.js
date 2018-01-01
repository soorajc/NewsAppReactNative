/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  TextInput,
  ListView,
  Image,
  StyleSheet,
  View,
  DrawerLayoutAndroid,
} from 'react-native';
import SideBar from '../SideBar/SideBar';
import TitleBar from '../TitleBar/TitleBar';
import NewsTile from './NewsTile';


const { width, height } = Dimensions.get('window');
const appLogoLocation = require('../../assets/bit.png');
const loader = require('../../assets/loader.gif');

const feeder = [
  {
    "Name": "Crypto Coins News",
    "Image": require('../../assets/ccn.jpg'),
    "Content": '<a class="twitter-timeline" href="https://twitter.com/CryptoCoinsNews?ref_src=twsrc%5Etfw">Tweets by CryptoCoinsNews</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  },

  {
    "Name": "News BTC",
    "Image": require('../../assets/newsbtc.png'),
    "Content": '<a class="twitter-timeline" href="https://twitter.com/newsbtc?ref_src=twsrc%5Etfw">Tweets by newsbtc</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  },

  {
    "Name": "Coin Desk",
    "Image": require('../../assets/coindesk.png'),
    "Content": '<a class="twitter-timeline" href="https://twitter.com/coindesk?ref_src=twsrc%5Etfw">Tweets by coindesk</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  },

  {
    "Name": "Bitcoin Magazine",
    "Image": require('../../assets/bitcoin-magazine.png'),
    "Content": '<a class="twitter-timeline" href="https://twitter.com/BitcoinMagazine?ref_src=twsrc%5Etfw">Tweets by BitcoinMagazine</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  },

  {
    "Name": "Coin Telegraph",
    "Image": require('../../assets/cointelegraph.png'),
    "Content": '<a class="twitter-timeline" href="https://twitter.com/Cointelegraph?ref_src=twsrc%5Etfw">Tweets by Cointelegraph</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  },
]

export default class HomeScreen extends Component {

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
    navigate('NewsDetails', { "content": content });
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
        <View style={this.state.showSearchBar ? styles.searchView: styles.hideView}>
          <TextInput
            placeholder="Type here to search"
            style={{ height: 40, borderColor: 'trasparent' }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        {
          this.state.dataObtained
          ?
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
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Image source={loader} style={{ width: 100, height: 100 }} />
          </View>
       }

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
