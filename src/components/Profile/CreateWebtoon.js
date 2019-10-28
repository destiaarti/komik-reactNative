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
          ep: 'Ep.7',
          date: '05 October 2019',
          image:
            'https://i.pinimg.com/236x/d4/9b/08/d49b08b93fef7e7a9ca1d6f2194937cc--crayon-shin-chan-cartoon-characters.jpg',
        },
        {
          ep: 'Ep.8',
          date: '04 October 2019',
          image:
            'https://2.bp.blogspot.com/-Nl8R6Y7Qtz8/VYt92jodcfI/AAAAAAAAAWo/ovAU0rQX4A4/s320/t9eo9qguxdlnvivvhp4a6cc84b1f6b6_shi.jpg',
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <TouchableOpacity>
              <Icon
                name="arrow-back"
                onPress={() => this.props.navigation.navigate('MyWebtoon')}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={{fontWeight: 'bold'}}>Create Webtoon</Text>
          </Body>
          <Right>
            <TouchableOpacity>
              <Icon
                name="checkmark"
                style={{color: 'green'}}
                onPress={() => alert('Data Berhasil Diubah')}
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
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('CreateEpi')
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

          <Button
            onPress={() => alert('Successfully added new episodes')}
            style={{
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              backgroundColor: 'green',
            }}>
            <Text>+ Add Episodes</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
