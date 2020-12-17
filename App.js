import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const buttons = ['C', 'DEL', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#FF6666',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      minHeight: '54%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    }
  })

  const handleInput = (btnPressed) => {
    if (btnPressed === '+' || btnPressed === '-' || btnPressed === '*' || btnPressed === '/') {
      setCurrentNumber(currentNumber + btnPressed);
      return;
    }

    switch (btnPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'C':
        setLastNumber('');
        setCurrentNumber('');
        return
      case '=':
        setLastNumber(currentNumber + '=');
        calculate()
        return;
    }
    setCurrentNumber(currentNumber + btnPressed);
  }

  const calculate = () => {
    let lastArr = currentNumber[currentNumber.length - 1]
    if (lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
      setCurrentNumber(currentNumber);
    }
    else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      return;
    }
  }

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Icon name={darkMode ? 'light-up' : 'moon'} size={24}
            color={darkMode ? 'white' : 'black'}
            onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((btn) =>
          btn === '=' || btn === '/' || btn === '*' || btn === '-' || btn === '+' ?
            <TouchableOpacity key={btn} style={[styles.button, { backgroundColor: '#FF6666' }]} onPress={() => handleInput(btn)}>
              <Text style={[styles.textButton, { color: 'white', fontSize: 28 }]}>{btn}</Text>
            </TouchableOpacity>
            : btn === 0 ?
              <TouchableOpacity key={btn} style={[styles.button, {
                backgroundColor: typeof (btn) === 'number' ?
                  darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%'
              }]} onPress={() => handleInput(btn)}>
                <Text style={styles.textButton}>{btn}</Text>
              </TouchableOpacity>
              : btn === '.' || btn === 'DEL' ?
                <TouchableOpacity key={btn} style={[styles.button, { backgroundColor: btn === '.' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '37%' }]}
                  onPress={() => handleInput(btn)}
                >
                  <Text style={styles.textButton}>{btn}</Text>
                </TouchableOpacity>
                : btn === 'C' ?
                  <TouchableOpacity key={btn} style={[styles.button, { backgroundColor: typeof (btn) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed', minWidth: '36%' }]}
                    onPress={() => handleInput(btn)}
                  >
                    <Text style={styles.textButton}>{btn}</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity key={btn} style={[styles.button, { backgroundColor: typeof (btn) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#ededed' }]}
                    onPress={() => handleInput(btn)}
                  >
                    <Text style={styles.textButton}>{btn}</Text>
                  </TouchableOpacity>

        )}
      </View>
    </View>
  )

}

