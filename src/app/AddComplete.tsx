import { CardBox } from '../components'
import { Input } from '../components/common/Input'
import { StepProps } from './Payments'
import ui from '../styles/index.module.css'
import useCardInfo from '@/hooks/useCardInfo'
import { initialCardInfo } from '@/context'

const AddComplete = ({ onStep }: StepProps) => {
  const { cardInfo, updateCardInfo, cardList, updateCardList } = useCardInfo()

  const checkList = () => {
    if (cardList.length) {
      const index = cardList.findIndex((item) => item.cardNo === cardInfo?.cardNo)
      const result = cardList.map((item, idx) => {
        if (idx === index) item.cardAlias = cardInfo?.cardAlias
        return item
      })
      if (index >= 0) {
        updateCardList(result)
      } else {
        updateCardList([...result, { ...cardInfo }])
      }
    } else {
      updateCardList([{ ...cardInfo }])
    }
  }

  const handleClick = () => {
    if (cardInfo && !cardInfo.cardAlias) updateCardInfo({ ...cardInfo, cardAlias: cardInfo.cardType?.name || '' })

    checkList()
    updateCardInfo(initialCardInfo) //초기값 넣어주기
    if (onStep) onStep({ step: 'list' })
  }

  if (!cardInfo) return null
  return (
    <main className={ui['myfirst-box']}>
      <div className={ui['root']}>
        <div className={`${ui['app']} ${ui['flex-column-center']}`}>
          <div className={ui['flex-column-center']}>
            <h2 className={`${ui['page-title']} ${ui['mb-10']}`}>카드등록이 완료되었습니다.</h2>
          </div>
          <CardBox />

          <div className={`${ui['input-container']} ${ui['flex-column-center']} ${ui['w-100']}`}>
            <Input
              type="text"
              value={cardInfo.cardAlias || ''} //
              onChange={(e) => updateCardInfo({ ...cardInfo, cardAlias: e.target.value })}
              placeholder="카드 별칭 (선택)"
              className="input-underline"
              maxLength={10}
            />
          </div>
          <div className={`${ui['button-box']} ${ui['mt-50']}`}>
            <button className={ui['button-text']} onClick={() => handleClick()}>
              확인
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddComplete
