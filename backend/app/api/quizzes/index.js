const { Router } = require('express')

const { Quizzes } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Quizzes.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quizzes.getById(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = Quizzes.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quizzes.update(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quizzes.delete(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId/questions', (req, res) => {
  try {
    res.status(200).json(Quizzes.getById(req.params.quizId).questions)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/:quizId/questions', (req, res) => {
  try {
    const quiz = Quizzes.getById(req.params.quizId)
    quiz.questions.push(req.body)
    Quizzes.update(req.params.quizId, quiz)
    res.status(201).json(req.body)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizId/questions/:questionId', (req, res) => {
  try {
    const quiz = Quizzes.getById(req.params.quizId)
    const question = quiz.questions.find((question) => question.id === req.params.questionId)
    Object.assign(question, req.body)
    Quizzes.update(req.params.quizId, quiz)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId/questions/:questionId', (req, res) => {
  try {
    const quiz = Quizzes.getById(req.params.quizId)
    const questionIndex = quiz.questions.findIndex((question) => question.id === req.params.questionId)
    quiz.questions.splice(questionIndex, 1)
    Quizzes.update(req.params.quizId, quiz)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})
module.exports = router
