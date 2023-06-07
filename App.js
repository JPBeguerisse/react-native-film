import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './components/Home';
import DoFilm from './components/DoFilm';



// notre nav bottom
const tab = createBottomTabNavigator();

//composant accueil
function AccueilScreen()
{
  return(
    <View style={styles.container}>
      <Text>Accueil</Text>
     </View>
  );
}

//composant params
function ParamsScreen()
{
  return(
    <View style={styles.container}>
      <Text>Paramètre</Text>
     </View>
  );
}

export default function App() {
  return (// creation de notre navigator qui nous permet de naviger sur les autres screens
    <NavigationContainer>
      <tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if(route.name == "Home"){
              iconName = "home";
            }
            else if(route.name == "DoFilm")
            {
              iconName = "add";
            }
            return <Ionicons name={iconName} size={25} />
          } 
        })}
      >
        <tab.Screen name='Home' component={Home}/>
        <tab.Screen name='DoFilm' component={DoFilm}/>
      </tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
