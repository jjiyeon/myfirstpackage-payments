import { Dispatch, SetStateAction, useContext } from 'react'
import { CardInfo, CardInfoContext } from '../../../context/paymentContext'
import { checkAllMasking } from '../../../utils/check'
import ui from '@/styles/index.module.css'

type CardBoxProps = {
  card?: CardInfo
  isOpenCardType?: Dispatch<SetStateAction<boolean>>
}

export const CardBox = ({ card, isOpenCardType }: CardBoxProps) => {
  const cardInfo = useContext(CardInfoContext)

  const cardNumberValue = () => {
    const cardNumber = cardInfo?.cardNumber || card?.cardNumber
    return {
      first: cardNumber?.first || '',
      second: cardNumber?.second || '',
      third: cardNumber?.third ? checkAllMasking(cardNumber.third, cardNumber.third.length) : '',
      fourth: cardNumber?.fourth ? checkAllMasking(cardNumber.fourth, cardNumber.fourth.length) : '',
    }
  }

  const className = () => {
    if (cardInfo) return 'big-card__chip'
    return 'small-card__chip'
  }
  return (
    <div className={ui['card-box']} role="button" onClick={() => isOpenCardType && isOpenCardType((state) => !state)}>
      <div className={`${ui['empty-card']} ${ui[cardInfo.cardType?.theme || card?.cardType?.theme || '']}`}>
        <div className={ui['card-top']}>
          {cardInfo?.cardType?.name ? cardInfo.cardType.name + '카드' : card ? card.cardType?.name + '카드' : ''}
        </div>
        <div className={ui['card-middle']}>
          <div className={ui[`${className()}`]}></div>
          <p>{` 
          ${cardNumberValue().first} ${cardNumberValue().second} ${cardNumberValue().third} ${cardNumberValue().fourth}
          `}</p>
        </div>
        <div className={ui['card-bottom']}>
          <div className={ui['card-bottom__info']}>
            <div>
              <span className={ui['card-text']}>{card?.name ? card.name : cardInfo.name || 'NAME'}</span>
              <span className={ui['card-text']}>
                {card?.month ? card.month : cardInfo.month || 'MM'} / {card?.year ? card.year : cardInfo.year || 'YY'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
