const pool = require('../config/database');

const executeQueryWithValues = async (query, values) => {
  try {
    console.log(query);
    const conn = await pool.getConnection();
    const result = await conn.query(query, values);
    conn.release();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// getEntities renvoie un array, même vide si la requête de sélection ne donne rien, traiter la réponse en conséquence dans les modèles
const getEntities = async (tableName, options = {}) => {
  try {
    // Options pour exclure certains champs, n'inclure que certains champs, les critères de recherche avec WHERE et l'opérateur de WHERE ('AND' ou 'OR')
    const {
      excludeFields = [],
      includeFields = [],
      where = {},
      whereOperator = 'AND',
      join = false,
      joinConditions = {
        joinType: '',
        table: '',
        on: ''
      }
    } = options;
    const conn = await pool.getConnection();

    let tableFields = [];
    if (join && joinConditions.table) {
      const joinTableFields = await conn.query(`SHOW COLUMNS FROM ${joinConditions.table}`);
      tableFields = joinTableFields.map((field) => `${joinConditions.table}.${field.Field}`);
    } else {
      const mainTableFields = await conn.query(`SHOW COLUMNS FROM ${tableName}`);
      tableFields = mainTableFields.map((field) => `${tableName}.${field.Field}`);
    }

    conn.release();

    const finalIncludeFields = includeFields.length
      ? includeFields
      : tableFields.filter((field) => !excludeFields.includes(field));

    const includeFieldsString = finalIncludeFields.length ? finalIncludeFields.join(',') : '*';

    const joinClauses = (() => {
      if (joinConditions.table && joinConditions.on) {
        const joinType = joinConditions.joinType || 'INNER JOIN';
        return `${joinType} ${joinConditions.table} ON ${joinConditions.on}`;
      }
      return '';
    })();

    const whereClause = Object.keys(where)
      .map((key) => `\`${key}\` = ?`)
      .join(` ${whereOperator} `);

    let query = `SELECT ${includeFieldsString} FROM ${tableName}`;
    if (joinClauses) {
      query += ` ${joinClauses}`;
    }

    let values = [];
    if (whereClause) {
      query += ` WHERE ${whereClause}`;
      values = Object.values(where);
    }

    return await executeQueryWithValues(query, values);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createEntity = async (tableName, data) => {
  try {
    const fields = Object.getOwnPropertyNames(data);
    const placeholders = Array(fields.length).fill('?').join(', ');
    const values = Object.values(data);
    const query = `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`;

    return await executeQueryWithValues(query, values);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateEntity = async (tableName, options) => {
  try {
    const { setFields = {}, where = {} } = options;

    const setKeys = Object.keys(setFields);
    const whereKeys = Object.keys(where);

    if (whereKeys.length === 0) {
      throw new Error('Il manque des conditions WHERE');
    }

    if (setKeys.length === 0) {
      throw new Error('Il manque le nom des champs à mettre à jour');
    }

    const setClause = setKeys.map((key) => `\`${key}\` = ?`).join(', ');
    const whereClause = whereKeys.map((key) => `\`${key}\` = ?`).join(' AND ');

    const values = [...Object.values(setFields), ...Object.values(where)];

    const query = `UPDATE \`${tableName}\` SET ${setClause} WHERE ${whereClause}`;

    return await executeQueryWithValues(query, values);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteEntity = async (tableName, where) => {
  try {
    const whereClauses = Object.keys(where)
      .map((fieldName) => `\`${fieldName}\` = ?`)
      .join(' AND ');

    const values = Object.values(where);

    const query = `DELETE FROM ${tableName} WHERE ${whereClauses}`;
    return await executeQueryWithValues(query, values);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getEntities,
  createEntity,
  updateEntity,
  deleteEntity,
  executeQueryWithValues
};
