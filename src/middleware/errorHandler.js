export const errorHandler = (err, req, res, next) => {
    if (err.message) {
        console.error('Error:', err.message);
    } else {
        console.error('Error Object:', err);
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validatiefout',
            message: err.message,
            statusCode: 400
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Ongeldige ID',
            message: 'De opgegeven ID is niet geldig',
            statusCode: 400
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            error: 'Dubbele waarde',
            message: `${field} bestaat al`,
            statusCode: 400
        });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.name || 'Serverfout',
        message: err.message || 'Er is een onverwachte fout opgetreden',
        statusCode
    });
};
