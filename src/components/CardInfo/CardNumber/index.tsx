import { useContext, useRef } from 'react'
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

export const CardNumber = () => {
  const cardInfo = useContext(CardInfoContext)
  const updateCardInfo = useContext(UpdateCardInfoContext)

  const cardNumRef = useRef<Array<string>>([])

  const handleInputChange = (key: string, value: string) => {
    return updateCardInfo({
      ...cardInfo,
      cardNumber: { ...cardInfo?.cardNumber, [key]: value },
    })
  }

  const handleExpactCard = (key: string, value: string) => {
    console.log(value)
    const matchingKey = cardStartNumArray.filter((num) => value.match(num)) //매칭 되는 숫자 가져와서
    const matchingInfo = cardStartMatching[Number(matchingKey[0])]
    console.log(111, matchingKey[0], cardStartMatching[Number(matchingKey[0])])

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
          value={cardInfo.cardNumber?.first ?? ''} //
          onChange={(e) => {
            handleExpactCard('first', e.target.value)
          }}
          type="text"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="second"
          value={cardInfo.cardNumber?.second ?? ''} //
          onChange={(e) => handleInputChange('second', e.target.value)}
          type="text"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="third"
          value={cardInfo.cardNumber?.third ?? ''} //
          onChange={(e) => handleInputChange('third', e.target.value)}
          type="password"
          maxLength={4}
        />
        <span>-</span>
        <Input
          name="fourth"
          value={cardInfo.cardNumber?.fourth ?? ''} //
          onChange={(e) => handleInputChange('fourth', e.target.value)}
          type="password"
          maxLength={4}
        />
      </div>
    </div>
  )
}
