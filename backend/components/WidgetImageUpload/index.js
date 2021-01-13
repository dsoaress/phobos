import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import tw from 'twin.macro'

import * as S from './styled'

export default function WidgetImageUpload({ defaultValue, ...props }) {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles([])
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
    <div
      css={[
        tw`grid py-4`,
        (files.length !== 0 || defaultValue) && tw`gap-4 lg:grid-cols-2`
      ]}
    >
      <S.Wrapper {...getRootProps()}>
        <S.Main>
          <S.TextGroup>
            <input {...getInputProps()} {...props} />
            <S.Title>Imagem em destaque</S.Title>
            <S.Desc>
              Arraste uma imagem aqui ou clique para selecionar um arquivo
            </S.Desc>
          </S.TextGroup>
        </S.Main>
      </S.Wrapper>
      {(files.length !== 0 || defaultValue) && (
        <aside>
          <S.ThumbWrapper>
            {files.length === 0 ? (
              <S.Thumb
                style={{
                  background: `url(${defaultValue})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            ) : (
              files.map(file => {
                return (
                  <S.Thumb
                    style={{
                      background: `url(${file.preview})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    key={file.name}
                  />
                )
              })
            )}
          </S.ThumbWrapper>
        </aside>
      )}
    </div>
  )
}
