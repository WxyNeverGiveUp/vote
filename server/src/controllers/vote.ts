import * as Koa from 'koa'
import { IdHandler } from "./../models/idHandler";
import { VoteHandler } from '../models/voteHandler';

const empty: any = {}

// /**
//  * 获取正方投票数
//  */
// export async function get_positive_vote_counter(ctx: Koa.Context) {
//     const vote_handler = new VoteHandler()
//     let ret_data = {
//         data: await vote_handler.get_positive_vote_list()
//     }
//     ctx.body = ret_data
//     return
// }

// /**
//  * 获取反方投票数
//  */
// export async function get_negative_vote_counter(ctx: Koa.Context) {
//     const vote_handler = new VoteHandler()
//     let ret_data = {
//         data: await vote_handler.get_positive_vote_list()
//     }
//     ctx.body = ret_data
//     return
// }

// /**
//  * 获取正方逃票数
//  */
// export async function get_positive_run_counter(ctx: Koa.Context) {
//     const vote_handler = new VoteHandler()
//     let ret_data = {
//         data: await vote_handler.get_positive_run_counter()     
//     }
//     ctx.body = ret_data
//     return
// }

// /**
//  * 获取反方逃票数量
//  */
// export async function get_negative_run_counter(ctx: Koa.Context) {
//     const vote_handler = new VoteHandler()
//     let ret_data = {
//         data: await vote_handler.get_negative_run_counter()
//     }
//     ctx.body = ret_data
//     return
// }

/**
 * 获取全部票数
 */
export async function get_total_counter(ctx: Koa.Context) {
    const vote_handler = new VoteHandler(),
        negative_vote_list = await vote_handler.get_negative_vote_list(),
        positive_vote_list = await vote_handler.get_positive_vote_list(),
        negative_run_counter = await vote_handler.get_negative_run_counter(),
        positive_run_counter = await vote_handler.get_positive_run_counter()

    let ret_data: cmd.get_total_counter.response = {
        ret: AppCode.done,
        data: {
            positive_run_counter: +positive_run_counter,
            negative_run_counter: +negative_run_counter,
            negative_vote_counter: negative_vote_list.length,
            positive_vote_counter: positive_vote_list.length,
            total_vote: negative_vote_list.length + positive_vote_list.length
        }
    }
    ctx.body = ret_data
    return
}

/**
 * 给正方投票
 */
export async function vote2positive(ctx: Koa.Context) {
    const { id } = ctx.request.body,
        vote_handler = new VoteHandler()
    
    ctx.response.header('Allow', 'GET, POST') 
    ctx.response.set('Allow', 'GET, POST')

    const negative_list = await vote_handler.get_negative_vote_list()
    if (negative_list.includes(id + '')) {
        await vote_handler.run_from_negative()
        await vote_handler.remove_from_negative(id + '')
    }
    await vote_handler.vote2positive(id)
    let ret_data: cmd.vote2positive.response = {
        ret: AppCode.done,
        data: empty
    }
    ctx.body = ret_data
    return
}

/**
 * 给反方投票
 */
export async function vote2negative(ctx: Koa.Context) {
    const { id } = ctx.request.body,
        vote_handler = new VoteHandler()
    
        ctx.response.header('Allow', 'GET, POST')  
        ctx.response.set('Allow', 'GET, POST')
    
    const positive_list = await vote_handler.get_positive_vote_list()
    if (positive_list.includes(id + '')) {
        await vote_handler.run_from_positive()
        await vote_handler.remove_from_positive(id + '')
    }
    await vote_handler.vote2negative(id)
    let ret_data: cmd.vote2negative.response = {
        ret: AppCode.done,
        data: empty
    }
    ctx.body = ret_data
    return
}

/**
 * 重置跑票
 */
export async function clear_run_ticket(ctx: Koa.Context) {
    const vote_handler = new VoteHandler()

    await vote_handler.del_negative_run_counter()
    await vote_handler.del_positive_run_counter()

    let ret_data: cmd.clear_run_ticket.response = {
        ret: AppCode.done,
        data: empty
    }
    ctx.body = ret_data
    return
}

/**
 * 重置投票数量
 */
export async function clear_vote(ctx: Koa.Context) {
    const vote_handler = new VoteHandler()

    await vote_handler.del_negative_vote_counter()
    await vote_handler.del_positive_vote_counter()

    let ret_data: cmd.clear_vote.response = {
        ret: AppCode.done,
        data: empty
    }
    ctx.body = ret_data
    return
}

/**
 * 清除id
 */
export async function clear_id(ctx: Koa.Context) {
    const id_handler = new IdHandler()
    await id_handler.reset_id()

    let ret_data: cmd.clear_id.response = {
        ret: AppCode.done,
        data: empty
    }
    ctx.body = ret_data
    return
}