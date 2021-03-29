import logo from './logo.svg';
import './App.css';


const ViewOne = ({onClick}) => (
  <div>
    View 1 <br />
    <button onClick={() => onClick("view2")}>Go to view 2</button>
  </div>
);

const ViewTwo = ({onClick}) => (
  <div>
    View 2 <br />
    <button onClick={() => onClick("view1")}>Go to view 1</button>
  </div>
);


function App() {
  return (
    <div className="App">
      <button>Hello</button>
    </div>
  );
}

export default App;
