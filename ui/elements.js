
import { Text, TouchableOpacity, StyleSheet} from 'react-native';


export const Button = ({label, color, onPress})=>{
    return(
        <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
            onPress={onPress}
            disabled={null}
          >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'tomato'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    }
   
  });