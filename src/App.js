import './App.css';
import './style/root.scss'

import Board from './componunts/Board';
const App = () => {
  return(
    <div className='app'>
      <h1>TIC TAC TOI</h1>
      <Board/>
    </div>
  );
};

export default App;

