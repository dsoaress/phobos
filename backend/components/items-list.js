import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import Thumbnail from '@/components/thumbnail'
import Badge from '@/components/badge'

export default function ItemsList({ data, title }) {
  const router = useRouter()
  return (
    <div className="items-list">
      {title && <h2>{title}</h2>}
      {data.length > 0 ? (
        <div className="wrapper">
          {data.map(item => (
            <div className="item" key={item._id}>
              {item.image && <Thumbnail src={item.image} alt={item.title} />}
              <div className="title">
                <Link href={router.pathname + '/' + item._id}>
                  <a>{item.title}</a>
                </Link>
                {(item.date || item.role) && (
                  <span className="meta">
                    {format(parseISO(item.date), "d 'de' MMM 'de' yyyy", {
                      locale: pt
                    }) || item.role}{' '}
                    {(item.status || item.status === null) && (
                      <Badge status={item.status} />
                    )}
                  </span>
                )}
              </div>
              <Link href={router.pathname + '/' + item._id}>
                <a>Editar</a>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <span className="block rounded-md bg-yellow-100 text-yellow-800 text-center p-4">
          Não existe conteúdo para ser exibido aqui
        </span>
      )}
    </div>
  )
}
