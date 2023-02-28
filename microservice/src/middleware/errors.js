import { isCelebrateError } from "celebrate";
import { moduleLogger } from "@sliit-foss/module-logger";

const logger = moduleLogger("Error-handler");

export const errorHandler = (err, _req, res, _next) => {
    if (!res.errorLogged) {
        logger.error(err.message, err);
        res.errorLogged = true;
    }
    if (isCelebrateError(err)) {
        for (const [_key, value] of err.details.entries()) {
            return res.status(422).json({ message: value.details[0].message });
        }
    }
    let message = err.message;
    if (res.polyglot) message = res.polyglot.t(message)
    return res.status(err.status ?? 500).json({
        message,
    });
}