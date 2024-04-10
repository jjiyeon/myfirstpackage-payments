import { getZeroToNineRandomNumber } from '@/utils/check'
import { useEffect, useRef, useState } from 'react'
import ui from '@/styles/index.module.css'

type PrivateProps = {
  privateNumberLength: number
  changeNumber: (param: string) => void
  close: () => void
}

const PrivateNumber = ({ privateNumberLength, changeNumber, close }: PrivateProps) => {
  const numRef = useRef<string>('')
  const [keypad, setKeypad] = useState<Array<number>>()

  const handleButtonClick = (param: number) => {
    numRef.current += param

    changeNumber(numRef.current)

    if (numRef.current.length === privateNumberLength) close()
  }

  useEffect(() => {
    setKeypad(getZeroToNineRandomNumber(10))
  }, [])

  if (!keypad) return null
  return (
    <div className={ui['modal-dimmed']}>
      <ul className={ui['modal']}>
        {keypad.map((value, idx) => (
          <li key={idx}>
            <button type="button" onClick={() => handleButtonClick(value)}>
              {value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PrivateNumber
