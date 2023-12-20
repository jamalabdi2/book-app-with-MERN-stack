import './App.css';
import Booklist from './components/Booklist';
import Home from './components/Home';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='books' element = {<Booklist/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
