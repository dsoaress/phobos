import Image from 'next/image'
import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import Badge from './badge'

export default function ItemsList({ data, title }) {
  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-xl font-bold leading-tight text-gray-900">
          {title}
        </h2>
      )}
      <div className="shadow border-b border-gray-200 bg-white divide-y divide-gray-200">
        {data.map(item => (
          <div
            className="flex items-center px-6 py-4 space-x-4 text-sm font-medium"
            key={item._id}
          >
            {item.image && (
              <div className="relative flex-shrink-0 h-10 w-10">
                <Image
                  className="rounded-full"
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            <div className="flex-grow">
              {item.title}
              {(item.date || item.role) && (
                <span className="block text-xs font-normal text-gray-500">
                  {format(parseISO(item.date), "d 'de' MMMM 'de' yyyy", {
                    locale: pt
                  }) || item.role}{' '}
                  {item.status && <Badge status={item.status} />}
                </span>
              )}
            </div>
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Editar
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
