import { getDB, saveDB } from '../config/db.js';

const rowToObject = (columns, row) => {
    const obj = {};
    columns.forEach((col, i) => obj[col] = row[i]);
    return obj;
};

const execQuery = (sql, params = []) => {
    const db = getDB();
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
        results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
};

const runQuery = (sql, params = []) => {
    const db = getDB();
    db.run(sql, params);
    saveDB();
};

export const getOrganizers = (req, res, next) => {
    try {
        const { limit = 10, offset = 0, q, sortBy = 'createdAt', order = 'desc' } = req.query;

        const allowedSort = ['id', 'firstName', 'lastName', 'email', 'createdAt'];
        const sortField = allowedSort.includes(sortBy) ? sortBy : 'createdAt';
        const sortOrder = order === 'asc' ? 'ASC' : 'DESC';

        let whereClause = '';
        let params = [];

        if (q) {
            whereClause = `WHERE firstName LIKE ? OR lastName LIKE ? OR email LIKE ? OR company LIKE ?`;
            const searchTerm = `%${q}%`;
            params = [searchTerm, searchTerm, searchTerm, searchTerm];
        }

        const countResult = execQuery(`SELECT COUNT(*) as total FROM organizers ${whereClause}`, params);
        const total = countResult[0]?.total || 0;

        const organizers = execQuery(`
      SELECT * FROM organizers ${whereClause}
      ORDER BY ${sortField} ${sortOrder}
      LIMIT ? OFFSET ?
    `, [...params, Number(limit), Number(offset)]);

        res.json({
            data: organizers,
            pagination: { total, limit: Number(limit), offset: Number(offset) }
        });
    } catch (error) {
        next(error);
    }
};

export const getOrganizerById = (req, res, next) => {
    try {
        const organizers = execQuery('SELECT * FROM organizers WHERE id = ?', [Number(req.params.id)]);

        if (!organizers.length) {
            return res.status(404).json({
                error: 'Niet gevonden',
                message: 'Organisator niet gevonden',
                statusCode: 404
            });
        }
        res.json(organizers[0]);
    } catch (error) {
        next(error);
    }
};

export const createOrganizer = (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, company } = req.body;

        const existing = execQuery('SELECT id FROM organizers WHERE email = ?', [email]);
        if (existing.length) {
            return res.status(400).json({
                error: 'Dubbele waarde',
                message: 'email bestaat al',
                statusCode: 400
            });
        }

        const now = new Date().toISOString();
        runQuery(`
      INSERT INTO organizers (firstName, lastName, email, phone, company, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [firstName, lastName, email, phone || null, company || null, now, now]);

        const result = execQuery('SELECT * FROM organizers ORDER BY id DESC LIMIT 1');
        res.status(201).json(result[0]);
    } catch (error) {
        next(error);
    }
};

export const updateOrganizer = (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, company } = req.body;
        const id = Number(req.params.id);

        const existing = execQuery('SELECT * FROM organizers WHERE id = ?', [id]);
        if (!existing.length) {
            return res.status(404).json({
                error: 'Niet gevonden',
                message: 'Organisator niet gevonden',
                statusCode: 404
            });
        }

        const now = new Date().toISOString();
        runQuery(`
      UPDATE organizers SET
        firstName = COALESCE(?, firstName),
        lastName = COALESCE(?, lastName),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        company = COALESCE(?, company),
        updatedAt = ?
      WHERE id = ?
    `, [firstName ?? null, lastName ?? null, email ?? null, phone ?? null, company ?? null, now, id]);

        const result = execQuery('SELECT * FROM organizers WHERE id = ?', [id]);
        res.json(result[0]);
    } catch (error) {
        next(error);
    }
};

export const deleteOrganizer = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const existing = execQuery('SELECT * FROM organizers WHERE id = ?', [id]);

        if (!existing.length) {
            return res.status(404).json({
                error: 'Niet gevonden',
                message: 'Organisator niet gevonden',
                statusCode: 404
            });
        }

        runQuery('DELETE FROM organizers WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
