import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB30',
  },
  card: {
    width: 350,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  input: {
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ecf0f1',
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
  },
  // Use a single common button style for both Register and Forgot Password buttons
  commonButton: {
    color: 'white',
    backgroundColor: '#ff5733', // Change this to your desired color
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 5,  // Added margin to separate the "Login" button and text
  },
  // Merge your existing styles here
  test1: {
    flex: 1,
    backgroundColor: '#ff20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test2: {
    flex: 1,
    backgroundColor: '#ff5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
