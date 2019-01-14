import { config } from "../config/config";
import { setlist_factory, keyval_factory } from "@tencent/fw_redis_model";
import { SetList } from "@tencent/fw_redis_model/models/set_list_model";
import { KeyValModel } from "@tencent/fw_redis_model/models/key_val_model";

/**
 * 记录如下信息：
 * 1. 正方投票记录
 * 2. 反方投票记录
 * 3. 正方跑票记录
 * 4. 反方跑票记录 (由反方跳去正方，则反方跑票记录+1)
 */
export class VoteHandler {
    private positive_vote_list: SetList
    private negative_vote_list: SetList
    private positive_run_counter: KeyValModel
    private negative_run_counter: KeyValModel
    private env: string
    constructor() {
        this.env = config.server.env
        /**
         * 正方投票记录
         */
        this.positive_vote_list = setlist_factory({
            pre: this.env,
            key: CacheName.positive_vote_counter,
        })
        /**
         * 反方投票记录
         */
        this.negative_vote_list = setlist_factory({
            pre: this.env,
            key: CacheName.negative_vote_counter
        })
        /**
         * 正方逃票记录
         */
        this.positive_run_counter = keyval_factory({
            pre: this.env,
            key: CacheName.positive_run_counter
        })
        /**
         * 反方逃票记录
         */
        this.negative_run_counter = keyval_factory({
            pre: this.env,
            key: CacheName.negative_run_counter
        })
    }

    /**
     * 给正方投票
     * @param {string} 投票人Id
     */
    async vote2positive(id: string) {
        return await this.positive_vote_list.add(id)
    }

    /**
     * 给反方投票
     * @param {string} 投票人Id
     */
    async vote2negative(id: string) {
       return await this.negative_vote_list.add(id)
    }

    /**
     * 从正方放逃票
     */
    async run_from_positive() {
        await this.positive_run_counter.decr()
        await this.negative_run_counter.incrby()
        return
    }

    /**
     * 从反方逃票
     */
    async run_from_negative() {
        await this.negative_run_counter.decr()
        await this.positive_run_counter.incrby()
        return
    }

    /**
     * 从正方转投
     * @param {string} id
     */
    async remove_from_positive(id: string) {
        await this.positive_vote_list.remove([id])
        return
    }

    /**
     * 从反方转投
     * @param {string} id
     */
    async remove_from_negative(id: string) {
        await this.negative_vote_list.remove([id])
        return
    }

    /**
     * 查看正方投票数
     */
    async get_positive_vote_list(): Promise<string[]> {
        let id_list = await this.positive_vote_list.get_total_members()
        return id_list
    }

    /**
     * 查看反方投票数
     */
    async get_negative_vote_list(): Promise<string[]> {
        let id_list = await this.negative_vote_list.get_total_members()
        return id_list
    }

    /**
     * 查看正方套票数
     * @return {number}
     */
    async get_positive_run_counter() {
        let counter = await this.positive_run_counter.get()
        return counter
    }

    /**
     * 查看反方投票数
     * @return {number}
     */
    async get_negative_run_counter() {
        let counter = await this.negative_run_counter.get()
        return counter
    }

    /**
     * 查看总投票数
     */
    async get_total_vote_counter(): Promise<number> {
        const negative_list = await this.get_negative_vote_list(),
            positive_list = await this.get_positive_vote_list()
        return negative_list.length + positive_list.length
    }

    /**
     * 清除正方投票数量
     */
    async del_positive_vote_counter() {
        await this.positive_vote_list.del()
        console.log('positive vote clear done')
        return
    }

    /**
     * 清除反方投票数量
     */
    async del_negative_vote_counter() {
        await this.negative_vote_list.del()
        console.log('negative vote clear done')
        return 
    }

    /**
     * 清除正方跑票
     */
    async del_positive_run_counter() {
        await this.positive_run_counter.del()
        console.log('positive run clear done')
        return 
    }

    /**
     * 清除反方跑票
     */
    async del_negative_run_counter() {
        await this.negative_run_counter.del()
        console.log('negative run clear done')
        return         
    }
}