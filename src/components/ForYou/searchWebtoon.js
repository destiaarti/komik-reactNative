import React, {Component} from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Item,
  Input,
  Button,
  Header,
  Row,
  Footer,
  FooterTab,
  Icon,
} from 'native-base';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {createStackNavigator} from 'react-navigation-stack';

export default class Fav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webtoons: [],
      keyword: props.navigation.getParam('keyword'),
    };
  }

  async componentDidMount() {
    await this.getToken();
    this.showSearch();
  }

  async getToken() {
    await AsyncStorage.getItem('token').then(key =>
      this.setState({
        token: key,
      }),
    );
  }

  showSearch = () => {
    axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: `http://192.168.1.67:2019/api/v1/webtoons?title=${this.state.keyword}`,
    }).then(res => {
      const webtoons = res.data;
      this.setState({webtoons});
      console.log(webtoons);
    });
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Search for: ' + navigation.getParam('keyword'),
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  render() {
    return (
      <Container>
        <Content>
          <View style={{marginTop: 25}}>
            {this.state.webtoons.map(image => (
              <View style={{width: 130}}>
                <Row>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('DetailScreen', {
                        title: image.title,
                        image: image.image,
                        toonid: image.id,
                      })
                    }>
                    <View style={{borderWidth: 2, margin: 5}}>
                      <Image
                        style={{
                          width: 105,
                          height: 105,
                          margin: 1,
                          borderWidth: 5,
                        }}
                        source={{uri: image.image}}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{marginLeft: 13}}>
                    <Text
                      style={{
                        fontSize: 15,
                        marginBottom: 5,
                        fontWeight: 'bold',
                      }}>
                      {image.title}
                    </Text>
                    <Button warning small>
                      <Text style={{color: 'black'}}>+ Favorite</Text>
                    </Button>
                  </View>
                </Row>
              </View>
            ))}
          </View>
        </Content>
      </Container>
    );
  }
}
