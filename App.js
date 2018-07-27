
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  DeviceEventEmitter,  
  View
} from 'react-native';
import SectionListBasics from './app/componentT/SectionListBasics'
import FlatListBasics from './app/componentT/FlatListBasics'
import FlatListSwipe from './app/componentT/FlatListSwipe'
import Toast, {DURATION} from 'react-native-easy-toast'

export default class App extends Component {
  componentDidMount(){
    this.showToastListener = DeviceEventEmitter.addListener('appShowToastListener',(tipText)=>{
      this.refs.toast.show(tipText);
    });
  }
  componentWillUnmount(){
    this.showToastListener && this.showToastListener.remove();
  }
  render() {
    let toast = <Toast
            ref="toast"
            style={{backgroundColor:'#000'}}
            position='bottom'
            positionValue={150}
            fadeInDuration={150}
            fadeOutDuration={500}
            opacity={0.95}
            textStyle={{color:'#fff'}}
        />;
    return (
      <View style={styles.container}>
      <FlatListSwipe />
      {toast}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})