export function getConfig(): Config.Options {
    return {
        server: {
            "secret": '6a03578a1ad3984e918df7c920b6be5d',
            "ip": '127.0.0.1',
            "port": 3000,
            "machine_id": 1,
            "env": "local",
            "mount": 'test', //待修改
            "debug": SwitchValue.OFF
        },
        redis: {
            "host": "localhost",
            "port": 6379,
            "max": 10,
            "min": 1,
            "timeout": 30000,
            "log": SwitchValue.OFF,
            "expire": 86400,
            "turnOn": SwitchValue.ON,
            "password": ""
        }
    }
}