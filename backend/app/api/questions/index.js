const { Router } = require('express')

const { Question } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Question.get())
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:questionId', (req, res) => {
    try {
        res.status(200).json(Question.getById(req.params.questionId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const question = Question.create({ ...req.body })
        res.status(201).json(question)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:questionId', (req, res) => {
    try {
        res.status(200).json(Question.update(req.params.questionId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:questionId', (req, res) => {
    try {
        Question.delete(req.params.questionId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
