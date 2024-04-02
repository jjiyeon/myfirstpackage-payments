import { useContext, useEffect, useRef, useState } from 'react'
import {
  CardCompanyName,
  CardInfoContext,
  CardStartNum,
  UpdateCardInfoContext,
  cardStartMatching,
  cardStartNumArray,
} from '../../../context/paymentContext'
import { Input } from '../../common/Input'
import ui from '@/styles/index.module.css'
import PrivateNumber from '../PrivateNumber'

export const CardNumber = () => {
  const cardInfo = useContext(CardInfoContext)
  const updateCardInfo = useContext(UpdateCardInfoContext)

  const cardNumFirstRef = useRef<HTMLInputElement>(null)
  const cardNumSecondRef = useRef<HTMLInputElement>(null)
  const cardNumThirdRef = useRef<HTMLInputElement>(null)
  const cardNumFourthRef = useRef<HTMLInputElement>(null)

  const [privateKeypad, setprivateKeypad] = useState<{ key: string; isOpen: boolean }>({
    key: '',
    isOpen: false,
  }) // 키패드 컴포넌트

  const [error, setError] = useState<{ position: string | null; message: string | null }>({
    position: null,
    message: null,
  })

  const handleInputChange = (key: string, value: string) => {
    return updateCardInfo({
      ...cardInfo,
      cardNumber: { ...cardInfo?.cardNumber, [key]: value },
    })
  }

  const handleExpactCard = (key: string, value: string) => {
    const matchingKey = cardStartNumArray.filter((num) => value.match(num)) //매칭 되는 숫자 가져와서
    const matchingInfo = cardStartMatching[Number(matchingKey[0])]

    return updateCardInfo({
      ...cardInfo,
      cardNumber: { ...cardInfo?.cardNumber, [key]: value },
      cardType: {
        name: matchingInfo ? (matchingInfo.type as CardCompanyName) : null,
        theme: matchingInfo ? matchingInfo.color : null,
        startNum: matchingKey[0] ? (matchingKey[0] as CardStartNum) : null,
      },
    })
  }

  if (!cardInfo) return null
  return (
    <div className={ui['row-container']}>
      <p className={ui['input-title']}>카드번호</p>
      <div className={ui['input-row-container']}>
        <Input
          name="first"
          ref={cardNumFirstRef}
          value={cardInfo.cardNumber?.first ?? ''} //
          onChange={(e) => {
            if (e.target.value.match(/[^0-9]/g)) return setError({ position: 'first', message: '숫자만 입력해주세요.' })
            handleExpactCard('first', e.target.value)
            if (e.target.value.length === 4) cardNumSecondRef.current?.focus()
            setError({ position: null, message: null })
          }}
          type="text"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="second"
          ref={cardNumSecondRef}
          value={cardInfo.cardNumber?.second ?? ''} //
          onChange={(e) => {
            if (e.target.value.match(/[^0-9]/g)) return setError({ position: 'first', message: '숫자만 입력해주세요.' })
            handleInputChange('second', e.target.value)
            if (e.target.value.length === 4) cardNumThirdRef.current?.focus()
            setError({ position: null, message: null })
          }}
          type="text"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="third"
          ref={cardNumThirdRef}
          value={cardInfo.cardNumber?.third ?? ''} //
          readOnly={true}
          onFocus={() => {
            if (!cardInfo.cardNumber?.third) setprivateKeypad({ key: 'third', isOpen: true })
            if (cardInfo.cardNumber?.third?.length === 4) cardNumFourthRef.current?.focus()
          }}
          type="password"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="fourth"
          ref={cardNumFourthRef}
          value={cardInfo.cardNumber?.fourth ?? ''} //
          readOnly={true}
          onFocus={() => {
            if (!cardInfo.cardNumber?.fourth) setprivateKeypad({ key: 'fourth', isOpen: true })
          }}
          type="password"
          maxLength={4}
        />
      </div>
      {error && <span style={{ fontSize: '12px', color: 'tomato' }}>{error.message}</span>}
      {privateKeypad.isOpen && (
        <PrivateNumber
          length={4}
          callback={(e) => handleInputChange(privateKeypad.key, e)}
          close={() => setprivateKeypad((state) => ({ ...state, isOpen: false }))}
        />
      )}
    </div>
  )
}
