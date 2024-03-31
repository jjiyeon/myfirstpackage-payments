import { ForwardedRef, MutableRefObject, RefObject, forwardRef } from 'react'
import './input.css'

interface InputProps {
  type: string
  value?: string
  name?: string
  primary?: boolean
  backgroundColor?: string
  size?: 'xsmall' | 'small' | 'medium' | 'large'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  label?: string
  className?: string
  refObj?: MutableRefObject<string[]>
}

export const Input = forwardRef(
  ({ type, backgroundColor, size, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={'input-container'}>
        <span className={'input-title'}>{props.label}</span>
        <input
          ref={ref}
          type={type}
          className={[`${props.className ?? 'input-basic'}`, `input-${size}`].join(' ')}
          style={{ backgroundColor }}
          {...props}
          autoFocus
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
