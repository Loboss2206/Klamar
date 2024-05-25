const { Router } = require('express')
const UserRouter = require('./users')
const QuizRouter = require('./quizzes')
const QuestionRouter = require('./questions')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/users', UserRouter)
router.use('/quizzes', QuizRouter)
router.use('/questions', QuestionRouter)

module.exports = router
