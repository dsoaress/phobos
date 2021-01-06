import Image from 'next/image'

export default function Thumbnail({ alt, src }) {
  return (
    <div className="thumbnail">
      <Image
        className="rounded-full"
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
      />
    </div>
  )
}
