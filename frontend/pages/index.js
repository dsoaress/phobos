export default function Home({ posts }) {
  return (
    <div className="container">
      <h1>Hello world</h1>
      <div className="space-y-8">
        {posts.map(item => (
          <div key={item._id}>
            <h2>{item.title}</h2>
            <img src={item.image} alt={item.title} />
            <div dangerouslySetInnerHTML={{ __html: item.body }} />
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
