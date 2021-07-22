import joi from "joi";
import { stripHtml } from "string-strip-html";

const youtubeRegEx = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export async function recommendationBodyValidation(body: Object): Promise<Object> {
    const schema = joi.object({
        name: joi.string().min(3).trim().required(),
        youtubeLink: joi.string().uri().pattern(youtubeRegEx).required()
    });

    const validBody = await schema.validateAsync(body);

    return {
        name: stripHtml(validBody.name).result.trim(),
        youtubeLink: stripHtml(validBody.youtubeLink).result.trim(),
    };
}