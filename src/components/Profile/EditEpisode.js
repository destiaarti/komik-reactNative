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

export default class CreateWebtoon extends Component {
  static navigationOptions = {header: null};

  constructor() {
    super();
    this.state = {
      details: [
       
        {
          ep: '2.go home',
          date: '05 October 2019',
          image:
            'http://4.bp.blogspot.com/-rIo0DaVlZGo/UnQ0Y-MP5ZI/AAAAAAAAAD4/YCCrCttsnqY/s1600/clip-art-shin-chan-328678.jpg',
        },
        {
          ep: '1. Go Ride',
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
            borderBottomWidth: 2,
            borderBottomColor: 'black',
          }}>
          <Left>
            <TouchableOpacity>
              <Icon
                name="arrow-back"
                onPress={() => this.props.navigation.navigate('EditWebtoon')}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontWeight: 'bold'}}>Edit Episodes</Text>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon
                name="checkmark"
                onPress={() => alert('Data has been saved')}
                style={{color: 'green'}}
              />
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
                  <View style={{borderWidth: 2, margin: 5}}>
                    <Image
                      style={{
                        width: 80,
                        height: 80,
                        padding: 10,
                      }}
                      source={{uri: item.image}}
                    />
                  </View>

                  <View style={{margin: 12, alignSelf: 'center'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}>
                      {item.ep}
                    </Text>
                    <View>
                      <Text style={{marginBottom: 10}}>{item.date}</Text>
                    </View>
                  </View>
                </Row>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={{margin: 5}}>
            <Button
              onPress={() => alert('Image has been added')}
              style={{
                borderWidth: 2,
                borderColor: 'black',
                justifyContent: 'center',
                marginBottom: 7,
                backgroundColor: 'green',
              }}>
              <Text style={{color: 'white'}}>+ Image</Text>
            </Button>
            <Button
              onPress={() => alert('Data has been deleted')}
              style={{
                borderWidth: 2,
                borderColor: 'black',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}>
              <Text style={{color: 'white'}}>Delete Episode</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
