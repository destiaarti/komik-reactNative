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
          ep: 'Ep.3',
          date: '06 October 2019',
          image:
            'http://4.bp.blogspot.com/-rIo0DaVlZGo/UnQ0Y-MP5ZI/AAAAAAAAAD4/YCCrCttsnqY/s1600/clip-art-shin-chan-328678.jpg',
        },
        {
          ep: 'Ep.2',
          date: '05 October 2019',
          image:
            'http://4.bp.blogspot.com/-rIo0DaVlZGo/UnQ0Y-MP5ZI/AAAAAAAAAD4/YCCrCttsnqY/s1600/clip-art-shin-chan-328678.jpg',
        },
        {
          ep: 'Ep.1',
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
                onPress={() => this.props.navigation.navigate('Mywebtoon')}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontWeight: 'bold'}}>Edit Webtoon</Text>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon
                name="checkmark"
                style={{color: 'green'}}
                onPress={() => alert('Data has been saved')}
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
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('EditEpisode')
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
              onPress={() => alert('Data has been added')}
              style={{
                borderWidth: 2,
                borderColor: 'black',
                justifyContent: 'center',
                marginBottom: 7,
                backgroundColor: 'green',
              }}>
              <Text>+ Add Episodes</Text>
            </Button>
            <Button
              onPress={() => alert('Data has been deleted')}
              style={{
                borderWidth: 2,
                borderColor: 'black',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}>
              <Text style={{color: 'white'}}>Delete Webtoon</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
