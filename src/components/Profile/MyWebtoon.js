import React, {Component} from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Header,
  Left,
  Right,
  Icon,
  Fab,
  Row,
  View,
} from 'native-base';
import {Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class MyWebtoon extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'MyWebtoon',
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginBottom: 5,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      banners: [
      
      ],
      token: '',
      id: null,
    };
  }

  async componentDidMount() {
    await this.getToken();
    await this.getId();
    axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: `http:192.168.1.67:2019/api/v1/user/${this.state.id}/webtoons`,
    }).then(res => {
      const banners = res.data;

      console.log(banners);
      this.setState({banners});
    });
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

  render() {
    return (
      <Container>
        <View>
          <FlatList
            data={this.state.banners}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View key={item.image}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('EditWebtoon', {
                      title: item.title,
                      epiId: item.id,
                      genre: item.genre,
                      image: item.image,
                    })
                  }>
                  <Row style={{margin: 5}}>
                    <View style={{borderWidth: 2}}>
                      <Image
                        style={{height: 95, width: 95}}
                        source={{uri: item.image}}
                      />
                    </View>
                    <View>
                      <Text style={{fontWeight: 'bold', margin: 5}}>
                        {item.title}
                      </Text>
                      <Text style={{margin: 5}}>{item.genre}</Text>
                    </View>
                  </Row>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <Fab
          active={false}
          style={{backgroundColor: 'green'}}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('CreateWebtoon')}>
          <Icon type="FontAwesome" name="plus" />
        </Fab>
      </Container>
    );
  }
}
