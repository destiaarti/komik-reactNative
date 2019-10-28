import React, {Component} from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Row,
  Left,
  Right,
  Icon,
  Input,
  Header,
  Body,
  View,
} from 'native-base';
import {Image, Share, FlatList, TouchableOpacity} from 'react-native';

export default class CreateEpi extends Component {
  static navigationOptions = {header: null};

  constructor() {
    super();
    this.state = {
      details: [
        {
          ep: '2. Go car',
          date: '05 October 2019',
          image:
            'http://4.bp.blogspot.com/-rIo0DaVlZGo/UnQ0Y-MP5ZI/AAAAAAAAAD4/YCCrCttsnqY/s1600/clip-art-shin-chan-328678.jpg',
        },
        {
          ep: '1. Go ride',
          date: '04 October 2019',
          image:
            'http://4.bp.blogspot.com/-rIo0DaVlZGo/UnQ0Y-MP5ZI/AAAAAAAAAD4/YCCrCttsnqY/s1600/clip-art-shin-chan-328678.jpg',
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <Header
          style={{
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'black',
          }}>
          <Left>
            <TouchableOpacity>
              <Icon
                name="arrow-back"
                onPress={() => this.props.navigation.navigate('CreateWebtoon')}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontWeight: 'bold'}}>Create Episode</Text>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon name="checkmark" style={{color: 'green'}} />
            </TouchableOpacity>
          </Right>
        </Header>

        <Content style={{margin: 7}}>
          <Text style={{fontWeight: 'bold'}}>Title</Text>
          <Input style={{borderWidth: 2}}></Input>
          <View>
            <Text style={{fontWeight: 'bold'}}>Episode</Text>
            <FlatList
              data={this.state.details}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <Row>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('EditWebtoon')
                      }>
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          padding: 10,
                        }}
                        source={{uri: item.image}}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{margin: 7}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }}>
                      {item.ep}
                    </Text>
                    <View style={{flex: 1}}>
                      <Button
                        style={{
                          backgroundColor: 'red',
                          borderWidth: 2,
                          borderColor: 'black',
                        }}
                        onPress={() => alert('Data has been deleted')}>
                        <Text>Delete</Text>
                      </Button>
                    </View>
                  </View>
                </Row>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <Button
            light
            style={{
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              marginTop: 12,
              backgroundColor: 'green',
            }}
            onPress={() => alert('Image has been added')}>
            <Text style={{color: 'white'}}>+ Image</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
