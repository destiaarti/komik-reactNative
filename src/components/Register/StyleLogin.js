
import { StyleSheet } from 'react-native';


module.exports = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: 'white'
    },
    loginContainer: {
        alignItems:'center',
        justifyContent:'center'

    },
    logo: {
       height:200,
       width:200
    },
    input:{
        marginHorizontal: 15,
        height: 40,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        color: '#000',
        borderRadius:15,
        borderColor:'gray',
        borderWidth:0.8

    },
    btnActive:{
        borderRadius:44,
        backgroundColor: '#2F4F4F',
        marginHorizontal:48,
        paddingVertical: 15
    },
    btnDisable:{
        borderRadius:44,
        backgroundColor: 'gray',
        marginHorizontal:48,
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    showhide:{
        color:"rgba(10,10,10,0.5)"
    },
    touch:{
        position:'absolute',
        bottom:18, 
        right:'10%'
    }
})

