import { ChangeEvent, useCallback, useContext, useState } from 'react'
import {
  CARD_START_NUM_LIST,
  CardCompanyName,
  CardInfoContext,
  CardStartNum,
  UpdateCardInfoContext,
  cardStartMatching,
} from '../../../context/paymentContext'
import { Input } from '../../common/Input'
import ui from '@/styles/index.module.css'
import PrivateNumber from '../PrivateNumber'

enum CardNumberOrder {
  first,
  second,
  third,
  fourth,
}
export const CardNumber = () => {
  const cardInfo = useContext(CardInfoContext)
  const updateCardInfo = useContext(UpdateCardInfoContext)

  const [cardNumberElements, setCardNumberElements] = useState<{ [name: string]: HTMLInputElement }>({})

  const [privateKeypad, setPrivateKeypad] = useState<{ key: string; isOpen: boolean }>({
    key: '',
    isOpen: false,
  }) // 키패드 컴포넌트

  const [error, setError] = useState<{ position: string | null; message: string | null }>({
    position: null,
    message: null,
  })

  const attachCardNumberElements = useCallback(
    (element: HTMLInputElement | null) => {
      if (!element) return
      const { name } = element

      setCardNumberElements((prev) => ({ ...prev, [name]: element }))
    },
    [setCardNumberElements]
  )

  //카드 번호 업데이트
  const changeCardNumber = (key: string, value: string) => {
    updateCardInfo({
      ...cardInfo,
      cardNumber: { ...cardInfo?.cardNumber, [key]: value },
    })
  }

  //포커스
  const setFocus = () => {
    const targetFocusElement =
      cardNumberElements[CardNumberOrder[CardNumberOrder[privateKeypad.key as keyof typeof CardNumberOrder] + 1]]

    if (targetFocusElement && !targetFocusElement.value) {
      targetFocusElement.focus()
    } else {
      setPrivateKeypad(() => ({ key: '', isOpen: false }))
    }
  }

  //매칭되는 카드 찾기
  const getMatchingCardType = (value: string) => {
    const matchingKey = CARD_START_NUM_LIST.filter((num) => value.match(num))
    const matchingInfo = cardStartMatching[matchingKey[0]]

    return {
      name: matchingInfo ? (matchingInfo.type as CardCompanyName) : null,
      theme: matchingInfo ? matchingInfo.color : null,
      startNum: matchingKey[0] ? (matchingKey[0] as CardStartNum) : null,
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    if (value.match(/[^0-9]/g)) {
      setError({ position: 'first', message: '숫자만 입력해주세요.' })
      return
    }

    if (name === 'first') {
      const cardType = getMatchingCardType(value.slice(0, 2))
      updateCardInfo({
        ...cardInfo,
        cardNumber: { ...cardInfo?.cardNumber, [name]: value },
        cardType,
      })
    } else {
      changeCardNumber(name, value)
    }

    if (value.length === 4) {
      const targetFocusElement =
        cardNumberElements[CardNumberOrder[CardNumberOrder[name as keyof typeof CardNumberOrder] + 1]]

      if (targetFocusElement) {
        targetFocusElement.focus()
      }
    }

    setError({ position: null, message: null })
  }

  if (!cardInfo) return null
  return (
    <div className={ui['row-container']}>
      <p className={ui['input-title']}>카드번호</p>
      <div className={ui['input-row-container']}>
        <Input
          name="first"
          ref={attachCardNumberElements}
          value={cardInfo.cardNumber?.first ?? ''} //
          onChange={handleInputChange}
          type="text"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="second"
          ref={attachCardNumberElements}
          value={cardInfo.cardNumber?.second ?? ''} //
          onChange={handleInputChange}
          type="text"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="third"
          ref={attachCardNumberElements}
          value={cardInfo.cardNumber?.third ?? ''} //
          readOnly={true}
          onFocus={() => {
            setPrivateKeypad({ key: 'third', isOpen: true })

            const third = cardInfo.cardNumber?.third
            if (third) {
              changeCardNumber('third', '')
            }
          }}
          type="password"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="fourth"
          ref={attachCardNumberElements}
          value={cardInfo.cardNumber?.fourth ?? ''} //
          readOnly={true}
          onFocus={() => {
            setPrivateKeypad(() => ({ key: 'fourth', isOpen: true }))

            const fourth = cardInfo.cardNumber?.fourth
            if (fourth) {
              changeCardNumber('fourth', '')
            }
          }}
          type="password"
          maxLength={4}
        />
      </div>
      {error && <span style={{ fontSize: '12px', color: 'tomato' }}>{error.message}</span>}

      {privateKeypad.key && (
        <PrivateNumber
          privateNumberLength={4}
          changeNumber={(number) => {
            changeCardNumber(privateKeypad.key, number)

            if (number.length === 4) setFocus()
          }}
          nextFocus={() => {
            setFocus()
          }}
          close={() => setPrivateKeypad(() => ({ key: '', isOpen: false }))}
        />
      )}
    </div>
  )
}
