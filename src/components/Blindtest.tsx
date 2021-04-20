import swal from "sweetalert"
import * as React from "react"
import loading from "loading.svg"
import { Button } from "components/Button"
import { useCallback, useEffect, useMemo, useReducer } from "react"
import { AlbumCover } from "components/AlbumCover"

import SoundPreview from "components/SoundPreview"
import { useFetch } from "hooks/useFetch"
import { getRandomNumber, shuffleArray } from "utils/functions"

export type SpotifyAPIResponse = {
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

const INIT = "INIT"
const NEW_TRACK = "NEW_TRACK"

type ReducerState = {
  tracks: Item[] | undefined
  currentIndex: number | undefined
}

type ReducerAction = { type: typeof INIT; payload: Item[] } | { type: typeof NEW_TRACK }

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case INIT:
      return { tracks: action.payload, currentIndex: getRandomNumber(action.payload.length) }
    case NEW_TRACK:
      if (state.tracks === undefined) {
        return state
      }
      return state.currentIndex !== undefined
        ? {
            tracks: state.tracks,
            currentIndex: getRandomNumber(state.tracks.length, [state.currentIndex]),
          }
        : {
            tracks: state.tracks,
            currentIndex: getRandomNumber(state.tracks.length),
          }
    default:
      return state
  }
}

export const Blindtest = () => {
  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_SPOTIFY_API_TOKEN,
      },
    }),
    [],
  )
  const { data, error, isLoading } = useFetch<SpotifyAPIResponse>(
    "https://api.spotify.com/v1/me/tracks",
    options,
  )

  const [state, dispatch] = useReducer(reducer, { tracks: undefined, currentIndex: undefined })

  useEffect(() => {
    if (data !== undefined) {
      dispatch({ type: INIT, payload: data.items })
    }
  }, [data])

  const checkAnswer = useCallback(
    (id: string) => {
      if (state.tracks === undefined || state.currentIndex === undefined) {
        return
      }
      if (id === state.tracks[state.currentIndex].track.id) {
        swal("Bravo", "Tu as gagné", "success").then(() => dispatch({ type: NEW_TRACK }))
      } else {
        swal("Raté", "Ce n'est pas la bonne réponse", "error")
      }
    },
    [state.tracks, state.currentIndex],
  )

  useEffect(() => {
    const timeout = setTimeout(() => dispatch({ type: NEW_TRACK }), 30000)
    return () => clearTimeout(timeout)
  }, [state.currentIndex])

  if (error !== undefined) {
    return <div>{error.message}</div>
  }
  if (isLoading) {
    return (
      <div className="App">
        <img src={loading} className="App-logo" alt="logo" />
      </div>
    )
  }
  if (state.tracks !== undefined && state.currentIndex !== undefined) {
    const secondTrackIndex = getRandomNumber(state.tracks.length, [state.currentIndex])
    const thirdTrackIndex = getRandomNumber(state.tracks.length, [
      state.currentIndex,
      secondTrackIndex,
    ])

    const firstTrack = state.tracks[state.currentIndex].track
    const secondTrack = state.tracks[secondTrackIndex].track
    const thirdTrack = state.tracks[thirdTrackIndex].track

    const propositions = shuffleArray([firstTrack, secondTrack, thirdTrack])
    return (
      <>
        <>
          <h1 className="App-title">{`Bonjour, il y a ${state.tracks.length} musiques`}</h1>
          <div className="App-images">
            <AlbumCover
              style={{ height: 400, width: 400 }}
              track={state.tracks[state.currentIndex].track}
            />
            <SoundPreview previewUrl={state.tracks[state.currentIndex].track.preview_url} />
          </div>
          <div className="App-buttons">
            {propositions.map((track) => {
              return (
                <Button key={track.id} onClick={() => checkAnswer(track.id)}>
                  {track.name}
                </Button>
              )
            })}
          </div>
        </>
      </>
    )
  } else {
    return null
  }
}
