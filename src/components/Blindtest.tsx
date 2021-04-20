import swal from "sweetalert"
import * as React from "react"
import loading from "loading.svg"
import { Button } from "components/Button"
import { useCallback, useEffect, useMemo, useState } from "react"
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

  const [tracks, setTracks] = useState<Item[] | undefined>(undefined)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | undefined>(undefined)

  const getNewTrack = useCallback(() => {
    if (tracks === undefined) {
      return
    }
    currentTrackIndex !== undefined
      ? setCurrentTrackIndex(getRandomNumber(tracks.length, [currentTrackIndex]))
      : setCurrentTrackIndex(getRandomNumber(tracks.length))
  }, [tracks, currentTrackIndex])

  useEffect(() => {
    if (data !== undefined) {
      setTracks(data.items)
    }
  }, [data])

  useEffect(() => {
    if (tracks !== undefined) setCurrentTrackIndex(getRandomNumber(tracks.length))
  }, [tracks])

  const checkAnswer = useCallback(
    (id: string) => {
      if (tracks === undefined || currentTrackIndex === undefined) {
        return
      }
      if (id === tracks[currentTrackIndex].track.id) {
        swal("Bravo", "Tu as gagné", "success").then(() => getNewTrack())
      } else {
        swal("Raté", "Ce n'est pas la bonne réponse", "error")
      }
    },
    [tracks, currentTrackIndex, getNewTrack],
  )

  useEffect(() => {
    const timeout = setTimeout(() => getNewTrack(), 30000)
    return () => clearTimeout(timeout)
  }, [currentTrackIndex, getNewTrack])

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
  if (tracks !== undefined && currentTrackIndex !== undefined) {
    const secondTrackIndex = getRandomNumber(tracks.length, [currentTrackIndex])
    const thirdTrackIndex = getRandomNumber(tracks.length, [currentTrackIndex, secondTrackIndex])

    const firstTrack = tracks[currentTrackIndex].track
    const secondTrack = tracks[secondTrackIndex].track
    const thirdTrack = tracks[thirdTrackIndex].track

    const propositions = shuffleArray([firstTrack, secondTrack, thirdTrack])
    return (
      <>
        <>
          <h1 className="App-title">{`Bonjour, il y a ${tracks.length} musiques`}</h1>
          <div className="App-images">
            <AlbumCover
              style={{ height: 400, width: 400 }}
              track={tracks[currentTrackIndex].track}
            />
            <SoundPreview previewUrl={tracks[currentTrackIndex].track.preview_url} />
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
