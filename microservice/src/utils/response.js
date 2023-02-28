import { responseInterceptor } from "../middleware"

export const toSuccess = ({ res, status = 200, data, message }) => {
    responseInterceptor({}, res, () => { })
    const responseData = { data, message }
    if (!data) delete responseData.data
    res.status(status).json(responseData)
}
