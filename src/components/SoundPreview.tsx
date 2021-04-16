import * as React from "react"
const Sound = require("react-sound").default

type SoundPreviewProps = {
  previewUrl: string
}

export default function SoundPreview({ previewUrl }: SoundPreviewProps) {
  return <Sound url={previewUrl} playStatus={Sound.status.PLAYING} />
}
