import { CardListContext, UpdateCardListContext } from '@/context'
import { CardInfoContext, UpdateCardInfoContext } from '@/context/paymentContext'
import { useContext, useState } from 'react'

const useCardInfo = () => {
  const cardInfo = useContext(CardInfoContext)
  const updateCardInfo = useContext(UpdateCardInfoContext)

  const cardList = useContext(CardListContext)
  const updateCardList = useContext(UpdateCardListContext)

  const [privateKeypad, setPrivateKeypad] = useState<{ key: string; isOpen: boolean }>({
    key: '',
    isOpen: false,
  }) // 키패드 컴포넌트

  return {
    cardInfo,
    updateCardInfo,
    privateKeypad,
    setPrivateKeypad,
    cardList,
    updateCardList,
  } as const
}

export default useCardInfo
