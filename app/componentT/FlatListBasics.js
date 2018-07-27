import React, { Component } from 'react';
import { 
    AppRegistry, 
    FlatList, 
    StyleSheet, 
    Text, 
    View,
    Image,
    Switch,
    Animated,
    Platform, 
    Dimensions,
    TouchableHighlight
} from 'react-native';



const ITEM_HEIGHT = 84
const ITEM_SEPARATOR_HEIGHT = 1
const VIEWABILITY_CONFIG = {
    minimumViewTime: 500,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
  };
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const {width, height} = Dimensions.get('window');
export default class FlatListBasics extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            isMultipItems: true,
        }
    }
componentDidMount(){
    this.fetchData()
}
componentWillUnmount(){
    this.timer && clearTimeout(this.timer)
}
fetchData(){
   this.timer = setTimeout(()=>{
       let dataSource = [
        {name: 'Devin'},
        {name: 'Jackson'},
        {name: 'James'},
        {name: 'Joel'},
        {name: 'John'},
        {name: 'Jillian'},
        {name: 'Jimmy'},
        {name: 'Julie'},
    ]
        this.setState({dataSource})
    },1000)
}
changeListNumColumns = (switchIsOn) => {
    this.setState({
        isMultipItems: switchIsOn,
    })
};
headerComponent = ()=>{
   return <View style={{width:width, height: 50,marginTop: 0,backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{flex:1,lineHeight:50,textAlign: 'center',alignSelf: 'center'}}>这是头部哟~</Text>
        <Switch value={this.state.isMultipItems}
            onValueChange={this.changeListNumColumns}
        />
   </View>
};
footerComponent = ()=>{
    return <View style={{width:width, height: 50,marginTop: 20,backgroundColor: 'white'}}><Text style={{flex:1,lineHeight:50,textAlign: 'center',alignSelf: 'center'}}>这是尾部哟~</Text></View>
};
emptyComponent = ()=>{
    return <View style={styles.listEmptyView}><Text style={styles.emptyText}>没有内容哟~</Text></View>
};


renderItem = ({item}) => {
return (
    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
        <Image source={require('../resource/images/bunny.png')} style={{width: ITEM_HEIGHT, height: ITEM_HEIGHT}}/>
        <Text style={this.state.isMultipItems ? styles.twoItem : styles.item}>{item.name}</Text>
    </View>
)
};

onEndReachedHandle = ()=>{
    if(this.state.dataSource.length>80)return;
    let dataSource = this.state.dataSource
    let newData = []

    dataSource = dataSource.concat([
        {name: 'Devin'},
        {name: 'Jackson'},
        {name: 'James'},
        {name: 'Joel'},
        {name: 'John'},
        {name: 'Jillian'},
        {name: 'Jimmy'},
        {name: 'Julie'},
    ])
    this.setState({dataSource})
};
keyExtractor = (item, index)=>{
    return `item${index}`
};

  render() {
    return (
      <View style={styles.container}>
        <AnimatedFlatList style={{backgroundColor: 'green'}}
         data={this.state.dataSource}
          ItemSeparatorComponent={ ({highlighted}) => (
                <View style={[styles.separator, highlighted && {marginLeft: 100}]} />
            )}
            ListEmptyComponent={this.emptyComponent}
            ListHeaderComponent={this.headerComponent}
            ListFooterComponent={this.footerComponent}
            onEndReached={this.onEndReachedHandle}
            keyExtractor={this.keyExtractor}
            key={this.state.isMultipItems ? 'twoItem' : 'oneItem'}
            numColumns= {this.state.isMultipItems ? 2 : 1}
            columnWrapperStyle={this.state.isMultipItems && styles.columnWrapperStyle}
            getItemLayout={(item, index) => (
                {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT+ITEM_SEPARATOR_HEIGHT) * index, index}
              )}
            viewabilityConfig={VIEWABILITY_CONFIG}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={styles.list}
            renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  list: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 28,
    // height: 64,
    lineHeight: 64,
    textAlign: 'center',
    backgroundColor: 'skyblue'
  },
  twoItem: {
    flex: 1,
    margin: 10,
    fontSize: 28,
    lineHeight: 64,
    textAlign: 'center',
    backgroundColor: 'skyblue'
  },
  separator: {
    height: ITEM_SEPARATOR_HEIGHT,
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  listEmptyView: {
    //   flex: 1,
        width: width,
        height: height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
  },
  emptyText: {
      flex: 1,
      fontSize: 42,
      textAlign: 'center',
      lineHeight: height,
      textDecorationLine: 'line-through',
      backgroundColor: 'skyblue'
  },
  columnWrapperStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: 'transparent'
    
  }
})


