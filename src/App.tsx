import * as React from "react"
import logo from "./logo.svg"
import "./App.css"
import { Blindtest } from "components/Blindtest"

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-images">
        <Blindtest />
      </div>
    </div>
  )
}

export default App
