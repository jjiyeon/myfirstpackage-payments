import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  CARD_START_NUM_LIST,
  CardCompany,
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

  const attachCardNumberElements = useCallback((element: HTMLInputElement | null) => {
    if (!element) return
    const { name } = element

    setCardNumberElements((prev) => ({ ...prev, [name]: element }))
  }, [])

  //카드 번호 업데이트
  const changeCardNumber = (key: string, value: string) => {
    updateCardInfo({
      ...cardInfo,
      cardNumber: { ...cardInfo?.cardNumber, [key]: value },
    })
  }

  //매칭되는 카드 찾기
  const getMatchingCardType = (value: string) => {
    const matchingKey = CARD_START_NUM_LIST.filter((num) => value.match(num)) //매칭 되는 숫자 가져와서
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
      const cardType = getMatchingCardType(value)
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

  useEffect(() => {
    //이 부분이 고민입니다..ㅎ onFocus가 포커스가 이동할 때 한번만 실행되더라구요, 그래서 3번째 값을 확인하면 다음으로 focus하기가..흠.. 더 좋은 방법이 있을까요?
    if (cardInfo.cardNumber?.third?.length === 4) {
      cardNumberElements['fourth'].focus()
    }
  }, [cardInfo.cardNumber?.third])

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
            if (!cardInfo.cardNumber?.third) setPrivateKeypad({ key: 'third', isOpen: true })
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
            if (!cardInfo.cardNumber?.fourth) setPrivateKeypad({ key: 'fourth', isOpen: true })
          }}
          type="password"
          maxLength={4}
        />
      </div>
      {error && <span style={{ fontSize: '12px', color: 'tomato' }}>{error.message}</span>}
      {privateKeypad.isOpen && (
        <PrivateNumber
          privateNumberLength={4}
          changeNumber={(number) => changeCardNumber(privateKeypad.key, number)}
          close={() => setPrivateKeypad((state) => ({ ...state, isOpen: false }))}
        />
      )}
    </div>
  )
}
