import * as Joi from "joi";

/**
 * Validation schema to check whther the variables has the correct types
 */

export const JoiValidationSchema = Joi.object({
    MONGO_DB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6),
})