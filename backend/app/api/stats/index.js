const { Router } = require('express')

const { Stat } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Stat.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:statId', (req, res) => {
  try {
    res.status(200).json(Stat.getById(req.params.statId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    res.status(201).json(Stat.create(req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:statId', (req, res) => {
  try {
    res.status(200).json(Stat.update(req.params.statId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/', (req, res) => {
  try {
    Stat.delete()
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
