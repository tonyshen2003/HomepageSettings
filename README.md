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
    }
    
    // 视差滚动效果
    function addParallaxEffect() {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.service-card, .bookmark-card');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index % 3) * 0.1;
                const yPos = -(scrolled * speed);
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
        
        window.addEventListener('scroll', requestTick, { passive: true });
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
            // 鼠标进入效果
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.zIndex = '10';
                
                // 添加光晕效果
                const glow = document.createElement('div');
                glow.className = 'card-glow';
                glow.style.cssText = `
                    position: absolute;
                    top: -10px;
                    left: -10px;
                    right: -10px;
                    bottom: -10px;
                    background: linear-gradient(45deg, #667eea, #764ba2, #4facfe, #00f2fe);
                    border-radius: 25px;
                    opacity: 0.3;
                    filter: blur(20px);
                    z-index: -1;
                    animation: glow-pulse 2s ease-in-out infinite alternate;
                `;
                this.appendChild(glow);
            });
            
            // 鼠标离开效果
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.zIndex = '';
                
                // 移除光晕效果
                const glow = this.querySelector('.card-glow');
                if (glow) {
                    glow.remove();
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
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
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
                
                card.style.opacity = isMatch || !searchTerm ? '1' : '0.3';
                card.style.transform = isMatch || !searchTerm ? '' : 'scale(0.95)';
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
    
    // 鼠标粒子效果
    function initMouseParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 设置画布样式
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        canvas.style.mixBlendMode = 'screen';
        canvas.style.opacity = '0.8';
        
        // 调试信息
        console.log('粒子 canvas 已创建，z-index:', canvas.style.zIndex);
        
        document.body.appendChild(canvas);
        
        // 调整画布大小
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // 粒子数组
        const particles = [];
        const maxParticles = 50;
        
        // 鼠标位置
        let mouse = { x: 0, y: 0 };
        
        // 粒子类
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.01;
                this.size = Math.random() * 3 + 1;
                this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                this.vx *= 0.99;
                this.vy *= 0.99;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
        
        // 创建粒子
        function createParticle(x, y) {
            if (particles.length < maxParticles) {
                particles.push(new Particle(x, y));
            }
        }
        
        // 动画循环
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 更新和绘制粒子
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                particle.update();
                particle.draw();
                
                // 移除死亡的粒子
                if (particle.life <= 0) {
                    particles.splice(i, 1);
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // 鼠标移动事件
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            
            // 创建粒子（降低频率以提高性能）
            if (Math.random() < 0.3) {
                createParticle(mouse.x, mouse.y);
            }
        });
        
        // 开始动画
         animate();
     }
     
     // 自定义光标效果
     function initCustomCursor() {
         // 检查是否为移动设备
         if (window.innerWidth <= 768) {
             return;
         }
         
         const cursor = document.createElement('div');
         cursor.className = 'custom-cursor';
         document.body.appendChild(cursor);
         
         let mouseX = 0;
         let mouseY = 0;
         let cursorX = 0;
         let cursorY = 0;
         
         // 鼠标移动事件
         document.addEventListener('mousemove', (e) => {
             mouseX = e.clientX;
             mouseY = e.clientY;
         });
         
         // 平滑跟随动画
         function animateCursor() {
             const dx = mouseX - cursorX;
             const dy = mouseY - cursorY;
             
             cursorX += dx * 0.1;
             cursorY += dy * 0.1;
             
             cursor.style.left = cursorX - 10 + 'px';
             cursor.style.top = cursorY - 10 + 'px';
             
             requestAnimationFrame(animateCursor);
         }
         
         animateCursor();
         
         // 悬停效果
         const interactiveElements = document.querySelectorAll('a, button, .service-card, .bookmark-card, [role="button"]');
         
         interactiveElements.forEach(element => {
             element.addEventListener('mouseenter', () => {
                 cursor.style.transform = 'scale(1.5)';
                 cursor.style.background = 'radial-gradient(circle, rgba(240, 147, 251, 0.8) 0%, rgba(245, 87, 108, 0.4) 70%, transparent 100%)';
             });
             
             element.addEventListener('mouseleave', () => {
                 cursor.style.transform = 'scale(1)';
                 cursor.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.4) 70%, transparent 100%)';
             });
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