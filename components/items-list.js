import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import Thumbnail from './thumbnail'
import Badge from './badge'

export default function ItemsList({ data, title }) {
  return (
    <div className="items-list">
      {title && <h2>{title}</h2>}
      <div className="wrapper">
        {data.map(item => (
          <div className="item" key={item._id}>
            {item.image && <Thumbnail src={item.image} alt={item.title} />}
            <div className="title">
              {item.title}
              {(item.date || item.role) && (
                <span className="meta">
                  {format(parseISO(item.date), "d 'de' MMMM 'de' yyyy", {
                    locale: pt
                  }) || item.role}{' '}
                  <Badge published={item.published} />
                </span>
              )}
            </div>
            <Link href={`/blog/${item._id}`}>
              <a>Editar</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
