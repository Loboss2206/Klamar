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

router.post('/', async (req, res) => {
  try {
    const newStat = await Stat.create(req.body) // Utilisation d'await pour attendre la création
    res.status(201).json(newStat) // Répondre avec le nouvel objet créé
  } catch (err) {
    manageAllErrors(res, err) // Gérer les erreurs
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
