import { createContext, useState } from 'react'

export type CardCompanyName = '국민' | '현대' | '삼성' | '우리' | '아멕스' | '비자' | '비씨' | '롯데'
export type CardCompany = {
  name: CardCompanyName
  theme: 'tomato' | 'gray' | 'yellow' | 'blue' | 'green' | 'pupul' | 'orange' | 'black'
  startNum: '55' | '34' | '37' | '36' | '53' | '40' | '48' | '44'
}
export type CardNumber = {
  first?: string
  second?: string
  third?: string
  fourth?: string
}
export type CardInfo = {
  cardNo?: number
  cardNumber: CardNumber | null
  month: string | null
  year: string | null
  name: string | null
  password: string | null
  cvc: string | null
  cardType: CardCompany | null
  cardAlias?: string
}

export const CardInfoContext = createContext<CardInfo>({
  cardNumber: null,
  month: null,
  year: null,
  name: null,
  password: null,
  cvc: null,
  cardType: null,
})
export const UpdateCardInfoContext = createContext<(payload: CardInfo) => void>(() => {})

const CardInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: null,
    month: null,
    year: null,
    name: null,
    password: null,
    cvc: null,
    cardType: null,
  })

  return (
    <>
      <UpdateCardInfoContext.Provider value={setCardInfo}>
        <CardInfoContext.Provider value={cardInfo}>{children}</CardInfoContext.Provider>
      </UpdateCardInfoContext.Provider>
    </>
  )
}

export default CardInfoProvider
