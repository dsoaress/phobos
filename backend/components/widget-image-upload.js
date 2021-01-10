import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

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

  const thumb = files.map(file => (
    <div className="h-60 w-96 overflow-hidden rounded-md" key={file.name}>
      <img src={file.preview} />
    </div>
  ))

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <div className={`flex ${thumb.length !== 0 && 'space-x-4'}`}>
      <div
        className="w-full bg-white border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 rounded-md p-4 text-xs text-center text-gray-500 font-normal leading-8"
        {...getRootProps()}
      >
        <div className="flex justify-center items-center border-2 border-dashed rounded-md h-full p-4 cursor-pointer">
          <div className="py-4">
            <input {...getInputProps()} {...props} required />
            <p className="text-base mb-4">Imagem em destaque</p>
            <p>Arraste uma imagem aqui ou clique para selecionar um arquivo</p>
            <p>
              Para alterar a imagem selecionada basta substituir por uma nova
            </p>
          </div>
        </div>
      </div>
      <aside>{thumb}</aside>
    </div>
  )
}
