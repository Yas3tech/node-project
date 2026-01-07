import Joi from 'joi';

export const createOrganizerSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(1)
        .pattern(/^[^0-9]+$/)
        .required()
        .messages({
            'string.pattern.base': 'firstName mag geen cijfers bevatten',
            'string.empty': 'firstName is verplicht'
        }),
    lastName: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            'string.empty': 'lastName is verplicht'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Ongeldig e-mailadres',
            'string.empty': 'email is verplicht'
        }),
    phone: Joi.string().trim().allow(''),
    company: Joi.string().trim().allow('')
});

export const updateOrganizerSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(1)
        .pattern(/^[^0-9]+$/)
        .messages({
            'string.pattern.base': 'firstName mag geen cijfers bevatten'
        }),
    lastName: Joi.string().trim().min(1),
    email: Joi.string().email().messages({
        'string.email': 'Ongeldig e-mailadres'
    }),
    phone: Joi.string().trim().allow(''),
    company: Joi.string().trim().allow('')
}).min(1);
