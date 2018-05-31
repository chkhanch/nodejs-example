(
    () => {
        const dateFormat = require('./lib/functions/correctTime');
        const cluster = require('cluster');

        const settings = [{
                exec: 'https-server.js',
                args: ['--use', 'https'],
                silent: false
            },
            {
                exec: 'http-server.js',
                args: ['--use', 'http'],
                silent: false
            },
            // {
            //     exec: 'pg-to-https.js',
            //     silent: false
            // }
        ];

        if (cluster.isMaster) {
            settings.forEach(options => {
                cluster.setupMaster(options);
                cluster.fork();
            })

            cluster.on('exit', (worker, code, signal) => {
                const t = cluster.fork();
                console.log(`| ${dateFormat()} | Worker ${worker.process.pid} died (${signal||code}). restarting...`);
            });

        }
        cluster.on('listening', (worker, info) => {
            const address = info.address || "localhost";
            const port = info.port || 3000;
            console.log(`A worker is now connected to ${address}:${port}`);
        });

        cluster.on('message', (worker, msg, handle) => {
            console.log(msg);
        });
        console.log(`| ${dateFormat()} | Cluster server starting.`);
    }
)();