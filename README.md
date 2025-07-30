# Homepage Dashboard 优化配置

这是一个经过全面优化的 Homepage Dashboard 配置，基于官方文档和社区最佳实践进行了性能和用户体验的优化。

## 📁 配置文件结构

```
HomepageSettings/
├── settings.yaml      # 主要设置配置
├── services.yaml      # 服务配置
├── bookmarks.yaml     # 书签配置
├── widgets.yaml       # 小部件配置
├── kubernetes.yaml    # Kubernetes 集群配置
├── docker.yaml        # Docker 容器配置
├── custom.css         # 自定义样式
├── custom.js          # 自定义 JavaScript
└── README.md          # 说明文档
```

## 🚀 主要优化特性

### 1. 性能优化
- **响应式设计**: 支持多设备适配
- **懒加载**: 图片和内容按需加载
- **缓存优化**: 30 秒刷新间隔，减少服务器负载
- **压缩资源**: 启用 CSS/JS 压缩
- **CDN 支持**: 优化资源加载速度

### 2. 视觉体验
- **现代化 UI**: 玻璃拟态设计风格
- **流畅动画**: 页面加载和交互动画
- **主题适配**: 支持明暗主题切换
- **自定义字体**: 优化中文显示效果
- **状态指示器**: 实时服务状态显示

### 3. 交互增强
- **视差滚动**: 优化的滚动体验
- **工具提示**: 悬停显示详细信息
- **键盘快捷键**: 提高操作效率
- **搜索增强**: 多搜索引擎支持
- **鼠标特效**: 粒子效果和自定义光标

## ⚙️ 配置说明

### settings.yaml 主要配置
- **favicon**: 使用现代化图标
- **statusStyle**: 点状状态指示器
- **quicklaunch**: 快速启动功能
- **background**: 优化的背景模糊和透明度
- **cardBlur**: 增强的卡片模糊效果
- **layout**: 彩色图标和清晰的分组

### widgets.yaml 小部件
- **系统资源监控**: 3 秒刷新，公制单位
- **搜索功能**: 支持百度、Google、Bing
- **天气预报**: 苏州地区天气信息
- **网络状态**: Unifi 网络监控
- **系统详细监控**: Glances 系统信息
- **快速访问**: 书签快速访问

### services.yaml 服务配置
- **图标优化**: 使用 Simple Icons 和品牌色彩
- **API 集成**: 自定义 API 监控服务状态
- **分类清晰**: 常用服务、社交媒体、AI 服务等
- **状态监控**: 实时服务可用性检查

### bookmarks.yaml 书签管理
- **分类完整**: 涵盖开发、设计、娱乐、工具等
- **图标统一**: 使用一致的图标风格
- **链接优化**: 确保所有链接可访问

## 🔧 部署说明

### Docker 部署
```bash
docker run -d \
  --name homepage \
  -p 3000:3000 \
  -v /path/to/config:/app/config \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  ghcr.io/gethomepage/homepage:latest
```

### Kubernetes 部署
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: homepage
spec:
  replicas: 1
  selector:
    matchLabels:
      app: homepage
  template:
    metadata:
      labels:
        app: homepage
    spec:
      containers:
      - name: homepage
        image: ghcr.io/gethomepage/homepage:latest
        ports:
        - containerPort: 3000
        volumeMounts:
        - name: config
          mountPath: /app/config
      volumes:
      - name: config
        configMap:
          name: homepage-config
```

## 📊 性能监控

### 关键指标
- **加载时间**: < 2 秒
- **首次内容绘制 (FCP)**: < 1.5 秒
- **最大内容绘制 (LCP)**: < 2.5 秒
- **累积布局偏移 (CLS)**: < 0.1
- **交互到下次绘制 (INP)**: < 200ms

### 监控工具
- Google PageSpeed Insights
- Chrome Lighthouse
- WebPageTest
- 内置性能监控

## 🛠️ 自定义配置

### 修改主题
在 `custom.css` 中调整 CSS 变量：
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --border-radius: 12px;
}
```

### 添加新服务
在 `services.yaml` 中添加：
```yaml
- 服务名称:
    icon: si-servicename-#color
    href: https://example.com
    description: 服务描述
    siteMonitor: https://example.com
```

### 自定义小部件
在 `widgets.yaml` 中配置：
```yaml
- customapi:
    url: https://api.example.com/status
    refreshInterval: 30000
    method: GET
```

## 🔒 安全配置

- 使用 HTTPS 连接
- 定期更新 Docker 镜像
- 限制网络访问权限
- 启用访问日志记录
- 配置防火墙规则

## 📱 移动端优化

- 响应式布局设计
- 触摸友好的交互元素
- 优化的字体大小
- 快速加载优化
- 离线缓存支持

## 🌐 多语言支持

当前配置支持中文界面，可在 `settings.yaml` 中修改：
```yaml
language: zh-CN  # 或 en, fr, de 等
```

## 📈 性能优化建议

1. **定期清理**: 删除不使用的服务和书签
2. **图片优化**: 使用 WebP 格式和适当尺寸
3. **缓存策略**: 合理设置刷新间隔
4. **网络优化**: 使用 CDN 加速资源加载
5. **监控告警**: 设置性能阈值告警

## 🆘 故障排除

### 常见问题
1. **服务无法访问**: 检查网络连接和防火墙设置
2. **图标不显示**: 确认图标名称和网络连接
3. **样式异常**: 检查 CSS 文件语法
4. **API 超时**: 调整超时设置和重试机制

### 日志查看
```bash
docker logs homepage
```

## 📚 参考资源

- [Homepage 官方文档](https://gethomepage.dev/)
- [配置示例](https://gethomepage.dev/configs/)
- [API 集成指南](https://gethomepage.dev/widgets/)
- [社区讨论](https://github.com/gethomepage/homepage/discussions)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个配置！

---

**最后更新**: 2024 年 7 月
**版本**: v2.0
**维护者**: 沈孙丰