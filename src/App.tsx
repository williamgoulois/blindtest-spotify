import swal from "sweetalert"
import * as React from "react"
import logo from "./logo.svg"
import loading from "./loading.svg"
import "./App.css"
import Button from "./components/Button"
import { useCallback, useEffect, useState } from "react"
import AlbumCover from "./components/AlbumCover"

import SoundPreview from "./components/SoundPreview"

export const EmptyTrack: Track = {
  name: "",
  id: "",
  album: { images: [{ height: 0, url: "" }] },
  preview_url: "",
}

function shuffleArray(array: Track[]) {
  if (array === undefined) return
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j] ?? EmptyTrack, array[i] ?? EmptyTrack]
  }
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x: number, excludeNumbers?: number[]) {
  let randomNumber = Math.floor(Math.random() * x)
  if (excludeNumbers === undefined) {
    return randomNumber
  }
  while (excludeNumbers.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * x)
  }
  return randomNumber
}

type SpotifyAPIResponse = {
  items: Item[]
}

type Item = {
  added_at: Date
  track: Track
}

export type Track = {
  name: string
  id: string
  album: Album
  preview_url: string
}

type Album = {
  images: AlbumImage[]
}

type AlbumImage = {
  height: number
  url: string
}

export type TrackWithIndex = {
  track: Track
  index: number
}

const App = () => {
  const [tracks, setTracks] = useState<Item[]>([])
  const [currentTrack, setCurrentTrack] = useState({ track: EmptyTrack, index: -1 })

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/tracks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_SPOTIFY_API_TOKEN,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw new Error(`Received response status : ${response.status}`)
        }
      })
      .then((data: SpotifyAPIResponse) => {
        setTracks(data.items)
        const randomIndex = getRandomNumber(data.items.length)
        setCurrentTrack({
          track: data.items[randomIndex]?.track ?? EmptyTrack,
          index: randomIndex,
        })
      })
      .catch((error) => swal("Fail to fetch Spotify API", error.toString(), "error"))
  }, [])

  const getNewTrack = useCallback(() => {
    if (tracks === undefined) {
      return
    }
    const randomIndex = getRandomNumber(tracks.length, [currentTrack.index])
    setCurrentTrack({
      track: tracks[randomIndex]?.track ?? EmptyTrack,
      index: randomIndex,
    })
  }, [tracks, currentTrack])

  useEffect(() => {
    if (currentTrack.index === -1) {
      return
    }
    const timeout = setTimeout(() => getNewTrack(), 30000)
    return () => clearTimeout(timeout)
  }, [currentTrack, getNewTrack])

  if (tracks === undefined || currentTrack.index === -1) {
    return (
      <div className="App">
        <img src={loading} className="App-logo" alt="logo" />
      </div>
    )
  }

  const checkAnswer = (id: string) => {
    if (id === currentTrack.track.id) {
      swal("Bravo", "Tu as gagné", "success").then(() => getNewTrack())
    } else {
      swal("Raté", "Ce n'est pas la bonne réponse", "error")
    }
  }

  const secondTrackIndex = getRandomNumber(tracks.length, [currentTrack.index])
  const thirdTrackIndex = getRandomNumber(tracks.length, [currentTrack.index, secondTrackIndex])

  const firstTrack = currentTrack.track
  const secondTrack = tracks[secondTrackIndex]?.track
  const thirdTrack = tracks[thirdTrackIndex]?.track

  const propositions = [firstTrack, secondTrack ?? EmptyTrack, thirdTrack ?? EmptyTrack]

  shuffleArray(propositions)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {tracks.length > 0 && (
          <h1 className="App-title">{`Bonjour, il y a ${tracks.length} musiques`}</h1>
        )}
      </header>
      <div className="App-images">
        <AlbumCover style={{ height: 400, width: 400 }} track={currentTrack.track ?? EmptyTrack} />
        <SoundPreview previewUrl={currentTrack.track.preview_url ?? undefined} />
      </div>
      <div className="App-buttons">
        {currentTrack.index !== -1 &&
          propositions.map((track) => {
            return (
              <Button key={track.id} onClick={() => checkAnswer(track.id)}>
                {track.name}
              </Button>
            )
          })}
      </div>
    </div>
  )
}

export default App
