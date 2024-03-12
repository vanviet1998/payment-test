import Routes from './routes';
import {
  RouterProvider,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
    <RouterProvider router={Routes} />
    </div>
  );
}

export default App;
