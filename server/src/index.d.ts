/**
 * 全局声明文件
 */
declare const enum SwitchValue {
    OFF,
    ON
}

declare const enum Env {
    TEST = 'test',
    ONLINE = 'online',
    LOCAL = 'local'
}

declare namespace Config {
    /**
      * Redis配置项
      */
     type Redis = {
        host: string,
        port: number,
        max: number,
        min: number,
        timeout: number,
        log: SwitchValue,
        expire: number,
        turnOn: SwitchValue,
        password: string
    }

    /***
     * 服务配置项，包含主要环境变量
     */
    type Server = {
        ip: string,
        port: number,
        machine_id: number,
        debug: SwitchValue,
        env: string,
        secret: string,
        mount: string,
        data_file_path?: string,
        certification_path?: string
    }

    /**
     * 配置项
     */
    type Options = {
        server: Server,
        redis: Redis
    }
}

declare const enum CacheName {
    positive_vote_counter = 'strange_talk_positive_vote_counter', // 正方投票数
    negative_vote_counter = 'strange_talk_negative_vote_counter', // 反方投票数
    positive_run_counter = 'strange_talk_positive_run_counter', // 正方跑票数
    negative_run_counter = 'strange_talk_negative_run_counter', // 反方跑票数
    valid_id_counter = 'strange_talk_valid_id_counter' // 合法ID 计数器
}

declare namespace cmd {
    interface BaseResponse<U, T> {
        ret: number,
        sid?: number,
        msg?: string,
        cmd?: U,
        data: T
    }
    /**
     * 拉投票列表接口
     */
    module get_total_counter {
        type response = BaseResponse<'get_total_counter', {
            negative_run_counter: number,
            negative_vote_counter: number,
            positive_run_counter: number,
            positive_vote_counter: number,
            total_vote: number
        }>
    }

    /**
     * 正方投票
     */
    module vote2positive {
        type response = BaseResponse<'vote2positive', {}>
    }

    /**
     * 反方投票
     */
    module vote2negative {
        type response = BaseResponse<'vote2negative', {}>
    }

    /**
     * 清除跑票
     */
    module clear_run_ticket {
        type response = BaseResponse<'clear_run_ticket', {}>
    }

    /**
     * 清除投票
     */
    module clear_vote {
        type response = BaseResponse<'clear_vote', {}>
    }

    /**
     * 清除Id
     */
    module clear_id {
        type response = BaseResponse<'clear_id', {}>
    }

    /**
     * 登录auth
     */
    module auth {
        type response = BaseResponse<'auth', {
            id?: string,
            auth_success: boolean // 是否登录成功
        }>
    }
}

declare const enum AppCode {
    done = 0
}