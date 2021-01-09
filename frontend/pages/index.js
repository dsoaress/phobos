import Image from 'next/image'
import { parseISO, format } from 'date-fns'
import { pt } from 'date-fns/locale'

import readTime from '../lib/read-time'

export default function Home({ posts }) {
  return (
    <div className="container">
      <h1>Hello world</h1>
      <div className="space-y-8">
        {posts.map(item => (
          <div key={item._id}>
            <div
              className="relative overflow-hidden w-full my-16"
              style={{ height: '500px' }}
            >
              <Image
                className="rounded-3xl overflow-hidden"
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute overflow-hidden inset-0">
                <div className="flex flex-col space-y-4 justify-center items-center bg-gradient-to-t from-yellow-900 to-transparent  h-full">
                  <h1 className="m-0 p-0">{item.title}</h1>
                  <div className="text-center">
                    <p className="m-0">
                      {format(parseISO(item.date), "d 'de' MMMM 'de' yyyy", {
                        locale: pt
                      })}
                    </p>
                    <p>{readTime(item.body)} minutos de leitura</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mx-52"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://admin.dsoares.me/api/blog`)
  const { posts } = await res.json()

  return {
    props: { posts },
    revalidate: 1
  }
}
