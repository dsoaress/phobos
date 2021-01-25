import { nanoid } from 'nanoid'

export async function findUserById(db, _id) {
  return db
    .collection('users')
    .findOne({
      _id
    })
    .then(user => user || null)
}

export async function findUserByEmail(db, email) {
  return db
    .collection('users')
    .findOne({
      email
    })
    .then(user => user || null)
}

export async function getUser(db, { _id }) {
  return db.collection('users').findOne({ _id })
}

export async function getUsers(db) {
  return db.collection('users').find({}).sort({ title: 1 }).toArray()
}

export async function updateUserById(db, _id, update) {
  return db
    .collection('users')
    .findOneAndUpdate({ _id }, { $set: update }, { returnOriginal: false })
    .then(({ value }) => value)
}

export async function insertUser(db, { email, password, title, role, image }) {
  return db
    .collection('users')
    .insertOne({
      _id: nanoid(12),
      image,
      email,
      password,
      title,
      role: 'admin'
    })
    .then(({ ops }) => ops[0])
}
