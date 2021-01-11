import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import tw from 'twin.macro'

import * as S from './styled'

export default function WidgetImageUpload(props) {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <div css={[tw`flex`, files.length !== 0 && tw`space-x-4`]}>
      <S.Wrapper {...getRootProps()}>
        <S.Main>
          <S.TextGroup>
            <input {...getInputProps()} {...props} required />
            <S.Title>Imagem em destaque</S.Title>
            <p>Arraste uma imagem aqui ou clique para selecionar um arquivo</p>
            <p>
              Para alterar a imagem selecionada basta substituir por uma nova
            </p>
          </S.TextGroup>
        </S.Main>
      </S.Wrapper>
      <aside>
        {files.map(file => (
          <S.Thumb key={file.name}>
            <img src={file.preview} />
          </S.Thumb>
        ))}
      </aside>
    </div>
  )
}
