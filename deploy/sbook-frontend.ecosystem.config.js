module.exports = {
  apps: [
    {
      name: 'sbook-frontend',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/opt/sbook/frontend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.FRONTEND_PORT || 3000,
      },
      error_file: '/opt/sbook/frontend/logs/error.log',
      out_file: '/opt/sbook/frontend/logs/access.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true,
    },
  ],
};

