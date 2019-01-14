import { Route } from "../lib/route"
import { auth } from "../controllers/login"

export = [
    new Route({ // 登录
    cmd: 'auth',
    handler: [auth],
    method: "get"
})]