import palette from '@/theme/palette'
import { View, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 9,
    marginRight: 25,
    marginBottom: 4
  },
  icon: fontStyle => ({
    fontFamily: 'FontAwesome',
    fontStyle,
    marginRight: 4,
    color: palette.blue
  }),
  text: {
    fontFamily: 'Lato',
    fontStyle: 'normal'
  }
})

export default ({ icon, text, fontStyle = 'solid', style = {} }) => (
  <View style={{ ...styles.container, ...style }}>
    <Text style={styles.icon(fontStyle)}>{icon}</Text>
    <Text style={styles.text}>{text}</Text>
  </View>
)
