import { ReactNode } from "react";

import "./style.css";

interface Props {
  visible: boolean,
  children: ReactNode
}

export function Modal({ visible, children }: Props) {
  return (
    <div className={`modal ${visible ? "" : "hidden"}`}>
      {children}
    </div>
  )
}
