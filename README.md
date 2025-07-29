# HomepageSettings 项目

这是一个基于 [Homepage](https://gethomepage.dev/) 的个人主页配置项目，已按照官方文档最佳实践进行优化。

## 项目结构

### 核心配置文件
- `settings.yaml` - 主要设置（主题、语言、布局等）
- `bookmarks.yaml` - 书签配置（9个分类，422个链接）
- `services.yaml` - 服务配置（媒体影音、树莓社、AI服务）
- `widgets.yaml` - 小部件配置（系统资源、搜索、天气、时间等）

### 样式文件
- `custom.css` - 自定义样式（现代化主题、卡片效果）
- `custom.js` - 自定义脚本（交互效果、动画）

### 容器配置
- `docker.yaml` - Docker 配置模板
- `kubernetes.yaml` - Kubernetes 配置模板

## 主要特性

### 🎨 现代化设计
- 深色主题（slate 配色）
- 渐变背景图片
- 卡片模糊效果
- 响应式布局

### 📚 内容分类
1. **常用网站** - 开发工具和常用服务
2. **AI工具** - 各类AI助手和创作工具
3. **开发工具** - 编程开发相关工具
4. **云服务** - 云计算平台和服务
5. **在线学习** - 教程和学习资源
6. **设计资源** - 设计素材和工具
7. **娱乐休闲** - 视频音乐娱乐平台
8. **影视制作** - 视频制作和素材资源
9. **系统工具** - 系统管理和实用工具

### 🔧 小部件功能
- 系统资源监控
- 百度搜索集成
- 苏州天气显示
- 中文日期时间
- 欢迎问候语

## 配置说明

### 主题配置
```yaml
theme: dark
color: slate
background:
  image: https://images.unsplash.com/photo-1557683316-973673baf926
  blur: md
  saturate: 80
  brightness: 40
```

### 布局优化
- 采用行式布局（row style）
- 合理的列数分配（3-5列）
- Material Design 图标
- 统一的视觉风格

## 使用方法

1. 将配置文件复制到 Homepage 配置目录
2. 根据需要修改 `settings.yaml` 中的个人信息
3. 在 `bookmarks.yaml` 中添加或删除书签
4. 调整 `widgets.yaml` 中的小部件设置

## 更新日志

- ✅ 优化书签分类结构
- ✅ 添加详细描述信息
- ✅ 统一图标和样式
- ✅ 改进小部件配置
- ✅ 增强视觉效果
- ✅ 符合官方最佳实践

---

基于 [Homepage](https://gethomepage.dev/) 构建 | 遵循官方配置规范