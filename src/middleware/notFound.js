export const notFound = (req, res, next) => {
    res.status(404).json({
        error: 'Niet gevonden',
        message: `Route ${req.method} ${req.originalUrl} niet gevonden`,
        statusCode: 404
    });
};
