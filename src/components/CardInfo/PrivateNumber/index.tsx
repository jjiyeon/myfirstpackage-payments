import { getZeroToNineRandomNumber } from '@/utils/check'
import { useEffect, useRef, useState } from 'react'
import ui from '@/styles/index.module.css'

type PrivateProps = {
  length: number
  callback: (param: string) => void
  close: () => void
}
const PrivateNumber = (props: PrivateProps) => {
  const numRef = useRef<string>('')
  const [keypad, setKeypad] = useState<Array<number>>()

  const handleButtonClick = (param: number) => {
    numRef.current += param

    props.callback(numRef.current)

    if (numRef.current.length === props.length) props.close()
  }

  useEffect(() => {
    setKeypad(getZeroToNineRandomNumber(10)) // 이 숫자에 대한 const가 필요하겠지
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
