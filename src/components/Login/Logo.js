import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';


export default class Logo extends Component {
	render(){
		return(
			<View style={styles.container}>
				
					<Text style={styles.logoText1}>LOG in</Text>	
          		<Text style={styles.logoText}>Login With Your Account Webtoon!</Text>	
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  logoText : {
  	marginVertical: 15,
  	fontSize:12,
  	color:'black'
  },
  logoText1 : {
	  paddingTop:80,
	marginVertical: 10,
	fontSize:28,
	fontWeight:'bold',
	color:'brown'
}
});