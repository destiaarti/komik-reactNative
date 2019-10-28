import React, {Component} from 'react';
import axios from 'axios';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Container,
  Header,
  Item,
  Input,
  Content,
  Row,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class Favourite extends Component {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      banners: [
        // {
        //   title: 'The Secret of Angel',
        //   image:
        //     'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
        //   favorite: '100+ favorite',
        // },
        // {
        //   title: 'Pasutri Gaje',
        //   image:
        //     'https://4.bp.blogspot.com/-7RzHQQanlqY/XE7r94lzUCI/AAAAAAAACqI/keHhTWrJ1441h7vHWIL_FNf912DnsRMbQCLcBGAs/s1600/Pasutri%2BGaje%2BSeason%2B2%2BAnissa%2BNisfihani%2BWebtoon%2BIndonesia.JPG',
        //   favorite: '90 favorite',
        // },
        // {
        //   title: 'Young Mom',
        //   image:
        //     'https://cdn.idntimes.com/content-images/community/2019/03/opera-snapshot-2019-03-10-190819-wwwwebtoonscom-aa64078ba943e7895194e96f853d4d20.png',
        //   favorite: '80 favorite',
        // },
      ],
      id: null,
      token: null,
      keyword: '',
    };
  }

  // componentDidMount() {
  //   axios
  //     .get(`http:192.168.1.14:5000/api/v1/webtoons`, {
  //       params: {isFavorite: true},
  //     })
  //     .then(res => {
  //       const data = res.data;
  //       console.log(data);
  //       this.setState({banners: data});
  //     })
  //     .catch(error => {
  //       console.log('Api call error');
  //     });
  // }

  async componentDidMount() {
    await this.getToken();
    await this.getId();
    this.showFavorite();
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

  showFavorite = () => {
    axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: `http://192.168.1.67:2019/api/v1/user/${this.state.id}/favorites`,
    }).then(res => {
      const banners = res.data;
      this.setState({banners});
    });
  };

  render() {
    return (
      <Container>
        <Header searchBar style={{backgroundColor: 'white'}}>
          <Item rounded>
            <Input
              placeholder="Search"
              onChangeText={keyword => this.setState({keyword})}
            />
            <Icon
              name="ios-search"
              onPress={() =>
                this.props.navigation.navigate('searchFav', {
                  keyword: this.state.keyword,
                })
              }
            />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content>
          <View>
            <FlatList
              data={this.state.banners}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View key={item.image}>
                  <Row style={{margin: 5}}>
                    <View style={{borderWidth: 2}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('DetailScreen', {
                            title: item.toonId.title,
                            image: item.toonId.image,
                            toonid: item.toonId.id,
                          })
                        }>
                        <Image
                          style={{height: 95, width: 95}}
                          source={{uri: item.toonId.image}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      {/* <Text style={{fontWeight: 'bold', margin: 5}}>
                        {item.title}
                      </Text> */}
                      <Text
                        style={{margin: 5, fontWeight: 'bold', fontSize: 18}}>
                        {item.toonId.title}
                      </Text>
                    </View>
                  </Row>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Content>

        <Footer>
          <FooterTab style={{backgroundColor: 'black', borderTopWidth: 1}}>
            <Button onPress={() => this.props.navigation.navigate('ForYou')}>
              <Icon name="apps" style={{color: 'white'}} />
              <Text style={{color: 'white', fontWeight: 'bold'}}>For You</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Favourite')}>
              <Icon name="love" style={{color: 'yellow'}} />
              <Text style={{color: 'yellow'}}>Favorite</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('profile')}>
              <Icon name="person" style={{color: 'white'}} />
              <Text style={{color: 'white'}}>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
