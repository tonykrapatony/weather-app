import { FC } from 'react'

type ArrowProps = {
  onclick: () => void;
  width: number;
  direction: string
}

const Arrow:FC<ArrowProps> = ({ onclick, width, direction }) => {
  return (
    <div className='hover:opacity-70' onClick={() => onclick()}>
      {direction === 'left' ? <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={width}>
        <title/>
        <g data-name="1" id="_1">
          <path d="M353,450a15,15,0,0,1-10.61-4.39L157.5,260.71a15,15,0,0,1,0-21.21L342.39,54.6a15,15,0,1,1,21.22,21.21L189.32,250.1,363.61,424.39A15,15,0,0,1,353,450Z"/>
        </g>
      </svg>
      :
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width={width}>
        <title/>
        <g data-name="1" id="_1">
          <path d="M202.1,450a15,15,0,0,1-10.6-25.61L365.79,250.1,191.5,75.81A15,15,0,0,1,212.71,54.6l184.9,184.9a15,15,0,0,1,0,21.21l-184.9,184.9A15,15,0,0,1,202.1,450Z"/>
        </g>
      </svg>}
    </div>
  )
}

export default Arrow;