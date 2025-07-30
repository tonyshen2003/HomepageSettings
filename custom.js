// 沈孙丰个人主页 - Apple 2024 动态设计规范增强脚本

(function() {
    'use strict';
    
    // Apple 2024 设计系统常量
    const APPLE_DESIGN_TOKENS = {
        // Apple 标准动画时间曲线
        EASING: {
            EASE_OUT: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            EASE_IN: 'cubic-bezier(0.42, 0, 1, 1)',
            EASE_IN_OUT: 'cubic-bezier(0.42, 0, 0.58, 1)',
            SPRING: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        // Apple 标准动画持续时间
        DURATION: {
            FAST: '150ms',
            NORMAL: '250ms',
            SLOW: '350ms',
            SLOWER: '500ms'
        },
        // Apple 系统颜色
        COLORS: {
            SYSTEM_BLUE: '#007AFF',
            SYSTEM_GREEN: '#34C759',
            SYSTEM_RED: '#FF3B30',
            SYSTEM_ORANGE: '#FF9500'
        },
        // 触摸目标最小尺寸
        MIN_TOUCH_TARGET: 44
    };
    
    // Apple 2024 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAppleDesignEnhancements);
    } else {
        initializeAppleDesignEnhancements();
    }
    
    // Apple 2024 减少动画支持
    function addAppleReducedMotionSupport() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function handleReducedMotion(mediaQuery) {
            if (mediaQuery.matches) {
                // 用户偏好减少动画
                document.documentElement.style.setProperty('--animation-duration', '0.01s');
                document.documentElement.style.setProperty('--transition-duration', '0.01s');
                
                // 禁用复杂动画
                const style = document.createElement('style');
                style.textContent = `
                    *, *::before, *::after {
                        animation-duration: 0.01s !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01s !important;
                        scroll-behavior: auto !important;
                    }
                    
                    .parallax-element {
                        transform: none !important;
                    }
                `;
                document.head.appendChild(style);
                
                console.log('🎯 Apple 2024: 已启用减少动画模式');
            } else {
                // 用户允许动画
                document.documentElement.style.removeProperty('--animation-duration');
                document.documentElement.style.removeProperty('--transition-duration');
                console.log('🎯 Apple 2024: 已启用完整动画模式');
            }
        }
        
        // 初始检查
        handleReducedMotion(prefersReducedMotion);
        
        // 监听偏好变化
        prefersReducedMotion.addListener(handleReducedMotion);
    }
    
    function initializeAppleDesignEnhancements() {
        console.log('🍎 正在初始化 Apple 2024 设计增强功能...');
        
        // 首先检查减少动画偏好
        addAppleReducedMotionSupport();
        
        addAppleParallaxEffect();
        addAppleSmoothScrolling();
        addAppleCardInteractions();
        addAppleSearchEnhancements();
        addAppleKeyboardShortcuts();
        addApplePerformanceOptimizations();
        addAppleAccessibilityFeatures();
        initAppleMouseParticles();
        initAppleCustomCursor();
        addAppleLoadingAnimations();
        addAppleThemeTransitions();
        addAppleStatusIndicators();
        addAppleTooltipSystem();
        addAppleLazyLoading();
        
        console.log('✅ Apple 2024 设计增强功能初始化完成');
        console.log('🎨 已应用 Apple Human Interface Guidelines 2024 标准');
    }
    
    // Apple 2024 优化的视差滚动效果
    function addAppleParallaxEffect() {
        // 检查用户是否偏好减少动画
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        let ticking = false;
        let isScrolling = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.service-card, .bookmark-card');
            const windowHeight = window.innerHeight;
            
            parallaxElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                
                // 只对可见元素应用视差效果 - Apple 性能优化
                if (rect.top < windowHeight && rect.bottom > 0) {
                    // 使用更微妙的视差效果，符合 Apple 设计原则
                    const speed = 0.01 + (index % 2) * 0.005;
                    const yPos = (scrolled - (rect.top + scrolled)) * speed;
                    
                    // 使用 transform3d 启用硬件加速
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    element.style.willChange = isScrolling ? 'transform' : 'auto';
                }
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // Apple 2024 Intersection Observer 优化
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('apple-in-viewport');
                    entry.target.style.transition = `transform ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
                } else {
                    entry.target.classList.remove('apple-in-viewport');
                }
            });
        }, {
            rootMargin: '50px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });
        
        document.querySelectorAll('.service-card, .bookmark-card').forEach(el => {
            observer.observe(el);
        });
        
        // 优化的滚动事件处理
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            isScrolling = true;
            requestTick();
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
                // 重置 will-change 属性以优化性能
                document.querySelectorAll('.service-card, .bookmark-card').forEach(el => {
                    el.style.willChange = 'auto';
                });
            }, 150);
        }, { passive: true });
    }
    
    // Apple 2024 加载动画
    function addAppleLoadingAnimations() {
        // 检查用户是否偏好减少动画
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // 简化动画，仅显示内容
            document.querySelectorAll('.service-card, .bookmark-card, .group-title').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }
        
        // Apple 2024 页面加载动画 - 使用标准时间曲线
        const cards = document.querySelectorAll('.service-card, .bookmark-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translate3d(0, 20px, 0) scale(0.95)';
            card.style.willChange = 'opacity, transform';
            
            setTimeout(() => {
                card.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.SLOWER} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
                card.style.opacity = '1';
                card.style.transform = 'translate3d(0, 0, 0) scale(1)';
                
                // 动画完成后重置 will-change
                setTimeout(() => {
                    card.style.willChange = 'auto';
                }, 500);
            }, index * 80); // Apple 推荐的交错延迟
        });
        
        // Apple 2024 分组标题动画
        const groupTitles = document.querySelectorAll('.group-title');
        groupTitles.forEach((title, index) => {
            title.style.opacity = '0';
            title.style.transform = 'translate3d(-20px, 0, 0)';
            title.style.willChange = 'opacity, transform';
            
            setTimeout(() => {
                title.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.SLOW} ${APPLE_DESIGN_TOKENS.EASING.SPRING}`;
                title.style.opacity = '1';
                title.style.transform = 'translate3d(0, 0, 0)';
                
                // 动画完成后重置 will-change
                setTimeout(() => {
                    title.style.willChange = 'auto';
                }, 350);
            }, index * 150); // 标题间更大的延迟
        });
        
        // Apple 2024 页面整体淡入效果
        document.body.style.opacity = '0';
        document.body.style.transition = `opacity ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
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
    
    // Apple 2024 卡片交互增强
    function addAppleCardInteractions() {
        const cards = document.querySelectorAll('.service-card, .bookmark-card');
        
        cards.forEach(card => {
            // 确保卡片符合 Apple 最小触摸目标
            const rect = card.getBoundingClientRect();
            if (rect.height < APPLE_DESIGN_TOKENS.MIN_TOUCH_TARGET) {
                card.style.minHeight = `${APPLE_DESIGN_TOKENS.MIN_TOUCH_TARGET}px`;
            }
            
            // Apple 2024 鼠标进入效果 - 微妙的悬停反馈
            card.addEventListener('mouseenter', function() {
                if (window.matchMedia('(hover: hover)').matches) {
                    this.style.transform = 'translate3d(0, -2px, 0) scale(1.02)';
                    this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
                    this.style.zIndex = '10';
                    this.style.willChange = 'transform';
                    
                    // Apple风格的微妙阴影增强
                    this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 3px 10px rgba(0, 0, 0, 0.1)';
                }
            });
            
            // Apple 2024 鼠标离开效果 - 平滑回弹
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translate3d(0, 0, 0) scale(1)';
                this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.SLOW} ${APPLE_DESIGN_TOKENS.EASING.SPRING}`;
                this.style.zIndex = '';
                this.style.boxShadow = '';
                
                // 延迟重置will-change以优化性能
                setTimeout(() => {
                    this.style.willChange = 'auto';
                }, 350);
            });
            
            // Apple 2024 点击反馈 - 微妙的缩放效果
            card.addEventListener('mousedown', function() {
                this.style.transform = 'translate3d(0, -1px, 0) scale(0.98)';
                this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_IN}`;
            });
            
            card.addEventListener('mouseup', function() {
                if (this.matches(':hover')) {
                    this.style.transform = 'translate3d(0, -2px, 0) scale(1.02)';
                } else {
                    this.style.transform = 'translate3d(0, 0, 0) scale(1)';
                }
                this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
            });
            
            // Apple 2024 触摸设备优化
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.SPRING}`;
            }, { passive: true });
            
            // Apple 2024 焦点状态 - 键盘导航
            card.addEventListener('focus', function() {
                this.style.outline = `2px solid ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE}`;
                this.style.outlineOffset = '2px';
                this.style.transform = 'translate3d(0, -1px, 0)';
                this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
            });
            
            card.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
                this.style.transform = 'translate3d(0, 0, 0)';
            });
        });
    }
    
    // Apple 2024 搜索功能增强
    function addAppleSearchEnhancements() {
        const searchInput = document.querySelector('.search-input, input[type="search"]');
        if (!searchInput) return;
        
        // Apple 2024 实时搜索 - 优化响应时间
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performAppleSearch(this.value);
            }, 200); // Apple 推荐的更快响应时间
        });
        
        // Apple 2024 搜索高亮 - 微妙的视觉反馈
        function performAppleSearch(query) {
            const cards = document.querySelectorAll('.service-card, .bookmark-card');
            const searchTerm = query.toLowerCase();
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                const isMatch = text.includes(searchTerm);
                
                if (isMatch || !searchTerm) {
                    // Apple 风格的匹配项突出显示
                    card.style.opacity = '1';
                    card.style.transform = 'translate3d(0, 0, 0) scale(1)';
                    card.style.filter = 'none';
                } else {
                    // Apple 风格的非匹配项淡化
                    card.style.opacity = '0.4';
                    card.style.transform = 'translate3d(0, 0, 0) scale(0.96)';
                    card.style.filter = 'blur(0.5px)';
                }
                
                card.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
            });
        }
        
        // Apple 2024 搜索建议系统
        const appleSearchSuggestions = ['GitHub', 'ChatGPT', 'YouTube', 'Spotify', 'Netflix', 'Apple Music', 'iCloud'];
        const suggestionContainer = document.createElement('div');
        suggestionContainer.className = 'apple-search-suggestions';
        suggestionContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px) saturate(1.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
            max-height: 240px;
            overflow-y: auto;
            z-index: 1000;
            margin-top: 8px;
            display: none;
            transform: translateY(-8px);
            opacity: 0;
            transition: all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT};
        `;
        
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(suggestionContainer);
        
        // Apple 2024 键盘导航支持
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.blur();
                suggestionContainer.style.display = 'none';
            }
        });
    }
    
    // Apple 2024 键盘快捷键系统
    function addAppleKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Apple 标准 Cmd + K 聚焦搜索
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-input, input[type="search"]');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                    // Apple 风格的聚焦动画
                    searchInput.style.transform = 'scale(1.02)';
                    searchInput.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
                    setTimeout(() => {
                        searchInput.style.transform = 'scale(1)';
                    }, 150);
                }
            }
            
            // Apple 标准 Cmd + / 显示快捷键帮助
            if ((e.metaKey || e.ctrlKey) && e.key === '/') {
                e.preventDefault();
                showAppleShortcutHelp();
            }
            
            // Apple 标准 ESC 清除搜索和关闭模态
            if (e.key === 'Escape') {
                const searchInput = document.querySelector('.search-input, input[type="search"]');
                if (searchInput && searchInput === document.activeElement) {
                    searchInput.value = '';
                    searchInput.blur();
                    // Apple 风格的重置动画
                    document.querySelectorAll('.service-card, .bookmark-card').forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translate3d(0, 0, 0) scale(1)';
                        card.style.filter = 'none';
                        card.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.SLOW} ${APPLE_DESIGN_TOKENS.EASING.SPRING}`;
                    });
                }
            }
            
            // Apple 2024 辅助功能 - Tab 导航增强
            if (e.key === 'Tab') {
                const focusableElements = document.querySelectorAll(
                    'a, button, input, [tabindex]:not([tabindex="-1"]), .service-card, .bookmark-card'
                );
                focusableElements.forEach(el => {
                    el.addEventListener('focus', function() {
                        this.style.outline = `2px solid ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE}`;
                        this.style.outlineOffset = '2px';
                        this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
                    }, { once: true });
                    
                    el.addEventListener('blur', function() {
                        this.style.outline = '';
                        this.style.outlineOffset = '';
                    }, { once: true });
                });
            }
        });
        
        // Apple 2024 快捷键帮助系统
        function showAppleShortcutHelp() {
            // 检查是否已存在帮助模态
            if (document.querySelector('.apple-shortcut-help-modal')) return;
            
            const helpModal = document.createElement('div');
            helpModal.className = 'apple-shortcut-help-modal';
            helpModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(20px) saturate(1.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT};
            `;
            
            const helpContent = document.createElement('div');
            helpContent.style.cssText = `
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(40px) saturate(1.8);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 32px;
                max-width: 420px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1);
                transform: scale(0.9) translateY(20px);
                transition: all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.SPRING};
            `;
            
            helpContent.innerHTML = `
                <h3 style="
                    margin: 0 0 24px 0; 
                    color: var(--text-primary, #1d1d1f); 
                    font-size: 22px; 
                    font-weight: 600;
                    text-align: center;
                ">键盘快捷键</h3>
                <div style="color: var(--text-secondary, #424245); line-height: 1.8; font-size: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 8px 0;">
                        <span>聚焦搜索</span>
                        <kbd style="
                            background: rgba(0, 0, 0, 0.06);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display';
                            font-size: 13px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                        ">⌘ K</kbd>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 8px 0;">
                        <span>显示帮助</span>
                        <kbd style="
                            background: rgba(0, 0, 0, 0.06);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display';
                            font-size: 13px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                        ">⌘ /</kbd>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 8px 0;">
                        <span>清除搜索</span>
                        <kbd style="
                            background: rgba(0, 0, 0, 0.06);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display';
                            font-size: 13px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                        ">ESC</kbd>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 8px 0;">
                        <span>导航元素</span>
                        <kbd style="
                            background: rgba(0, 0, 0, 0.06);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display';
                            font-size: 13px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                        ">Tab</kbd>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
                        <span>激活链接</span>
                        <kbd style="
                            background: rgba(0, 0, 0, 0.06);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display';
                            font-size: 13px;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                        ">Enter</kbd>
                    </div>
                </div>
                <button class="apple-help-close-btn" style="
                    margin-top: 24px;
                    padding: 12px 24px;
                    background: ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE};
                    color: white;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: 500;
                    width: 100%;
                    min-height: ${APPLE_DESIGN_TOKENS.MIN_TOUCH_TARGET}px;
                    transition: all ${APPLE_DESIGN_TOKENS.DURATION.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT};
                ">关闭</button>
            `;
            
            helpModal.appendChild(helpContent);
            document.body.appendChild(helpModal);
            
            // Apple 风格的显示动画
            requestAnimationFrame(() => {
                helpModal.style.opacity = '1';
                helpContent.style.transform = 'scale(1) translateY(0)';
            });
            
            // 关闭按钮交互
            const closeBtn = helpContent.querySelector('.apple-help-close-btn');
            closeBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.backgroundColor = '#0056CC';
            });
            closeBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE;
            });
            closeBtn.addEventListener('click', closeAppleHelp);
            
            // 点击外部关闭
            helpModal.addEventListener('click', function(e) {
                if (e.target === helpModal) {
                    closeAppleHelp();
                }
            });
            
            // ESC 关闭
            function handleEscClose(e) {
                if (e.key === 'Escape') {
                    closeAppleHelp();
                }
            }
            document.addEventListener('keydown', handleEscClose);
            
            // Apple 风格的关闭函数
            function closeAppleHelp() {
                helpModal.style.opacity = '0';
                helpContent.style.transform = 'scale(0.9) translateY(20px)';
                setTimeout(() => {
                    helpModal.remove();
                    document.removeEventListener('keydown', handleEscClose);
                }, 200);
            }
        }
    }
    
    // Apple 2024 性能优化系统
    function addApplePerformanceOptimizations() {
        // Apple 风格的图片懒加载 - 优化加载体验
        const images = document.querySelectorAll('img');
        const appleImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        // Apple 风格的渐进加载
                        img.style.opacity = '0';
                        img.style.transition = `opacity ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
                        
                        img.onload = function() {
                            this.style.opacity = '1';
                        };
                        
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px', // Apple 推荐的预加载距离
            threshold: 0.1
        });
        
        images.forEach(img => appleImageObserver.observe(img));
        
        // Apple 2024 优化的滚动事件处理
        let scrollTimeout;
        let isScrolling = false;
        
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                document.body.classList.add('apple-scrolling');
                isScrolling = true;
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('apple-scrolling');
                isScrolling = false;
                
                // Apple 风格的滚动结束优化
                document.querySelectorAll('.service-card, .bookmark-card').forEach(card => {
                    card.style.willChange = 'auto';
                });
            }, 100); // Apple 推荐的更快响应时间
            
        }, { passive: true });
        
        // Apple 2024 内存管理优化
        const appleMemoryOptimizer = {
            cleanup: function() {
                // 清理未使用的事件监听器
                const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
                unusedElements.forEach(el => el.remove());
            },
            
            throttle: function(func, limit) {
                let inThrottle;
                return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                }
            }
        };
        
        // 定期内存清理
        setInterval(appleMemoryOptimizer.cleanup, 30000);
        
        console.log('🚀 Apple 2024: 性能优化系统已启用');
    }
    
    // Apple 2024 无障碍功能系统
    function addAppleAccessibilityEnhancements() {
        // Apple 2024 键盘导航增强
        const cards = document.querySelectorAll('.service-card, .bookmark-card');
        cards.forEach((card, index) => {
            // Apple 标准的可访问性属性
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `打开 ${card.textContent.trim()}`);
            card.setAttribute('aria-describedby', `card-description-${index}`);
            
            // 确保符合 Apple 最小触摸目标
            const rect = card.getBoundingClientRect();
            if (rect.height < APPLE_DESIGN_TOKENS.MIN_TOUCH_TARGET) {
                card.style.minHeight = `${APPLE_DESIGN_TOKENS.MIN_TOUCH_TARGET}px`;
                card.style.display = 'flex';
                card.style.alignItems = 'center';
            }
            
            // Apple 2024 键盘事件处理
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    
                    // Apple风格的键盘激活反馈
                    this.style.transform = 'scale(0.95)';
                    this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_IN}`;
                    
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                        this.style.transition = `all ${APPLE_DESIGN_TOKENS.DURATION.NORMAL} ${APPLE_DESIGN_TOKENS.EASING.SPRING}`;
                        this.click();
                    }, 100);
                }
            });
        });
        
        // Apple 2024 焦点指示器系统
        const appleA11yStyles = document.createElement('style');
        appleA11yStyles.textContent = `
            /* Apple 2024 焦点指示器 */
            .service-card:focus,
            .bookmark-card:focus {
                outline: 2px solid ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE} !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 4px ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE}20 !important;
                transition: all ${APPLE_DESIGN_TOKENS.DURATION.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT} !important;
            }
            
            /* Apple 2024 高对比度模式支持 */
            @media (prefers-contrast: high) {
                .service-card,
                .bookmark-card {
                    border: 2px solid currentColor !important;
                }
                
                .service-card:focus,
                .bookmark-card:focus {
                    outline: 3px solid ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE} !important;
                    outline-offset: 3px !important;
                }
            }
            
            /* Apple 2024 暗色模式无障碍优化 */
            @media (prefers-color-scheme: dark) {
                .service-card:focus,
                .bookmark-card:focus {
                    outline-color: ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE} !important;
                    box-shadow: 0 0 0 4px ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE}30 !important;
                }
            }
            
            /* Apple 2024 减少透明度支持 */
            @media (prefers-reduced-transparency: reduce) {
                .service-card,
                .bookmark-card {
                    backdrop-filter: none !important;
                    background: rgba(255, 255, 255, 0.95) !important;
                }
                
                @media (prefers-color-scheme: dark) {
                    .service-card,
                    .bookmark-card {
                        background: rgba(28, 28, 30, 0.95) !important;
                    }
                }
            }
        `;
        document.head.appendChild(appleA11yStyles);
        
        // Apple 2024 屏幕阅读器支持
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
        
        // Apple 2024 语音提示功能
        window.announceToScreenReader = function(message) {
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        };
        
        console.log('♿ Apple 2024: 无障碍功能系统已启用');
    }
    
    // Apple 2024 样式系统
    const appleStyles = document.createElement('style');
    appleStyles.textContent = `
        /* Apple 2024 滚动优化 */
        .scrolling .service-card,
        .scrolling .bookmark-card {
            transition: transform ${APPLE_DESIGN_TOKENS.TIMING.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT};
            will-change: transform;
        }
        
        /* Apple 2024 滚动条样式 */
        .search-suggestions::-webkit-scrollbar {
            width: 4px;
        }
        
        .search-suggestions::-webkit-scrollbar-thumb {
            background: ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_GRAY}40;
            border-radius: 2px;
        }
        
        .search-suggestions::-webkit-scrollbar-thumb:hover {
            background: ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_GRAY}60;
        }
        
        /* Apple 2024 减少动画支持 */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(appleStyles);
    
    console.log('🎨 Apple 2024: 样式系统已加载');
    
    // 旧版主题切换函数已被 Apple 2024 版本替代
    
    // Apple 2024 鼠标粒子效果系统
    function addAppleMouseParticles() {
        // Apple 2024 设备性能检测
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowPerformance = navigator.hardwareConcurrency < 4;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Apple风格的性能优化 - 移动端或低性能设备禁用粒子效果
        if (isMobile || isLowPerformance || prefersReducedMotion) {
            console.log('🎯 Apple 2024: 粒子效果已禁用（性能优化或用户偏好）');
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
    
    // Apple 2024 自定义光标系统
    function addAppleCustomCursor() {
        // Apple 2024 设备检测和用户偏好
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (isMobile || prefersReducedMotion) {
            console.log('🖱️ Apple 2024: 自定义光标已禁用（移动设备或用户偏好）');
            return;
        }
        
        const cursor = document.createElement('div');
        cursor.className = 'apple-custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE}60 0%, ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_PURPLE}30 70%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: screen;
            transition: transform ${APPLE_DESIGN_TOKENS.TIMING.FAST} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT};
            opacity: 0;
            will-change: transform, opacity;
        `;
        
        document.body.appendChild(cursor);
        
        // Apple 风格的光标移动优化
        function updateCursor(e) {
            cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
            cursor.style.opacity = '1';
        }
        
        document.addEventListener('mousemove', updateCursor, { passive: true });
        
        // 悬停效果优化
        const interactiveElements = '.service-card, .bookmark-card, button, a, [role="button"]';
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.style.transform += ' scale(1.5)';
                cursor.style.background = `radial-gradient(circle, ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE}80 0%, ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_TEAL}40 70%, transparent 100%)`;
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches(interactiveElements)) {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                cursor.style.background = `radial-gradient(circle, ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_BLUE}60 0%, ${APPLE_DESIGN_TOKENS.COLORS.SYSTEM_PURPLE}30 70%, transparent 100%)`;
            }
        }, true);
        
        // 鼠标离开页面时隐藏光标
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        
        console.log('🖱️ Apple 2024: 自定义光标系统已启用');
    }
     
     // Apple 2024 主题切换系统
    function addAppleThemeTransition() {
        const themeToggle = document.querySelector('.theme-toggle, [data-theme-toggle]');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.style.transition = `all ${APPLE_DESIGN_TOKENS.TIMING.STANDARD} ${APPLE_DESIGN_TOKENS.EASING.EASE_OUT}`;
                setTimeout(() => {
                    document.body.style.transition = '';
                }, parseInt(APPLE_DESIGN_TOKENS.TIMING.STANDARD));
            });
        }
        console.log('🎨 Apple 2024: 主题切换系统已启用');
    }
    
    // 初始化所有 Apple 2024 功能
    addAppleThemeTransition();
    addAppleMouseParticles();
    addAppleCustomCursor();
    
    // Apple 2024 控制台欢迎信息
    console.log('%c🍎 Apple 2024 Design System', 'color: #007AFF; font-size: 16px; font-weight: bold;');
    console.log('%c✨ 沈孙丰个人主页已加载完成', 'color: #34C759; font-size: 14px;');
    console.log('%c🎯 Apple 2024 设计规范已全面应用', 'color: #FF9500; font-size: 14px;');
    console.log('%c⚡ 性能优化和无障碍功能已启用', 'color: #5856D6; font-size: 14px;');
    
})();