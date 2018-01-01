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
  ActivityIndicator,
  StyleSheet,
  View,
  DrawerLayoutAndroid,
} from 'react-native';
import SideBar from '../SideBar/SideBar';
import TitleBar from '../TitleBar/TitleBar';
import NewsTile from '../NewsTile/NewsTile';

const newsData = require('./test.json');
const changeCategory = require('./new.json');

const { width, height } = Dimensions.get('window');
const appLogoLocation = require('../../assets/applogo.png');
const loader = require('../../assets/loader.gif');

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
      dataObtained: false,
    };
  }

  componentWillMount() {
    this.getData();
    setInterval(this.getData, 300000);
  }

  resetData() {
    this.setState({ newsData: newsData });
  }

  goToSinglePost(url) {
    const { navigate } = this.props.navigation;
    navigate('NewsDetails', { url: url });
  }

  goToConverter(price, symbol) {
    const { navigate } = this.props.navigation;
    navigate('Converter', { "price": price, "symbol": symbol });
  }


  getData = () => {
    let url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("The Response Data is----->", responseData);
      this.setState({ dataSource: responseData, dataObtained: true });
    }).catch(err => {
       alert("Some Error Occured Try Again");
       console.log('the error while loading data', err);
    })
    .done();
  };

  goToSearch() {
    if (this.state.showSearchBar) {
      this.setState({ showSearchBar: false });
    } else {
      this.setState({ showSearchBar: true });
    }
  }

  handleBuy() {
    const { navigate } = this.props.navigation;
    navigate('Buy');
  }

  handleSell() {
    const { navigate } = this.props.navigation;
    navigate('Sell');
  }

  handleTwitter(content) {
    const { navigate } = this.props.navigation;
    navigate('NewsDetails', { "content": content });
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
        {
          this.state.dataObtained
          ?
          <ListView
            dataSource={list.cloneWithRows(this.state.dataSource)}
            renderRow={item =>
              <NewsTile
                title={item.name}
                handlePress={this.goToConverter.bind(this)}
                handleTwitter={this.handleTwitter.bind(this)}
                handleBuy={this.handleBuy.bind(this)}
                handleSell={this.handleSell.bind(this)}
                price={item.price_usd}
                symbol={item.symbol}
                hourRate={item.percent_change_1h}
                weeklyRate={item.percent_change_7d}
                dailyRate={item.percent_change_24h}
                lastUpdated={item.last_updated}
              />
            }
          />
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
           <ActivityIndicator color="black" size="large" />
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
