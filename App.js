// import React, {Component} from 'react';
// import {View, Text} from 'react-native';

// import Login from './src/components/Login/Login';
// import ForYou from './src/components/ForYou/ForYou';

// class App extends Component {
//   render() {
//     return <ForYou />;
//   }
// }

// export default App;
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import store from './src/_redux/index';

import Login from './src/components/Login/Login';
import ForYou from './src/components/ForYou/ForYou';
import Favourite from './src/components/Favourite/Favourite';
import profile from './src/components/Profile/profile';
import DetailScreen from './src/components/DetailScreen/DetailScreen';
import DetailEp from './src/components/DetailEp/DetailEp';
import EditProfile from './src/components/Profile/EditProfile';
import MyWebtoon from './src/components/Profile/MyWebtoon';
import CreateWebtoon from './src/components/Profile/CreateWebtoon';
import CreateEpi from './src/components/Profile/CreateEpisode';
import EditWebtoon from './src/components/Profile/EditWebtoon';
import EditEpisode from './src/components/Profile/EditEpisode';
import Register from './src/components/Register/Register';
import searchWebtoon from './src/components/ForYou/searchWebtoon';
import searchFav from './src/components/Favourite/searchFav';

const AuthStack = createStackNavigator({Login});
const AppStack = createStackNavigator({
  ForYou: ForYou,
  Favourite: Favourite,
  profile: profile,
  EditProfile: EditProfile,
  DetailScreen: DetailScreen,
  DetailEp: DetailEp,
  MyWebtoon: MyWebtoon,
  CreateWebtoon: CreateWebtoon,
  CreateEpi: CreateEpi,
  EditWebtoon: EditWebtoon,
  EditEpisode: EditEpisode,
  Register: Register,
  searchWebtoon: searchWebtoon,
  searchFav: searchFav,
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
