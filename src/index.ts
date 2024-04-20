import { CardBox, CardCvc, CardDate, CardName, CardNumber, CardPassword, CardType } from './components'
import PrivateNumber from './components/CardInfo/PrivateNumber'

import CardInfoProvider, {
  CardCompanyName,
  CardStartNum,
  CardColor,
  cardStartMatching,
  CardCompany,
  CardInfo,
  CARD_START_NUM_LIST,
} from './context/paymentContext'

import Payments from './app/Payments'
import useCardInfo from './hooks/useCardInfo'

export {
  CardBox,
  CardCvc,
  CardDate,
  CardName,
  CardNumber,
  CardPassword,
  CardType,
  CardInfoProvider,
  PrivateNumber,
  Payments,
  cardStartMatching,
  CARD_START_NUM_LIST,
  useCardInfo,
}

export type { CardCompanyName, CardStartNum, CardColor, CardCompany, CardInfo }
