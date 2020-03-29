import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    
      container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection:'column',
        backgroundColor: "#444444",
        color: "#efefef"
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      markerDescription:{
        flexDirection:'column',
        alignItems:'center',
        padding:5,color:'#fff',
        textAlign:'center',
        backgroundColor:'#333',
        color:"#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
       }
})