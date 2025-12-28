const DEPLOY_PATH = process.env.DEPLOY_PATH || '/opt/sbook';
const PNPM_PATH = process.env.PNPM_PATH || '/home/sbook/.local/share/pnpm/pnpm';
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;

module.exports = {
  apps: [
    {
      name: 'sbook-frontend',
      script: PNPM_PATH,
      args: 'start',
      interpreter: 'none',
      cwd: `${DEPLOY_PATH}/frontend`,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: FRONTEND_PORT,
      },
      error_file: `${DEPLOY_PATH}/frontend/logs/error.log`,
      out_file: `${DEPLOY_PATH}/frontend/logs/access.log`,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true,
    },
  ],
};

