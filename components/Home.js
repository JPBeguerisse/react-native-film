import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Home = ({navigation, route}) => {

  //Déclarer un state qui va contenir les films trier par note
  const [sortedFilms, setSortedFilms] = useState([]);

  //pour gérer l'affiche du flatList
  const [isFlatListVisible, setIsFlatListVisible] = useState(false);

  const [tryNote, setTryNote] = useState(true);

  // methode qui va nous retourner un film qu'on utilisera dans le flastlist
  //Flatlist nous parcours la liste de notre film une par une puis l'envoyer à renderItem qui va nous les retourner comme renderFilm
  const renderFilm = ({item}) => {
    return(
        //<Text>{item.filmTitle} {item.filmAuthor} {item.filmDescription} {item.filmNote}</Text>
        <View style={styles.film}>
          <Text style={styles.titleFilm}>{item.filmTitle} </Text>
          <Text style={styles.author}>Auteur | {item.filmAuthor} </Text>
          <Text style={styles.description}>{item.filmDescription} </Text>
          <Text style={styles.note}>{item.filmNote}</Text>
          <Text>{item.currentDate.toString()}</Text>
        </View>
       
    ) 
  }

    //trier les films par notes
    const sortFilmsByNote = () => {
      if(route.params)
     {
      setTryNote(false);
      //console.log(route.params);
      }
    }


    //ne pas trier les films
    const noSort = () => {
      if(route.params)
     {
      setTryNote(true);
      }
    }
    
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Liste des films</Text>
        <View style={{ 
          height: 1,
          backgroundColor: 'black'
        }} />
        <View style={styles.wrapperBtn}>
        <TouchableOpacity onPress={noSort}>
            <View style={styles.wrapperFilterName}>
              <Text style={styles.btnFilterName}>No Try</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.wrapperFilterName}>
              <Text style={styles.btnFilterName}>Trier par date</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={sortFilmsByNote}>
            <View style={styles.wrapperFilterName}>
              <Text style={styles.btnFilterName}>Trier par note</Text>
            </View>
          </TouchableOpacity>
        </View>
        {
          route.params && ( ()=>{
            const {films, filmsSorted} = route.params;
            return(
              <View>
                {tryNote && <FlatList data={films} renderItem={renderFilm}/>}
                {/* {isFlatListVisible && <FlatList data={films} renderItem={renderFilm}/>} */}
                {!tryNote && <FlatList data={filmsSorted} renderItem={renderFilm}/>}
              </View>
              ); 
            }
          )()
        }
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 30
    },

    title: {
      fontSize: 48,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center'
    },

    film: {
      backgroundColor: '#FCFAFA',
      width: '100%',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      borderBottomWidth: 1
    }, 

    titleFilm: {
      width: '100%',
      fontSize: 24,
      fontWeight: 600
    },

    author: {
      fontSize: 18,
    },
    
    wrapperBtn: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: 20,
      marginRight: 10,
      justifyContent: 'flex-end',
      marginBottom: 10,
      width : '100%'
    },

    wrapperFilterName: {
      backgroundColor: '#80D4DA',
      borderRadius: 7,
      padding: 15,
      marginTop: 30,
    },

    btnFilterName: {
      color: '#fff',
      fontWeight: 800
    }, 
  });
export default Home;