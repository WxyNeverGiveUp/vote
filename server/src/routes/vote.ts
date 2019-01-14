import { Route } from "../lib/route"
import { get_total_counter, vote2positive, clear_run_ticket, clear_vote, vote2negative, clear_id } from "../controllers/vote"

export = [new Route({ // 获取总投票数
    cmd: 'get_total_counter',
    handler: [get_total_counter],
    method: 'get'
}), new Route({ // 正方投票
    cmd: 'vote2positive',
    handler: [vote2positive],
    method: 'get'
}), new Route({ // 反方投票
    cmd: 'vote2negative',
    handler: [vote2negative],
    method: 'get'
}), new Route({ // 清除跑票
    cmd: 'clear_run_ticket',
    handler: [clear_run_ticket],
    method: 'get'
}), new Route({ // 清除投票
    cmd: 'clear_vote',
    handler: [clear_vote],
    method: 'get'
}), new Route({
    cmd: 'clear_id',
    handler: [clear_id],
    method: 'get'
})]
