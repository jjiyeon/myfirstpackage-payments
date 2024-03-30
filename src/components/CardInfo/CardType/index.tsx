import { useContext } from 'react'
import { CardInfoContext, UpdateCardInfoContext } from '@/context/paymentContext'
import ui from '@/styles/index.module.css'
import { cardCompanyList } from '@/constant/cardCompany'

export const CardType = ({ closeModal }: { closeModal: () => void }) => {
  const cardInfo = useContext(CardInfoContext)
  const updateCardInfo = useContext(UpdateCardInfoContext)

  if (!cardInfo) return null
  return (
    <div className={ui['modal-dimmed']} onClick={closeModal}>
      <div className={ui['modal']}>
        <div className={ui['flex-center']}>
          {cardCompanyList.map((value, _) => (
            <div className={ui[`modal-item-container`]} key={value.name}>
              <button
                className={ui['modal-item-name']}
                onClick={() => {
                  updateCardInfo({ ...cardInfo, cardType: value })
                  closeModal()
                }}
              >
                <div className={`${ui['modal-item-dot']} ${ui[value.theme]}`}></div>
                {value.name}카드
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
