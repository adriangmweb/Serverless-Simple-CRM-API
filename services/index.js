const db = require('../lib/databaseHandler')

module.exports.create = async (modelName, attributes) => {
  const controller = new db()
  await controller.init()

  return controller.create(modelName, attributes)
}

module.exports.get = async (modelName, id) => {
  const controller = new db()
  await controller.init()

  return controller.findOne(modelName, {
    where: {
      id: id
    },
    attributes: { exclude: ['password'] }
  })
}


module.exports.list = async (modelName) => {
  const controller = new db()
  await controller.init()

  return controller.findAll(modelName, {
    include: {
      all: true
    },
    attributes: { exclude: ['password'] }
  })
}

module.exports.login = async (modelName, email) => {
  const controller = new db()
  await controller.init()

  return controller.findOne(modelName, {
    where: {
      email: email
    }
  })
}

module.exports.remove = async (modelName, userId) => {
  const controller = new db()
  await controller.init()

  return controller.remove(modelName, { where: { id: userId } })
}

module.exports.update = async (modelName, userId, attributes) => {
  const controller = new db()
  await controller.init()

  return controller.update(modelName, attributes, { where: { id: userId } })
}