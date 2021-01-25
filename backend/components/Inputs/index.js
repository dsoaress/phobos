import Label from '@/components/Label'

import * as S from './styled'

export function Input({ id, label, srOnly, ...props }) {
  return (
    <div>
      <Label srOnly={srOnly} label={label} id={id} />
      <S.Input id={id} name={id} placeholder={srOnly && label} {...props} />
    </div>
  )
}

export function Select({ id, items, label, srOnly, ...props }) {
  return (
    <div>
      <Label srOnly={srOnly} label={label} id={id} />
      <S.Select id={id} name={id} placeholder={srOnly && label} {...props}>
        {items.map((item, i) => (
          <option value={item.value} key={i}>
            {item.name}
          </option>
        ))}
      </S.Select>
    </div>
  )
}

export function Textarea({ id, label, srOnly, ...props }) {
  return (
    <div>
      <Label srOnly={srOnly} label={label} id={id} />
      <S.Textarea id={id} name={id} placeholder={srOnly && label} {...props} />
    </div>
  )
}
