import { Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'RobotoSlab',
    fontStyle: 'bold',
    fontSize: 17,
    borderBottomWidth: 3
  }
})

const SectionTitle = ({ title }) => <Text style={styles.title}>{title}</Text>

export default SectionTitle
