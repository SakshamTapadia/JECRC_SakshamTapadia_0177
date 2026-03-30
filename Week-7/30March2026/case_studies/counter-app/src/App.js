
import './App.css';
import Counter from './components/counter';
import StateVsPropsDemo from './components/StatevsPropDemo';
import TempratureConverter from './components/TempratureConverter';

function App() {
  return(
    <div className="App">
      {<Counter />}
      {<StateVsPropsDemo />}
      {<TempratureConverter />}
    </div>
  )
}

export default App;