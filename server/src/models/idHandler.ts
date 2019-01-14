import { config } from "../config/config";
import { keyval_factory } from "@tencent/fw_redis_model";
import { KeyValModel } from "@tencent/fw_redis_model/models/key_val_model";

/**
 * 记录如下信息：
 * 1. 合法id
 */
export class IdHandler {
    private valid_id_counter: KeyValModel
    private env: string
    constructor() {
        this.env = config.server.env
        /**
         * 合法id记录
         */
        this.valid_id_counter = keyval_factory({
            pre: this.env,
            key: CacheName.valid_id_counter
        })
    }

    /**
     * 判断是否为获取合法id
     * @param {number} 
     */
    async is_valid_id(id: number) {
        const valid_open_id = +await this.valid_id_counter.get()
        if (valid_open_id >= id) {
            return true
        } else {
            return false
        }
    }

    /**
     * 获取id
     */
    async get_valid_id() {
        return await this.valid_id_counter.incrby()
    }

    /**
     * 清除id
     */
    async reset_id() {
        await this.valid_id_counter.del()
    }
}