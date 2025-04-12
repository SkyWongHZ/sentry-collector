// 导入 sentry-collector
// 注意：这里假设包已经发布，实际开发中可能需要使用相对路径导入
const { SentryCollector } = require('sentry-collector');

// 初始化 SentryCollector
const collector = new SentryCollector({
  dsn: 'https://your-sentry-dsn@sentry.io/project-id', // 替换为你的 Sentry DSN
  environment: 'development',
  enableInDev: true,
  release: '1.0.0',
  tags: {
    appType: 'example'
  }
}).init();

// 设置用户信息
collector.setUser({
  id: 'user-123',
  username: 'testuser'
});

// 设置上下文
collector.setContext({
  component: 'example'
});

// 手动捕获一个错误
function triggerError() {
  try {
    // 故意抛出一个错误
    throw new Error('这是一个测试错误');
  } catch (error) {
    // 捕获并上报到 Sentry
    collector.captureError(error, {
      context: {
        function: 'triggerError',
        timestamp: new Date().toISOString()
      }
    });
  }
}

// 直接上报一个消息
function reportMessage() {
  collector.captureError('这是一个直接上报的消息', {
    name: 'MessageReport',
    tags: {
      type: 'info',
      source: 'example'
    }
  });
}

// 测试函数
function runExample() {
  console.log('运行 Sentry Collector 示例...');
  
  // 触发错误
  triggerError();
  
  // 上报消息
  reportMessage();
  
  console.log('示例完成，请检查 Sentry 控制台查看上报的事件');
}

// 运行示例
runExample(); 