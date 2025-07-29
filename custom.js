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
    
    // 初始化主题切换
    addThemeTransition();
    
    // 控制台欢迎信息
    console.log('%c🎉 沈孙丰个人主页已加载完成！', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%c✨ 现代化美化效果已启用', 'color: #4facfe; font-size: 14px;');
    
})();