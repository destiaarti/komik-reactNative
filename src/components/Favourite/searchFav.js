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

export default class searchFav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webtoons: [],
      keyword: props.navigation.getParam('keyword'),
      id: null,
    };
  }

  async componentDidMount() {
    await this.getToken();
    await this.getId();
    this.showSearch();
  }

  async getToken() {
    await AsyncStorage.getItem('token').then(key =>
      this.setState({
        token: key,
      }),
    );
  }

  async getId() {
    await AsyncStorage.getItem('id').then(key =>
      this.setState({
        id: JSON.parse(key),
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
      url: `http:192.168.1.67:2019/api/v1/user/${this.state.id}/favorites?title=${this.state.keyword}`,
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
              <View style={{width: 150}}>
                <Row>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('DetailScreen', {
                        title: image.toonId.title,
                        image: image.toonId.image,
                        toonid: image.toonId.id,
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
                        source={{uri: image.toonId.image}}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={{marginLeft: 13}}>
                    <Text
                      style={{
                        fontSize: 21,
                        marginBottom: 5,
                        fontWeight: 'bold',
                      }}>
                      {image.toonId.title}
                    </Text>
                    {/* <Button warning small>
                      <Text style={{color: 'black'}}>+ Favorite</Text>
                    </Button> */}
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
