const { dbCatch, ErrorHandler } = require('../../../error')
const Recommendation = require('../../../Schemas/recommendation')
const { parseImg } = require('../../../Schemas/query')
const asyncHandler = require('express-async-handler')

/** 
 * @api {post} /recommendation add recommendation
 * @apiName AddRecommendation
 * @apiGroup In/recommendation
 * @apiDescription 新增簡歷
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 * 
 * @apiparam {String} title 簡歷標題
 * @apiparam {String} name 姓名
 * @apiparam {String} desire_work_type 想要職位
 * @apiparam {String} contact 電話
 * @apiparam {String} email 信箱
 * @apiparam {String} diploma 學位
 * @apiparam {String[]} experience 經驗
 * @apiparam {String[]} speciality 專長
 * @apiparam {File} file 照片
 * 
 * @apiSuccess (201) title 簡歷標題
 * @apiSuccess (201) _id mongoDB的_id
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res) => {
  const account = req.session.loginAccount
  if (!account) throw new ErrorHandler(403, 'not login')

  const { title, name, desire_work_type, contact, email, diploma, experience, speciality } =
    req.body

  const img = parseImg(req.file)
  const recomd = await new Recommendation({
    account,
    title: { title, name, desire_work_type },
    info: { contact, email, diploma },
    spec: { experience, speciality },
    img,
  })
    .save()
    .catch(dbCatch)

  return res.status(200).send({ title: recomd.title.title, _id: recomd._id })
})
