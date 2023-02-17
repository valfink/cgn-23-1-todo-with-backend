import React from 'react';
import './App.css';
import Header from "./component/Header";
import FilterBar from "./component/FilterBar";

function App() {
  return (
    <div className="App">
      <Header />
      <FilterBar
          buttons={
          [
              {value: "All", isSelected: true},
              {value: "New", isSelected: false},
              {value: "Doing", isSelected: false},
              {value: "Done", isSelected: false},
          ]
      }
      />
    </div>
  );
}

export default App;
