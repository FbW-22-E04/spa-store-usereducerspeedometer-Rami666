import "./App.css";
import Car from "./components/Car";
import CarContextProvider from "./components/Context";

function App() {
  return (
    <div className="App">
      <CarContextProvider>
        <Car />
      </CarContextProvider>
      
    </div>
  );
}

export default App;
