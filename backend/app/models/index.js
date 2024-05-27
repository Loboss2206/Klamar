const User = require('./user.model.js')
const UserConfig = require('./user-config.model.js')
const Quizzes = require('./quiz.model.js')
const Question = require('./question.model.js')
const StatQuestion = require('./stat-question.model.js')
const StatMemory = require('./stat-memory.model.js')
const StatSimon = require('./stat-simon.model.js')
const Stat = require('./stat.model.js')

module.exports = {
  User,
  UserConfig,
  StatQuestion,
  StatMemory,
  StatSimon,
  Stat,
  Quizzes,
  Question
}
