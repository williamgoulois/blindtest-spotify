import "./Button.css"
import * as React from "react"

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  children: React.ReactNode
}

const Button = ({ onClick, children }: ButtonProps) => <button onClick={onClick}>{children}</button>

export default Button
