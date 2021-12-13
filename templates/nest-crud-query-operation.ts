const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 *
 * @param {*} Model // Sequelize Model  User , Post ect.
 * @param query.status : {
 *    options:  all | active | deactive ,
 *    default: active,
 *    desc: "check if exist col active and filter it"
 * }
 * @param query.page {
 *    optional
 *    description: the property page return current page. If exists, in the response we will get info about page(current), totalPages and offset
 * }
 * @param query.orderBy `{
 *      optional
 *      description: return ordered column
 * }
 * @param query.direction {
 *     options: ASC | DESC
 *     default: ASC
 *     description: ordering direction
 *  }
 * @param query.filter.[colName] {
 *     optional,
 *     description: We use it for filtering table by column.
 *                  on the column name add prefixer filter. and value of it.
 *                  example:
 *                     ?filter.user_name=Joh&filter.title=My New Po
 *   }
 * *@param query.where.[colName] {
 *     optional,
 *     description: where statement
 *                  example userTable:
 *                     ?where.Name=John&where.role_id=1
 *   }
 *
 * @param options {
 *   optional,
 *   type: object
 *   properties: {
 *       include : resource: https://sequelize.org/master/manual/eager-loading.html#using--code-findandcountall--code--with-includes
 *
 *   }
 * }
 *
 * Example:
 *  ?status=all&orderBy=BVHNummer&direction=DESC&filter.BVHNummer=B&filter.Ort=KRI
 */
module.exports = async (Model, query, options = {}) => {
  // example
  //?status=all&orderBy=BVHNummer&direction=DESC&filter.BVHNummer=B&filter.Ort=KRI
  const limit = query.page ? (query.limit ? Number(query.limit) : 15) : null;
  const offset = query.page ? 0 + (query.page - 1) * limit : null;

  let order = [];
  if (query.orderBy) {
    const direction = query.direction ? query.direction : 'ASC'; //DESC & ASC
    if (query.orderBy.includes('.')) {
      let [orderedModel, orderedColumn] = query.orderBy.split('.');
      const fk = orderedModel.toLowerCase() + '_id';
      order.push([
        {
          model: orderedModel,
          foreignKey: fk,
        },
        orderedColumn,
        direction,
      ]);
    } else {
      order.push([query.orderBy, direction]);
    }
    // const direction = query.direction ? query.direction : 'ASC'  //DESC & ASC
    // order.push([ query.orderBy, direction])
  }

  let filters = filterQuery(query);

  let dbModel;

  let where = { ...filters };

  if (query.status) {
    let status = query.status ? query.status : 'active';
    let active = status === 'active' ? true : false;
    if (status === 'active' || status === 'deactive')
      where = { ...where, active };
  }

  const include = options.include || null;

  dbModel = await Model.findAndCountAll({
    offset,
    limit,
    order,
    where,
    include,
  });

  if (query.page) {
    dbModel.page = Number(query.page);
    dbModel.offset = offset;
    dbModel.totalPages = Math.ceil(dbModel.count / limit);
  }

  return dbModel;
};
const filterQuery = (query) => {
  let key,
    keys = {};

  for (key in query) {
    if (
      query.hasOwnProperty(key) &&
      /filter/.test(key) &&
      typeof query[key] !== 'undefined'
    ) {
      let tableName = key.slice(7);
      keys[tableName] = { [Op.like]: `${query[key]}%` };
    }
    if (
      query.hasOwnProperty(key) &&
      /where/.test(key) &&
      typeof query[key] !== 'undefined'
    ) {
      let tableName = key.slice(6);
      keys[tableName] = { [Op.like]: `${query[key]}` };
    }
  }

  return keys;
};
