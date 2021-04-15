/*global swal*/

import * as React from "react"
import logo from "./logo.svg"
import loading from "./loading.svg"
import "./App.css"
import Sound from "react-sound"
import Button from "./Button"

const apiToken = "<<Copiez le token de Spotify ici>>"

function shuffleArray(array: number[]) {
  let counter = array.length

  while (counter > 0) {
    let index = getRandomNumber(counter)
    counter--
    let temp = array[counter]
    array[counter] = array[index] ?? 0
    array[index] = temp ?? 0
  }

  return array
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x: number) {
  return Math.floor(Math.random() * x)
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Blindtest React</h1>
      </header>
      <div className="App-images">
        <p>Il va falloir modifier le code pour faire un vrai Blindtest !</p>
      </div>
      <div className="App-buttons"></div>
    </div>
  )
}

export default App
