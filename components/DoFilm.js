import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, SafeAreaView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import NumericInput from 'react-native-numeric-input';
import { useNavigation } from '@react-navigation/native';


const DoFilm = () => {

  //déclaration de navigation qui va nous permettre de naviger sur un autre screen
  const navigation = useNavigation();

  //permet de vérifier l'état des champs de texte
  const [fieldError, setFieldError] = useState(false);


  //Déclaration de propriété d'un film
  const [filmTitle, setTitle] = useState('');
  const [filmAuthor, setAuthor] = useState('');
  const [filmDescription, setDescription] = useState('');
  const [filmNote, setNote] = useState();
  const currentDate = new Date();

    
  // déclaration d'un liste qui contient les films
  const [films, setFilms] = useState([]);

  //va contenir les films trier
  const [filmsSorted, setFilmsSorterd] = useState([]);
  const [filmsSortedBydate, setFilmsSorterdBydate] = useState([]);


  //Function pour ajouter un film dans la liste de films
  //et renvoi un message si les champs ne sont pa remplie
  const addFilm = () => {
    const listFilms = films.slice();
    
    if(filmTitle.trim() === '')
    {
      setFieldError(true);
      Alert.alert('Veuillez renseignez un titre');

    }
    else if(filmAuthor.trim() === '')
    {
      setFieldError(true);
      Alert.alert('Veuillez renseignez un auteur');
    }
    else if(filmDescription.trim() === '')
    {
      setFieldError(true);
      Alert.alert('Veuillez renseignez une description');
    }
    else if (!isValidFilmNote()) {

       // Afficher une alerte en cas de note invalide
       Alert.alert('Note invalide', 'Veuillez entrer une note valide (chiffre entre 1 et 20).');

    } else {
     

      listFilms.push({
        id: Math.floor(Math.random()*100).toString(),
        filmTitle : filmTitle,
        filmAuthor : filmAuthor,
        filmDescription : filmDescription,
        filmNote : filmNote,
        currentDate
      })
      setFilms(listFilms);

      //cette variable recoit le tier de liste films par note
      const sorted = listFilms.slice().sort((a, b) => b.filmNote - a.filmNote);
      // setFilmsSorterd(sorted);

      // console.log("LISTE TRIER", sorted);
      const sortFilmsByDate = () => {
        // Trie les films par date
        const sortedFilmsByDate = [...films].sort((a, b) => new Date(b.currentDate) - new Date(a.currentDate));
        setFilmsSorterdBydate(sortedFilmsByDate);
        console.log(filmsSortedBydate);
      };
      
      //Remttre le champs de text vide
      setTitle('');
      setAuthor('');
      setDescription('');
      setNote(null);
      //envoie des données à home
      navigation.navigate("Home", {films: listFilms, filmsSorted: sorted});

    }
}

  const isValidFilmNote = () => {
    // Vérifier si la note est un chiffre entre 1 et 20
    const note = parseInt(filmNote, 10);
    return !isNaN(note) && note >= 1 && note <= 20;
  };

  // const onNavigate = () => {
  //   navigation.navigate("Home", {films: films});
  // };
  
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ajout de film</Text>
        <TextInput style={styles.input} placeholder='Titre du film' value={filmTitle} onChangeText={text => setTitle(text)}></TextInput>
        {/* {fieldError && <Text style={styles.errorText}>Champ obligatoire</Text>} */}
        <TextInput style={styles.input} placeholder='Auteur' value={filmAuthor} onChangeText={ text => setAuthor(text)}></TextInput>
        <TextInput multiline = {true} numberOfLines = {100} style={styles.textarea} placeholder='Description' value={filmDescription} onChangeText={ text => setDescription(text)}></TextInput>
        <TextInput keyboardType='numeric' maxLength={2} style={styles.input} placeholder='Note/20' value={filmNote} onChangeText={ text => setNote(text)}></TextInput>
        <TouchableOpacity onPress={addFilm}>
          <View style={styles.addWrapper}>
            <Text style={styles.addFilm}>Ajouter</Text>
          </View>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center'
    },

    title: {
      fontSize: 48,
      fontWeight: 'bold'
    }, 

    input: {
      borderWidth: 1,
      padding: 15,
      marginTop: 30,
      width: '80%',
      backgroundColor: '#E8EAED',
      borderColor: '#D9D9D9',
      borderRadius: 7,
    },

    textarea:{
      borderWidth: 1,
      padding: 15,
      marginTop: 30,
      width: '80%',
      backgroundColor: '#E8EAED',
      borderColor: '#D9D9D9',
      borderRadius: 7,
      height: 150,
      justifyContent: "flex-start"
    },

    addWrapper: {
      width: '80%',
      backgroundColor: '#80D4DA',
      borderRadius: 7,
      padding: 15,
      marginTop: 30,
    },

    addFilm: {
      color: '#fff',
      fontWeight: 800
    }, 

    num: {
      width: '80%',

    }
  });
export default DoFilm