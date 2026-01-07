import Joi from 'joi';

export const createEventSchema = Joi.object({
    title: Joi.string().trim().min(1).required().messages({
        'string.empty': 'title is verplicht'
    }),
    description: Joi.string().trim().allow(''),
    location: Joi.string().trim().min(1).required().messages({
        'string.empty': 'location is verplicht'
    }),
    startDate: Joi.date().required().messages({
        'date.base': 'startDate moet een geldige datum zijn',
        'any.required': 'startDate is verplicht'
    }),
    endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
        'date.base': 'endDate moet een geldige datum zijn',
        'date.greater': 'endDate moet na startDate liggen',
        'any.required': 'endDate is verplicht'
    }),
    capacity: Joi.number().integer().min(1).messages({
        'number.base': 'capacity moet een nummer zijn',
        'number.min': 'capacity moet minimaal 1 zijn'
    }),
    organizerId: Joi.number().integer().messages({
        'number.base': 'organizerId moet een nummer zijn'
    })
});

export const updateEventSchema = Joi.object({
    title: Joi.string().trim().min(1),
    description: Joi.string().trim().allow(''),
    location: Joi.string().trim().min(1),
    startDate: Joi.date(),
    endDate: Joi.date().when('startDate', {
        is: Joi.exist(),
        then: Joi.date().greater(Joi.ref('startDate')).messages({
            'date.greater': 'endDate moet na startDate liggen'
        })
    }),
    capacity: Joi.number().integer().min(1),
    organizerId: Joi.number().integer()
}).min(1);
