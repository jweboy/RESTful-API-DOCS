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
        PORT: 4000,
        NODE_ENV: 'development',
        HOST: '127.0.0.1',
        COMMON_VARIABLE: true
      },
      env_production: {
        PORT: 4001, // 线上这个端口有问题，暂时部署development
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
      repo: 'git@github.com:jweboy/resful-api-docs-swagger.git',
      path: '/home/www/project/resful-api-docs-swagger',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-deploy': 'git fetch && git pull origin master',
      'post-deploy': 'yarn && yarn pm2:dev',
      'env': {
        'NODE_ENV': 'production'
      }
    }
  }
}
