import logo from './logo.svg';
import './App.css';


const AddDoc = ({onClick}) => (
  <div>
    <button onClick={() => onClick("addDoc")}>Add Documentation to Bot</button>
  </div>
);

const ViewDoc = ({onClick}) => (
  <div>
    <button onClick={() => onClick("viewDoc")}>View Available Documentation</button>
  </div>
);

const UserCom = ({onClick}) => (
  <div>
    <button onClick={() => onClick("userCom")}>Check User Communication with Bot</button>
  </div>
);


function App() {
  return (
    <div className="box">
      <div className="buttonContainer">
        <AddDoc></AddDoc>
        <ViewDoc></ViewDoc>
        <UserCom></UserCom>
      </div>
    </div>
  );
}

export default App;
