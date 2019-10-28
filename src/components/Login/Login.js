import React, {Component} from 'react';
import {Text, Form, Item, Input, Button, Icon} from 'native-base';
import {View,Animated, Easing, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {API} from '../../config/api'
import axios from 'axios';
import StyleLogin from './StyleLogin';
import Logo from './Logo';

export default class pass extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.springValue = new Animated.Value(1);
    this.state = {
      icon: 'eye-off',
      status: true,
      buttonDisabled: true,
      email: '',
      allow: 'true',
      password: '',
      token: '',
      id: '',
    };
  }
  componentDidMount() {
    this.spring();
  }
spring() {
    this.springValue.setValue(1);
    Animated.spring(this.springValue, {
      toValue: 1.5,
      friction: 0.05,
      tension: 30,
    }).start();
  }
  login = () => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    }
   
    API.post('/register', userData)
      .then(res => {
        this.setState({
          token: res.data.token,
          id: res.data.id,
        });
        AsyncStorage.setItem('token', this.state.token);
        AsyncStorage.setItem('id', this.state.id);
        this.props.navigation.navigate('ForYou');
      })
      .catch(err => {
        console.log('axios error:', err);
      });
  };

  changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      status: !prevState.status,
    }));
  };

  emailValidation = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(email) == true && this.state.password != null) {
      this.setState({
        email,
        buttonDisabled: false,
      });
    } else {
      this.setState({
        email,
        buttonDisabled: true,
      });
    }
    this.setState({
      email,
    });
  };

  passValidation = password => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ((password != null) == true && reg.test(this.state.email) == true) {
      this.setState({
        password,
        buttonDisabled: false,
      });
    } else {
      this.setState({
        password,
        buttonDisabled: true,
      });
    }
    this.setState({
      password,
    });
  };

  render() {
    return (
      <View style={StyleLogin.container}>
      <View style={StyleLogin.loginContainer}>
      <Logo />
        </View>
        <Form>
          <Item>
            <Input
              placeholder="Email"
              onChangeText={email => this.emailValidation(email)}
            />
          </Item>
          <Item style={styles.pastContainer}>
            <Input
              secureTextEntry={this.state.status}
              placeholder="Password"
              onChangeText={password => this.passValidation(password)}
            />
            <Icon name={this.state.icon} onPress={() => this.changeIcon()} />
          </Item>
        </Form>
        <View style={{margin: 13}}>
          <Button
            success
            block
            disabled={this.state.buttonDisabled}
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 35,
            }}
            // onPress={() => this.props.navigation.navigate('ForYou')}
            // onPress={() => this.login()}
            onPress={() => this.login()}>
             <Animated.View style={{transform: [{scale: this.springValue}]}}>
                        <Text  style={StyleLogin.buttonText}>LOGIN</Text>
                        </Animated.View>
          </Button>
          <View style={{alignItems: 'center', marginTop: 19}}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{color: 'blue', fontWeight: 'bold'}}>
                Sign up here!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: 'green',
    margin: 7,
  },
  titleDesc: {
    marginTop: 20,
  },
  containerTitle: {
    alignItems: 'center',
  },
  pastContainer: {
    flexDirection: 'row',
    borderWidth: 5,
  },
};
