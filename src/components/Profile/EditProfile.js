import React, {Component} from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Item,
  View,
  Input,
  Body,
} from 'native-base';
import {Image, StyleSheet, SafeAreaView, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class EditProfile extends Component {
  static navigationOptions = {header: null};

  constructor() {
    super();
    this.state = {
      datas: [],
      avatar: '',
      token: '',
      id: null,
      name: '',
    };
  }

  async componentDidMount() {
    await this.getToken();
    await this.getId();
    await axios
      .get(`http:192.168.1.23:2019/api/v1/user/${this.state.id}`)
      .then(res => {
        const datas = res.data;
        this.setState({datas});
        console.log(datas);
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

  handleChoosePhoto = () => {
    const options = {
      title: 'Choose Photo',
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let tmpPhoto = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        const source = tmpPhoto;
        console.log(source);

        this.setState({
          avatar: source,
        });
      }
    });
  };

  async confirm() {
    const createFormData = (avatar, body) => {
      const data = new FormData();

      data.append('image', {
        name: avatar.fileName,
        type: avatar.type,
        uri: avatar.uri,
      });

      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });
      console.log('data', data);
      return data;
    };
    await axios
      .put(
        `http:192.168.1.23:2019/api/v1/user/${this.state.id}`,
        createFormData(this.state.avatar, {name: this.state.name}),
      )
      .then(response => {
        console.log('upload success', response);
        alert('Data diupdate');
        this.setState({avatar: ''});
        this.props.navigation.navigate('profile');
      })
      .catch(error => {
        console.log('upload error', error);
        alert('upload failed');
      });
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Icon
              name="arrow-back"
              onPress={() => {
                this.props.navigation.navigate('profile');
              }}
              style={{marginRight: 10, color: 'black'}}
            />
          </Left>
          <Body>
            <Title style={{color: 'black'}}>Edit Profile</Title>
          </Body>
          <Right>
            <Icon
              name="md-checkmark"
              onPress={() => {
                this.confirm();
              }}
              style={{marginRight: 10, color: 'green'}}
            />
          </Right>
        </Header>
        <Content>
          <SafeAreaView style={{alignItems: 'center'}}>
            <Image
              style={styles.profileImg}
              source={{uri: this.state.avatar.uri}}
            />
            <Icon
              style={{
                marginTop: -50,
                backgroundColor: 'white',
                borderRadius: 30,
                padding: 10,
                marginRight: 100,
              }}
              onPress={this.handleChoosePhoto}
              name="camera"
            />
          </SafeAreaView>
          <SafeAreaView style={{marginVertical: 15}}>
            <View style={{alignItems: 'center'}}>
              <Item style={{borderWidth: 2}}>
                <Input
                  style={styles.input}
                  onChangeText={text => this.setState({name: text})}
                  value={this.state.name}
                  placeholder={this.state.datas.name}
                />
              </Item>
            </View>
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  btnActive: {
    color: '#00D163',
  },
  profileImg: {
    marginVertical: 15,
    alignSelf: 'center',
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3,
  },
  input: {
    textAlign: 'center',
    marginHorizontal: 15,
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    color: '#000',
    borderWidth: 2,
  },
});
