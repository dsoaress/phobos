import * as S from './styled'

export function Input({ id, label, srOnly, ...props }) {
  return (
    <div>
      <S.Label srOnly={srOnly}>{label}</S.Label>
      <S.Input id={id} name={id} placeholder={srOnly && label} {...props} />
    </div>
  )
}

export function Checkbox({ id, label, ...props }) {
  return (
    <div>
      <S.Checkbox id={id} name={id} {...props} />
      <S.Label>{label}</S.Label>
    </div>
  )
}

export function Textarea({ id, label, srOnly, ...props }) {
  return (
    <div>
      <S.Label {...srOnly}>{label}</S.Label>
      <S.Textarea
        id={id}
        name={id}
        placeholder={srOnly && label}
        {...props}
        {...ref}
      />
    </div>
  )
}
