import React, {Component} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Share,
} from 'react-native';
import {Container, Content, Header, Footer, Row, Icon} from 'native-base';

export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [
        // {
        //   ep: 'Ep.4',
        //   date: '07 October 2019',
        //   image:
        //     'https://cdn.imagecomics.com/assets/i/releases/3344/rose-vol-1-tp_65f5bec524.jpg',
        //   content: [
        //     'https://2.bp.blogspot.com/jXtASSEPGQ8rQCyfOxQPwWdIFBWByzZ4yJMbvO3_MlXVu-mvtg7IE8JIvzuln_elP7u62C7WVQ19WLeICUUhxyS05bYBus9RAedX7xg2gieWoVMSy5KD-PxVsIAPbkgv5coYZJtCAw=s1600',
        //     'https://2.bp.blogspot.com/ZEzW7QKkvF1FcYUzLBiJlcluPtAVXV5GLUreHLgdsAI5eqknV1ONNZEuTJxFUJ0OgP40MiLGYpP2Q-7cjnELPBJhExRnjuqFchrO2rt6bMDgDp8GWa9Xoz8IH_OUOKcI8Pf1XaopLA=s1600',
        //   ],
        // },
        // {
        //   ep: 'Ep.3',
        //   date: '06 October 2019',
        //   image:
        //     'https://images-na.ssl-images-amazon.com/images/I/A1PP0yoz%2BbL.jpg',
        // },
        // {
        //   ep: 'Ep.2',
        //   date: '05 October 2019',
        //   image:
        //     'https://images-na.ssl-images-amazon.com/images/I/61mv4EJj9wL._SX331_BO1,204,203,200_.jpg',
        // },
        // {
        //   ep: 'Ep.1',
        //   date: '04 October 2019',
        //   image:
        //     'https://images-na.ssl-images-amazon.com/images/I/612bK1krzxL._SX319_BO1,204,203,200_.jpg',
        // },
      ],
      id: props.navigation.getParam('toonid'),
    };
  }

  componentDidMount() {
    axios
      .get(`http://192.168.1.67:2019/api/v1/webtoon/${this.state.id}/episodes`)
      .then(res => {
        const data = res.data;
        console.log(data);
        this.setState({details: data});
      })
      .catch(error => {
        console.log('Api call error');
      });
  }

  //Settingan untuk header
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title'),
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // untuk menanmpilkan ikon header share di sebelah kanan
      headerRight: (
        <Icon
          type="FontAwesome"
          name="share-alt"
          onPress={() => Share.share({message: '???'})}
        />
      ),
    };
  };

  render() {
    return (
      <Container style={{backgroundColor:'#F5DEB3'}}>
        <Content>
          <View style={{marginBottom: 5, alignItems: 'center'}}>
            {/* <Text>Title : {this.props.navigation.getParam('title')}</Text> */}
            <View style={{borderWidth: 2}}>
              <Image
                style={{
                  width: 360,
                  height: 195,
                  resizeMode: 'contain',
                }}
                source={{uri: this.props.navigation.getParam('image')}}
              />
            </View>
          </View>

          <View>
            <FlatList
              data={this.state.details}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View key={item.image}>
                  <Row style={{margin: 11}}>
                    <TouchableOpacity
                      style={{borderWidth: 2, margin: 7}}
                      onPress={() =>
                        this.props.navigation.navigate('DetailEp', {
                          title: item.episode,
                          image: item.image,
                          toonid: this.props.navigation.getParam('toonid'),
                          epiId: item.id,
                        })
                      }>
                      <Image
                        style={{width: 56, height: 85, resizeMode: 'contain'}}
                        source={{uri: item.image}}
                      />
                    </TouchableOpacity>
                    <View style={{margin: 5}}>
                      <Text style={{fontWeight: 'bold'}}>{item.episode}</Text>
                      <Text>{item.createdAt}</Text>
                    </View>
                  </Row>
                </View>
              )}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
