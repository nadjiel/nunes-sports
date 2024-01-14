import { ReactNode, useRef } from "react";

import "./style.css";

interface Props {
  children: ReactNode,
  title: string,
  confirm?: () => void,
  cancel?: () => void
}

export function Modal({ children, title, confirm, cancel }: Props) {
  const modal = useRef<HTMLDivElement>(null);

  return (
    <div ref={modal} onClick={e => {
      if(e.target == modal.current) cancel && cancel();
    }} className="overlay">
      <div className="modal">
        <h2 className="title">{title}</h2>
        {children}
        <div className="btn-row">
          <button className="btn confirm" onClick={confirm}>Confirmar</button>
          <button className="btn cancel" onClick={cancel}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
