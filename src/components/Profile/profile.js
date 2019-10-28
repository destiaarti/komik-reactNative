import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Content,
  Container,
  Header,
  Left,
  Right,
  Title,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Profile extends Component {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      token: '',
      id: null,
    };
  }

  async componentDidMount() {
    await this.getToken();
    await this.getId();
    await this.getUserData();
  }

  getUserData() {
    axios({
      method: 'GET',
      
      url: `http:192.168.1.67:2019/api/v1/user/${this.state.id}`,
    }).then(res => {
      const entries = res.data;
      this.setState({entries});
      console.log(this.state.entries);
    });
  }

  async getToken() {
    const getToken = await AsyncStorage.getItem('token');
    if (getToken !== null) {
      this.setState({
        token: getToken,
      });
    } else {
      alert('You Must Login to access this screen');
      this.props.navigation.navigate('Login');
    }
  }

  async getId() {
    await AsyncStorage.getItem('id').then(key =>
      this.setState({
        id: JSON.parse(key),
      }),
    );
  }

  async logout() {
    await AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Container>
        <Header
          style={{
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            marginBottom: 8,
          }}>
          <Left>
            <Title style={{color: 'black'}}>Profile</Title>
          </Left>
          <Right>
            <Icon
              name="md-create"
              //onPress={() => this.props.navigation.navigate('EditProfile')}
              style={{marginRight: 10, color: 'orange'}}
              onPress={() =>
                this.props.navigation.navigate('EditProfile', {
                  pic: this.state.entries.avatar,
                  username: this.state.entries.name,
                })
              }
            />
          </Right>
        </Header>

        <Content>
          <View>
            <Image
              source={{uri: this.state.entries.avatar}}
              style={{
                alignSelf: 'center',
                height: 200,
                width: 200,
                borderRadius: 100,
              }}
            />
          </View>
          <Text style={{alignSelf: 'center', fontSize: 22, fontWeight: 'bold'}}>
            Welcome,{this.state.entries.name}
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 22, fontWeight: 'bold'}}>
            {this.state.entries.email}
          </Text>
          <Button
            onPress={() => this.props.navigation.navigate('MyWebtoon')}
            style={{
              backgroundColor: 'white',
              marginHorizontal: 30,
              marginVertical: 5,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'black',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{marginLeft: 90, color: 'black', fontWeight: 'bold'}}>
                My WebToon creation
              </Text>
            </View>
          </Button>
          <Button
            //onPress={() => this.props.navigation.navigate('Login')}
            onPress={() => this.logout()}
            style={{
              backgroundColor: 'white',
              marginVertical: 5,
              marginHorizontal: 30,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 8,
            }}>
            <View>
              <Text
                style={{marginLeft: 135, color: 'black', fontWeight: 'bold'}}>
                Logout
              </Text>
            </View>
          </Button>
        </Content>

        <Footer>
          <FooterTab style={{backgroundColor: 'black', borderTopWidth: 1}}>
            <Button onPress={() => this.props.navigation.navigate('ForYou')}>
              <Icon name="apps" style={{color: 'white'}} />
              <Text style={{color: 'white', fontWeight: 'bold'}}>For You</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Favourite')}>
              <Icon name="love" style={{color: 'white'}} />
              <Text style={{color: 'white'}}>Favorite</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('profile')}>
              <Icon name="person" style={{color: 'yellow'}} />
              <Text style={{color: 'yellow'}}>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
