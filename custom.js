// 沈孙丰个人主页 - 现代化交互增强脚本

(function() {
    'use strict';
    
    // 等待 DOM 加载完成
    document.addEventListener('DOMContentLoaded', function() {
        initializeEnhancements();
    });
    
    function initializeEnhancements() {
        addParallaxEffect();
        addSmoothScrolling();
        addCardInteractions();
        addSearchEnhancements();
        addKeyboardShortcuts();
        addPerformanceOptimizations();
        addAccessibilityFeatures();
        initMouseParticles();
        initCustomCursor();
        addLoadingAnimations();
        addThemeTransitions();
        addStatusIndicators();
        addTooltipSystem();
        addLazyLoading();
    }
    
    // 优化的视差滚动效果
    function addParallaxEffect() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.service-card, .bookmark-card');
            const windowHeight = window.innerHeight;
            
            parallaxElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrolled;
                const elementHeight = rect.height;
                
                // 只对可见元素应用视差效果
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const speed = 0.02 + (index % 3) * 0.01;
                    const yPos = (scrolled - elementTop) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
            
            // 背景视差效果
            const backgroundElements = document.querySelectorAll('.background-parallax');
            backgroundElements.forEach((element, index) => {
                const speed = 0.5;
                const yPos = scrolled * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // 使用 Intersection Observer 优化性能
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-viewport');
                } else {
                    entry.target.classList.remove('in-viewport');
                }
            });
        });
        
        document.querySelectorAll('.service-card, .bookmark-card').forEach(el => {
            observer.observe(el);
        });
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // 加载动画
    function addLoadingAnimations() {
        // 页面加载动画
        const cards = document.querySelectorAll('.service-card, .bookmark-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // 分组标题动画
        const groupTitles = document.querySelectorAll('.group-title');
        groupTitles.forEach((title, index) => {
            title.style.opacity = '0';
            title.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                title.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                title.style.opacity = '1';
                title.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    // 主题切换动画
    function addThemeTransitions() {
        const themeToggle = document.querySelector('[data-theme-toggle]');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 300);
            });
        }
    }
    
    // 状态指示器
    function addStatusIndicators() {
        const services = document.querySelectorAll('.service-card');
        services.forEach(service => {
            const indicator = document.createElement('div');
            indicator.className = 'status-indicator';
            service.appendChild(indicator);
            
            // 模拟状态检查
            setTimeout(() => {
                const isOnline = Math.random() > 0.1; // 90% 在线率
                if (!isOnline) {
                    indicator.classList.add('offline');
                }
            }, Math.random() * 2000);
        });
    }
    
    // 工具提示系统
    function addTooltipSystem() {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(tooltip);
        
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (target) {
                tooltip.textContent = target.dataset.tooltip;
                tooltip.style.opacity = '1';
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (target) {
                tooltip.style.opacity = '0';
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.clientX + 10 + 'px';
            tooltip.style.top = e.clientY - 30 + 'px';
        });
    }
    
    // 懒加载优化
    function addLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // 平滑滚动
    function addSmoothScrolling() {
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // 为锚点链接添加平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // 卡片交互增强
    function addCardInteractions() {
        const cards = document.querySelectorAll('.service-card, .bookmark-card');
        
        cards.forEach(card => {
            // 鼠标进入效果 - 优化动效规范
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.01)';
                this.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
                this.style.zIndex = '10';
                
                // 添加光晕效果
                const glow = document.createElement('div');
                glow.className = 'card-glow';
                glow.style.cssText = `
                    position: absolute;
                    top: -8px;
                    left: -8px;
                    right: -8px;
                    bottom: -8px;
                    background: linear-gradient(45deg, #667eea, #764ba2, #4facfe, #00f2fe);
                    border-radius: 20px;
                    opacity: 0.2;
                    filter: blur(15px);
                    z-index: -1;
                    animation: glow-pulse 3s ease-in-out infinite alternate;
                    transition: opacity 0.25s ease;
                `;
                this.appendChild(glow);
            });
            
            // 鼠标离开效果 - 优化过渡
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                this.style.zIndex = '';
                
                // 渐隐移除光晕效果
                const glow = this.querySelector('.card-glow');
                if (glow) {
                    glow.style.opacity = '0';
                    setTimeout(() => {
                        if (glow.parentNode) {
                            glow.remove();
                        }
                    }, 250);
                }
            });
            
            // 点击波纹效果
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 400);
            });
        });
    }
    
    // 搜索功能增强
    function addSearchEnhancements() {
        const searchInput = document.querySelector('.search-input, input[type="search"]');
        if (!searchInput) return;
        
        // 实时搜索
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
        
        // 搜索高亮
        function performSearch(query) {
            const cards = document.querySelectorAll('.service-card, .bookmark-card');
            const searchTerm = query.toLowerCase();
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                const isMatch = text.includes(searchTerm);
                
                card.style.opacity = isMatch || !searchTerm ? '1' : '0.4';
                card.style.transform = isMatch || !searchTerm ? '' : 'scale(0.98)';
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }
        
        // 搜索建议
        const suggestions = ['GitHub', 'ChatGPT', 'YouTube', 'Spotify', 'Netflix'];
        const suggestionContainer = document.createElement('div');
        suggestionContainer.className = 'search-suggestions';
        suggestionContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 0 0 20px 20px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(suggestionContainer);
    }
    
    // 键盘快捷键
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K 打开搜索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-input, input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // ESC 清除搜索
            if (e.key === 'Escape') {
                const searchInput = document.querySelector('.search-input, input[type="search"]');
                if (searchInput && searchInput === document.activeElement) {
                    searchInput.value = '';
                    searchInput.blur();
                    // 重置所有卡片显示
                    document.querySelectorAll('.service-card, .bookmark-card').forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = '';
                    });
                }
            }
        });
    }
    
    // 性能优化
    function addPerformanceOptimizations() {
        // 图片懒加载
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // 防抖滚动事件
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // 滚动结束后的操作
                document.body.classList.remove('scrolling');
            }, 150);
            
            document.body.classList.add('scrolling');
        }, { passive: true });
    }
    
    // 无障碍功能
    function addAccessibilityFeatures() {
        // 为卡片添加键盘导航
        const cards = document.querySelectorAll('.service-card, .bookmark-card');
        cards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `打开 ${card.textContent.trim()}`);
            
            // 键盘事件
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // 焦点指示器
        const style = document.createElement('style');
        style.textContent = `
            .service-card:focus,
            .bookmark-card:focus {
                outline: 3px solid #4facfe !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 添加 CSS 动画
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes glow-pulse {
            0% { opacity: 0.3; }
            100% { opacity: 0.6; }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .scrolling .service-card,
        .scrolling .bookmark-card {
            transition: transform 0.1s ease-out;
        }
        
        .search-suggestions::-webkit-scrollbar {
            width: 4px;
        }
        
        .search-suggestions::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
        }
    `;
    document.head.appendChild(animationStyles);
    
    // 主题切换动画
    function addThemeTransition() {
        const themeToggle = document.querySelector('.theme-toggle, [data-theme-toggle]');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 300);
            });
        }
    }
    
    // 优化的鼠标粒子效果
    function initMouseParticles() {
        // 检查设备性能和移动端
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowPerformance = navigator.hardwareConcurrency < 4;
        
        // 移动端或低性能设备禁用粒子效果
        if (isMobile || isLowPerformance) {
            console.log('粒子效果已禁用：移动端或低性能设备');
            return;
        }
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        
        // 设置画布样式
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            opacity: 0.6;
        `;
        
        document.body.appendChild(canvas);
        
        // 性能配置
        const config = {
            maxParticles: 25,
            particleSpeed: 1,
            particleLife: 60,
            createRate: 3,
            mouseMoveThrottle: 16 // 约60fps
        };
        
        // 调整画布大小（防抖）
        let resizeTimeout;
        function resizeCanvas() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const dpr = window.devicePixelRatio || 1;
                const rect = canvas.getBoundingClientRect();
                
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                
                ctx.scale(dpr, dpr);
                canvas.style.width = rect.width + 'px';
                canvas.style.height = rect.height + 'px';
            }, 100);
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });
        
        // 粒子池优化
        const particles = [];
        const particlePool = [];
        
        // 鼠标位置和状态
        let mouse = { x: 0, y: 0, isMoving: false };
        let lastMouseTime = 0;
        
        // 优化的粒子类
        class Particle {
            constructor() {
                this.reset(0, 0);
            }
            
            reset(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * config.particleSpeed;
                this.vy = (Math.random() - 0.5) * config.particleSpeed;
                this.life = config.particleLife;
                this.maxLife = config.particleLife;
                this.size = Math.random() * 2 + 1;
                this.hue = Math.random() * 60 + 200;
                this.active = true;
            }
            
            update() {
                if (!this.active) return;
                
                this.x += this.vx;
                this.y += this.vy;
                this.life--;
                this.vx *= 0.98;
                this.vy *= 0.98;
                
                if (this.life <= 0) {
                    this.active = false;
                }
            }
            
            draw() {
                if (!this.active) return;
                
                const alpha = this.life / this.maxLife;
                const size = this.size * alpha;
                
                ctx.globalAlpha = alpha * 0.8;
                ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // 获取粒子（对象池）
        function getParticle(x, y) {
            let particle = particlePool.pop();
            if (!particle) {
                particle = new Particle();
            }
            particle.reset(x, y);
            return particle;
        }
        
        // 回收粒子
        function recycleParticle(particle) {
            particle.active = false;
            particlePool.push(particle);
        }
        
        // 创建粒子（限制频率）
        let createCounter = 0;
        function createParticles(x, y) {
            if (particles.length >= config.maxParticles) return;
            
            createCounter++;
            if (createCounter % config.createRate === 0) {
                particles.push(getParticle(x, y));
            }
        }
        
        // 优化的动画循环
        let animationId;
        let lastFrameTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;
        
        function animate(currentTime) {
            if (currentTime - lastFrameTime < frameInterval) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            
            lastFrameTime = currentTime;
            
            // 清除画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 批量更新和绘制粒子
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                particle.update();
                
                if (particle.active) {
                    particle.draw();
                } else {
                    // 回收死亡粒子
                    recycleParticle(particle);
                    particles.splice(i, 1);
                }
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        // 节流的鼠标移动事件
        let mouseMoveTimeout;
        function handleMouseMove(e) {
            const now = Date.now();
            if (now - lastMouseTime < config.mouseMoveThrottle) return;
            
            lastMouseTime = now;
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.isMoving = true;
            
            createParticles(mouse.x, mouse.y);
            
            // 重置移动状态
            clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(() => {
                mouse.isMoving = false;
            }, 100);
        }
        // 绑定优化的鼠标事件
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        
        // 页面可见性 API 优化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            } else {
                animate(performance.now());
            }
        });
        
        // 启动动画
        animate(performance.now());
        
        // 清理函数
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            document.removeEventListener('mousemove', handleMouseMove);
            if (canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        };
    }
    
    // 优化的自定义光标
    function initCustomCursor() {
        // 移动端禁用自定义光标
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            return;
        }
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.3) 70%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        
        document.body.appendChild(cursor);
        
        // 节流的光标移动
        let cursorMoveTimeout;
        function updateCursor(e) {
            cursor.style.left = (e.clientX - 10) + 'px';
            cursor.style.top = (e.clientY - 10) + 'px';
            cursor.style.opacity = '1';
        }
        
        document.addEventListener('mousemove', updateCursor, { passive: true });
        
        // 悬停效果优化
        const interactiveElements = '.service-card, .bookmark-card, button, a, [role="button"]';
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, rgba(79, 172, 254, 0.8) 0%, rgba(0, 242, 254, 0.4) 70%, transparent 100%)';
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.3) 70%, transparent 100%)';
            }
        }, true);
        
        // 鼠标离开页面时隐藏光标
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    }
     
     // 初始化主题切换
    addThemeTransition();
    
    // 控制台欢迎信息
    console.log('%c沈孙丰个人主页已加载完成', 'color: #667eea; font-size: 16px; font-weight: bold;');
     console.log('%c现代化美化效果已启用', 'color: #4facfe; font-size: 14px;');
     console.log('%c鼠标粒子效果已激活', 'color: #f093fb; font-size: 14px;');
     console.log('%c自定义光标效果已启用', 'color: #764ba2; font-size: 14px;');
    
})();