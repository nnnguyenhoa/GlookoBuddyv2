import React, {Component, SectionList} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Image, TouchableOpacity, ScrollView } from 'react-native';
import Firebase from '../config/Firebase';
// Gotten from bootdey.com/react-native-snippet/23/Profile-ui-example

class UserInfo extends Component {
	state = {
		currUser: Firebase.auth().currentUser.uid,
		BGL: []
	}
    setArray(returnArray){
                this.setState({
                       BGL: returnArray
                });
    }
  render() {

  	Firebase.database().ref('/users/' + this.state.currUser + '/Profile/').once('value', snapshot => {
            var firstname = snapshot.child('FirstName').val();
            var lastname = snapshot.child('LastName').val();
            var age = snapshot.child('Age').val();
            var weight = snapshot.child('Weight').val();
            var city = snapshot.child('City').val();
            var state = snapshot.child('State').val();
            var type = snapshot.child('Type_ofDiabetes').val();


        	this.setState({
              FirstName: firstname,
              LastName: lastname,
              Age: age,
              Weight: weight,
              City: city,
              State: state,
              Type_ofDiabetes: type,
            });
        });
        //Firebase.database().ref('/users/' + this.state.currUser + '/Analytics/BloodGlucoseLog').once('value', snapshot => {
        Firebase.database().ref('/users/' + this.state.currUser + '/Analytics/BloodGlucoseLog').once("value").then(function(snapshot) {
            var returnArray = []
            snapshot.forEach(function(childSnapshot) {
                  //var key = childSnapshot.key;
                  var childData = childSnapshot.val();
                  console.log("Data from firebase: ",childData)
                  returnArray.push(childData);
            });
            console.log(returnArray);
            //this.setArray(returnArray);
        });

    return (
    	<View style = {styles.foundation}>
    		<View style = {styles.header}>
    			<Image
		          style={styles.avatar}
		          source={require('../assets/Prof_PH.png')}
		        />
    		</View>
    		
	    	<View style = {styles.infoList}>
	    		<ScrollView>
	    			<Text style={styles.large}>Personal</Text>
                    <Text style={styles.body}>{this.state.FirstName}, {this.state.LastName}</Text>
                    <Text style={styles.body}>Age = {this.state.Age} Weight = {this.state.Weight}</Text>
                    <Text style={styles.body}>{this.state.City}, {this.state.State}</Text>

                    <Text style={styles.large}>Health</Text>
                    <Text style={styles.body}>Type of Diabetes: Type {this.state.Type_ofDiabetes}</Text>

				</ScrollView>
	    	</View>
    		
    		<View style = {styles.footer}>
    			<View style= {styles.button}>
    				<TouchableOpacity onPress={() => this.props.navigation.navigate('Splash')}>
								  <Text style={styles.large}>Back</Text>
                	</TouchableOpacity>
    			</View>
    			<View style= {styles.button}>
    				<TouchableOpacity onPress={() => this.props.navigation.navigate('Chatbot')}>
								  <Text style={styles.large}>Continue</Text>
                	</TouchableOpacity>
    			</View>
    		</View>
    	</View>
    );
  }
}

// -------------------------- Style sheets --------------------------
const styles = StyleSheet.create({
foundation: {
	flex: 1,
	backgroundColor: '#fff',
  },
body: {
    //marginTop: 40,
    alignSelf: 'center',
},
header: {
	flex: 1,
	backgroundColor: '#0085FF',
	alignItems: 'center',
    justifyContent: 'center',
},
infoList: {
	flex: 3,
	backgroundColor: '#fff',
},
footer: {
	flex: 1,
	backgroundColor: '#0085FF',
	flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
avatar: {
	width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#2E3438',
    alignItems: 'center',
    justifyContent:'center',
},
large: {
	fontSize: 40,
	alignSelf: 'center',
},
button: {
	margin: 20,
},
});

export default UserInfo;
