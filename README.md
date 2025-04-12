# sentry-collector

一个用于收集和处理Sentry错误的工具包，简化Sentry的集成和使用。基于 `@sentry/react` 构建，专为React应用设计。

## 特点

- ✅ 基于 @sentry/react，为React应用提供最佳支持
- ✅ 简化的API，使Sentry集成更加容易
- ✅ 自动捕获未处理的错误和Promise拒绝
- ✅ 支持手动上报错误和自定义消息
- ✅ 提供React错误边界组件

## 安装

```bash
npm install sentry-collector
# 或者
yarn add sentry-collector
```

## 使用方法

### 基本用法

```typescript
import { SentryCollector } from 'sentry-collector';

// 创建并初始化收集器
const collector = new SentryCollector({
  dsn: 'https://your-sentry-dsn@sentry.io/project-id',
  environment: 'production',
  release: '1.0.0'
}).init();

// 捕获一个错误
try {
  // 你的代码
  throw new Error('发生了一个错误');
} catch (error) {
  collector.captureError(error);
}
```

### 添加额外信息

```typescript
// 设置用户信息
collector.setUser({
  id: 'user-123',
  email: 'user@example.com',
  username: 'testuser',
  role: 'admin'
});

// 设置上下文
collector.setContext('page', {
  name: 'home',
  featureEnabled: true,
  lastAction: 'click-button'
});

// 设置标签
collector.setTag('version', '1.0.0');
// 或者一次设置多个标签
collector.setTag({
  component: 'header',
  module: 'auth',
  platform: 'web'
});
```

### 错误边界组件

```jsx
import React from 'react';
import { SentryCollector } from 'sentry-collector';

const collector = new SentryCollector({
  dsn: 'https://your-sentry-dsn@sentry.io/project-id',
}).init();

// 获取错误边界组件
const ErrorBoundary = collector.getErrorBoundary();

// 错误边界的使用
function App() {
  return (
    <ErrorBoundary fallback={<div>发生了错误</div>}>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

### 配置选项

```typescript
interface CollectorOptions {
  /** Sentry DSN地址 */
  dsn: string;
  
  /** 环境名称 */
  environment?: string;
  
  /** 是否在开发环境中也进行上报 */
  enableInDev?: boolean;
  
  /** 应用版本号 */
  release?: string;
  
  /** 是否自动收集未捕获的错误 */
  autoCapture?: boolean;
  
  /** 额外的标签信息 */
  tags?: Record<string, string>;
  
  /** 采样率，0-1之间的数值 */
  sampleRate?: number;
}
```

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 发布
npm publish
```

## 许可证

MIT




* 第一阶段：错误监控 + 基础环境信息
* 第二阶段：页面性能 + 网络请求
* 第三阶段：用户行为 + 高级指标
