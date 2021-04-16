import * as React from "react"
import { Track } from "../App"

type AlbumCoverProps = {
  style?: React.CSSProperties
  track: Track
}

export default function AlbumCover({ track, style }: AlbumCoverProps) {
  if (track === undefined) return null
  return <img style={style} src={track.album.images[0]?.url} alt="" />
}
