import * as S from './styled'

export default function Thumbnail({ alt, src }) {
  return (
    <S.Thumbnail>
      <S.Image
        className="rounded-full"
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
      />
    </S.Thumbnail>
  )
}
