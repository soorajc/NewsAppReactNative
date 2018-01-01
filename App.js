import {
  StackNavigator,
} from 'react-navigation';

import SplashScreen from './src/components/SplashScreen/SplashScreen';
import HomeScreen from './src/components/HomeScreen/HomeScreen';
import NewsDetails from './src/components/NewsTile/NewsDetails';
import Converter from './src/components/Converter/Converter';
import Buy from './src/components/Agencies/Buy';
import Sell from './src/components/Agencies/Sell';
import CryptoNews from './src/components/NewsFeed/CryptoNews';
import ShoppingSites from './src/components/Shopping/Shopping';
import ShopDetails from './src/components/Shopping/ShoppingSite';
import About from './src/components/AboutUs/About';

const App = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  Home: { screen: HomeScreen },
  NewsDetails: { screen: NewsDetails },
  Converter: { screen: Converter },
  BuyCoins: { screen: Buy },
  Sell: { screen: Sell },
  CryptoNews: { screen: CryptoNews },
  CryptoAccessories: { screen: ShoppingSites },
  ShopDetails: { screen: ShopDetails },
  AboutUs: { screen: About },
});

export default App;
