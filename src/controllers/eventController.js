import { getDB, saveDB } from '../config/db.js';

const execQuery = (sql, params = []) => {
    try {
        const db = getDB();
        const stmt = db.prepare(sql);
        stmt.bind(params);
        const results = [];
        while (stmt.step()) {
            results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
    } catch (err) {
        console.error('SQL Exec Error:', err.message, '| Query:', sql);
        throw err;
    }
};

const runQuery = (sql, params = []) => {
    try {
        const db = getDB();
        db.run(sql, params);
        saveDB();
    } catch (err) {
        console.error('SQL Run Error:', err.message, '| Query:', sql);
        throw err;
    }
};

export const getEvents = (req, res, next) => {
    try {
        const { limit = 10, offset = 0, q, sortBy = 'createdAt', order = 'desc' } = req.query;

        const allowedSort = ['id', 'title', 'location', 'startDate', 'endDate', 'createdAt'];
        const sortField = allowedSort.includes(sortBy) ? sortBy : 'createdAt';
        const sortOrder = order === 'asc' ? 'ASC' : 'DESC';

        let whereClause = '';
        let params = [];

        if (q) {
            whereClause = `WHERE e.title LIKE ? OR e.description LIKE ? OR e.location LIKE ?`;
            const searchTerm = `%${q}%`;
            params = [searchTerm, searchTerm, searchTerm];
        }

        const countResult = execQuery(`SELECT COUNT(*) as total FROM events e ${whereClause}`, params);
        const total = countResult[0]?.total || 0;

        const events = execQuery(`
      SELECT e.*, o.firstName as organizerFirstName, o.lastName as organizerLastName
      FROM events e
      LEFT JOIN organizers o ON e.organizerId = o.id
      ${whereClause}
      ORDER BY e.${sortField} ${sortOrder}
      LIMIT ? OFFSET ?
    `, [...params, Number(limit), Number(offset)]);

        res.json({
            data: events,
            pagination: { total, limit: Number(limit), offset: Number(offset) }
        });
    } catch (error) {
        next(error);
    }
};

export const getEventById = (req, res, next) => {
    try {
        const events = execQuery(`
      SELECT e.*, o.firstName as organizerFirstName, o.lastName as organizerLastName
      FROM events e
      LEFT JOIN organizers o ON e.organizerId = o.id
      WHERE e.id = ?
    `, [Number(req.params.id)]);

        if (!events.length) {
            return res.status(404).json({
                error: 'Niet gevonden',
                message: 'Evenement niet gevonden',
                statusCode: 404
            });
        }
        res.json(events[0]);
    } catch (error) {
        next(error);
    }
};

export const createEvent = (req, res, next) => {
    try {
        const { title, description, location, startDate, endDate, capacity, organizerId } = req.body;
        const now = new Date().toISOString();

        const startStr = startDate instanceof Date ? startDate.toISOString() : startDate;
        const endStr = endDate instanceof Date ? endDate.toISOString() : endDate;

        runQuery(`
      INSERT INTO events (title, description, location, startDate, endDate, capacity, organizerId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, description || null, location, startStr, endStr, capacity || null, organizerId || null, now, now]);

        const result = execQuery('SELECT * FROM events ORDER BY id DESC LIMIT 1');
        res.status(201).json(result[0]);
    } catch (error) {
        next(error);
    }
};

export const updateEvent = (req, res, next) => {
    try {
        const { title, description, location, startDate, endDate, capacity, organizerId } = req.body;
        const id = Number(req.params.id);

        console.log('Updating Event:', id, 'Body:', req.body);

        const existing = execQuery('SELECT * FROM events WHERE id = ?', [id]);
        if (!existing.length) {
            console.log('Event not found:', id);
            return res.status(404).json({
                error: 'Niet gevonden',
                message: 'Evenement niet gevonden',
                statusCode: 404
            });
        }

        const startStr = startDate instanceof Date ? startDate.toISOString() : (startDate ?? null);
        const endStr = endDate instanceof Date ? endDate.toISOString() : (endDate ?? null);

        const now = new Date().toISOString();
        runQuery(`
      UPDATE events SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        location = COALESCE(?, location),
        startDate = COALESCE(?, startDate),
        endDate = COALESCE(?, endDate),
        capacity = COALESCE(?, capacity),
        organizerId = COALESCE(?, organizerId),
        updatedAt = ?
      WHERE id = ?
    `, [title ?? null, description ?? null, location ?? null, startStr, endStr, capacity ?? null, organizerId ?? null, now, id]);

        const result = execQuery('SELECT * FROM events WHERE id = ?', [id]);
        res.json(result[0]);
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const existing = execQuery('SELECT * FROM events WHERE id = ?', [id]);

        if (!existing.length) {
            return res.status(404).json({
                error: 'Niet gevonden',
                message: 'Evenement niet gevonden',
                statusCode: 404
            });
        }

        runQuery('DELETE FROM events WHERE id = ?', [id]);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
