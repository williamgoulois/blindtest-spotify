import * as React from "react"
import { Track } from "components/Blindtest"

type AlbumCoverProps = {
  style?: React.CSSProperties
  track: Track
}

export function AlbumCover({ track, style }: AlbumCoverProps) {
  if (track === undefined) return null
  return <img style={style} src={track.album.images[0]?.url} alt="" />
}
