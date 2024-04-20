import { CardInfo } from '../context/paymentContext'
import { CardBox } from '../components'
import ui from '../styles/index.module.css'
import { StepProps } from './Payments'
import useCardInfo from '@/hooks/useCardInfo'

const CardList = ({ onStep }: StepProps) => {
  const { updateCardInfo, cardList, updateCardList } = useCardInfo()

  const deleteCard = (item: CardInfo) => {
    const deleteCard = cardList.filter((card) => card.cardNo !== item.cardNo)
    updateCardList(deleteCard)
  }

  return (
    <main className={ui['myfirst-box']}>
      <div className={ui['root']}>
        <div className={`${ui['app']} ${ui['flex-column-center']}`}>
          <div className={ui['flex-center']}>
            <h2 className={`${ui['page-title']} ${ui['mb-10']}`}>보유 카드</h2>
          </div>
          <div className={ui['card-list-container']}>
            {cardList.reverse().map((item, idx) => (
              <div key={idx} className={ui['card-item']}>
                <button
                  type="button"
                  onClick={() => {
                    updateCardInfo({ ...item })
                    if (onStep) onStep({ step: 'complete' })
                  }}
                >
                  <div>
                    <CardBox card={item} />
                    <span className={ui['card-nickname']}>{item.cardAlias ?? item.cardType?.name}</span>
                  </div>
                </button>
                <div className={ui['card-delete-wrapper']}>
                  <button className={ui['delete-button']} onClick={() => deleteCard(item)}>
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={ui['card-add-wrapper']}>
            <button className={ui['add-button']} onClick={() => onStep && onStep({ step: 'add' })}>
              +
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
export default CardList
