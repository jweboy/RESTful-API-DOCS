module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'api-docs',
      script: 'app.js',
      watch: true,
      ignore_watch: [
        'node_modules'
      ],
      env: {
        PORT: 3002,
        NODE_ENV: 'development',
        HOST: '127.0.0.1',
        COMMON_VARIABLE: true
      },
      env_production: {
        PORT: 3003,
        NODE_ENV: 'production',
        HOST: '118.24.155.105'
      }
    }
  ],
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: '118.24.155.105',
      ref: 'origin/master',
      repo: 'git@github.com:jweboy/node-resful-server.git',
      path: '/home/www/service/node-resful-server',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-deploy-local': "echo 'pm2部署测试'",
      'pre-deploy': 'git fetch',
      'post-deploy': 'git pull origin master && yarn && yarn run pm2:pro',
      'env': {
        'NODE_ENV': 'production'
      }
    }
  }
}