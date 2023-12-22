import './App.css';
import Booklist from './components/Booklist';
import Home from './components/Home';
import {Routes,Route} from 'react-router-dom';
import Navbar  from './components/Navbar';
import Footer from './components/Footer';
import NoMatch from './components/NoMatch';
import BookDetail from './components/BookDetail';
import AddBook from './components/AddBook'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='books' element = {<Booklist/>}></Route>
        <Route path='addBook' element = {<AddBook/>}></Route>
        <Route path='footer' element = {<Footer/>}></Route>
        <Route path='*' element = {<NoMatch/>}></Route>
        <Route path='books/:bookId' element = {<BookDetail/>}></Route>
        
      </Routes>

    </div>
  );
}

export default App;
