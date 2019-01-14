import { networkInterfaces } from "os";

/****
 * 压测机IP
 */
let press_test_ips = ['100.117.96.55', '100.117.96.34'],
    /**
     * 测试机
     */
    test_ips = ['10.54.238.67'],
    total_test_ips = press_test_ips.concat(test_ips)

let net_info = networkInterfaces()

export let config: Config.Options

if (net_info.eth1) {
    let address = net_info.eth1[0].address
    if (total_test_ips.includes(address)) {
        console.log('use test_config')
        config = require('./testConfig').getConfig()
    }
} else {
    config = require('./localConfig').getConfig()
}

