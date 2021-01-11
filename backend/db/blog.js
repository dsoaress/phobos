import { nanoid } from 'nanoid'
import slugify from 'slugify'

export async function deleteBlogPost(db, { _id }) {
  return db
    .collection('blog')
    .findOneAndDelete({ _id })
    .then(({ value }) => value)
}

export async function getBlogPosts(db) {
  return db.collection('blog').find({}).toArray()
}

export async function getBlogPost(db, { _id }) {
  return db.collection('blog').findOne({ _id })
}

export async function insertBlogPost(
  db,
  { body, date, image, published, title, userId }
) {
  return db
    .collection('blog')
    .insertOne({
      _id: nanoid(12),
      body,
      date,
      image,
      slug: slugify(title, { lower: true }),
      published,
      title,
      userId
    })
    .then(({ ops }) => ops[0])
}

export async function updateBlogPost(
  db,
  { _id, body, date, image, published, title, userId }
) {
  const update = {
    body,
    date,
    image,
    published,
    title,
    userId
  }
  return db
    .collection('blog')
    .findOneAndUpdate({ _id }, { $set: update }, { returnOriginal: false })
    .then(({ value }) => value)
}
