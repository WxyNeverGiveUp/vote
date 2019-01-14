import { networkInterfaces } from "os";


let net_info = networkInterfaces()
let address = net_info.eth1[0].address,
    addressNum = Number(address.split('.')[3])
export function getConfig(): Config.Options {
    return {
        server: {
            "secret": '6a03578a1ad3984e918df7c920b6be5d',
            "ip": address,
            "port": 40000,
            "machine_id": addressNum,
            "env": Env.TEST,
            "mount": 'mwmm_test', //待修改
            "debug": SwitchValue.OFF
        },
        redis: {
            "host": "cache.pubgmxcx.ttaxch5.db",
            "port": 50000,
            "max": 10,
            "min": 1,
            "timeout": 30000,
            "log": SwitchValue.OFF,
            "expire": 86400,
            "turnOn": SwitchValue.ON,
            "password": "redis@pubg2018"
        }
    }
}