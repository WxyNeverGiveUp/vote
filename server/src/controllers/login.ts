import * as Koa from 'koa'
import { IdHandler } from "./../models/idHandler";

export async function auth(ctx: Koa.Context) {
    const { id } = ctx.request.body,
        id_handler = new IdHandler()
    let ret_data: cmd.auth.response
    ctx.response.header('Allow', 'GET, POST') 
    ctx.response.set('Allow', 'GET, POST')
    if (!id) {
        const id = await id_handler.get_valid_id()
        ret_data = {
            ret: AppCode.done,
            data: {
                id: id + '',
                auth_success: true
            }
        }
        ctx.body = ret_data
        return
    } else {
        let is_valid = await id_handler.is_valid_id(id)
        if (is_valid) {
            ret_data = {
                ret: AppCode.done,
                data: {
                    auth_success: true
                }
            }
            ctx.body = ret_data
            return
        } else {
            ret_data = {
                ret: AppCode.done,
                data: {
                    auth_success: false
                }
            }
            ctx.body = ret_data
            return
        }
    }
}