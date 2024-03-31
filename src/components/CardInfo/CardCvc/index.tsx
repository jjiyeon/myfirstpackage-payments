import { useContext, useState } from 'react'
import { CardInfoContext, UpdateCardInfoContext } from '../../../context/paymentContext'
import { Input } from '../../common/Input'
import ui from '@/styles/index.module.css'

export const CardCvc = () => {
  const cardInfo = useContext(CardInfoContext)
  const updateCardInfo = useContext(UpdateCardInfoContext)

  const [onFocus, setOnFocus] = useState(false)

  //css 처리도 방법일듯..
  const handleMouseEnter = () => {
    setOnFocus(true)
  }
  const handleMouseLeave = () => {
    setOnFocus(false)
  }

  if (!cardInfo) return null
  return (
    <div className={`${ui['row-container']} ${ui['tooltip-align']}`}>
      <Input
        type="password"
        value={cardInfo.cvc || ''}
        onChange={(e) => {
          updateCardInfo({ ...cardInfo, cvc: e.target.value })
        }}
        maxLength={3}
        size="small"
        label="보안코드(CVC/CVV)"
      />
      <div className={`${ui['tooltip-wrapper']}`} onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
        <span>?</span>
      </div>
      <p className={`${ui['tooltip']} ${ui[onFocus ? 'hover' : '']}`} style={{ fontSize: '12px' }}>
        카드 뒷면의 3자리를 입력해주세요.
      </p>
    </div>
  )
}
