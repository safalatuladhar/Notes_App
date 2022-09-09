import NotesList from './components/NotesList';
import {useState, useEffect } from 'react';
import {nanoid} from 'nanoid';
import Search from './components/Search';
import Header from './components/Header';

const App = () =>{
  const [notes, setNotes] = useState([
    {
    id: nanoid(),
    text: "Hi!! This is first note",
    date: "09/09/2022",
  },
  {
    id: nanoid(),
    text: "Hi!! This is second note",
    date: "02/09/2022",
  },
  {
    id: nanoid(),
    text: "Hi!! This is third note",
    date: "11/09/2022",
  },
  {
    id: nanoid(),
    text: "Hi!! This is fourth note",
    date: "07/06/2022",
  },
  {
    id: nanoid(),
    text: "Hi!! This is fifth note",
    date: "07/06/2022",
  },
]);

const [searchText, setSearchText] = useState('');

const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
  );

  if (savedNotes) {
    setNotes(savedNotes);
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    'react-notes-app-data',
    JSON.stringify(notes)
  );
}, [notes]);



const addNote = (text) =>{
 const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleDateString(),
  };

  const newNotes = [...notes, newNote];
  setNotes(newNotes);
};

const deleteNote = (id) => {
  const newNotes = notes.filter((note)=> note.id !== id);
  setNotes(newNotes);

}

  return (

    <div className={`${darkMode && 'dark-mode'}`}>
          <div className='container'>
          <Header handleToggleDarkMode = {setDarkMode} />
          <Search handleSearchNote = {setSearchText} />
        <NotesList 
        notes={notes.filter((note)=> note.text.toLowerCase().includes(searchText)
          )} 
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      
      /> 
    </div>
    </div>
 
  );

};

export default App;