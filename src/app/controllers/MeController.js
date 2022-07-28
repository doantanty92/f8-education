const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../until/mongoose')

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({})

    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type
      })
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render('me/stored-courses', {
          courses: multipleMongooseToObject(courses),
          deletedCount
        })
      })
      .catch(next)
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Promise.all([Course.findDeleted({}), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
          deletedCount
        })
      })
      .catch(next)
  }
}
module.exports = new MeController()
