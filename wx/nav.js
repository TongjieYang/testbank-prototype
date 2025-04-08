/**
 * 底部导航栏增强脚本
 * 提供动态切换效果和交互动画
 */
document.addEventListener('DOMContentLoaded', function() {
    // 检测是否是iOS设备
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // 针对iOS设备的特殊处理
    if (isIOS) {
        // 为body添加iOS特定类
        document.body.classList.add('ios-device');
        
        // 增强底部导航栏的定位
        const navBar = document.querySelector('.bottom-nav');
        if (navBar) {
            navBar.style.position = 'fixed';
            navBar.style.zIndex = '9999';
            navBar.style.transform = 'translateZ(0)';
            navBar.style.webkitTransform = 'translateZ(0)';
            navBar.style.willChange = 'transform';
        }
        
        // 防止页面弹性滚动导致导航栏位置错误
        document.body.addEventListener('touchmove', function(e) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (scrollTop <= 0) {
                // 阻止顶部下拉弹性滚动
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // 监听窗口大小变化，确保导航栏位置正确
    window.addEventListener('resize', function() {
        const navBar = document.querySelector('.bottom-nav');
        if (navBar) {
            // 强制重新计算导航栏位置
            navBar.style.display = 'none';
            setTimeout(() => {
                navBar.style.display = 'flex';
            }, 10);
        }
    });
    
    // 初始化导航项
    initNavigation();
    
    // 添加导航项点击效果
    addNavigationClickEffects();
    
    // 根据当前页面路径高亮对应的导航项
    highlightActiveNavItem();
    
    // 添加页面滑动手势支持
    initPageSwipeGesture();
});

/**
 * 初始化导航项设置
 */
function initNavigation() {
    // 设置页面容器底部内边距，确保内容不被底部导航栏遮挡
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
        pageContainer.style.paddingBottom = '80px';
        // 为页面添加滑动类
        pageContainer.classList.add('page-slide', 'slide-current');
    }
    
    // 获取所有导航项
    const navItems = document.querySelectorAll('.bottom-nav-item');
    
    // 初始化每个导航项
    navItems.forEach(item => {
        // 确保导航项有相对定位，以便添加特效
        item.style.position = 'relative';
        
        // 创建波纹效果容器
        const rippleContainer = document.createElement('div');
        rippleContainer.className = 'nav-ripple-container';
        rippleContainer.style.position = 'absolute';
        rippleContainer.style.top = '0';
        rippleContainer.style.left = '0';
        rippleContainer.style.width = '100%';
        rippleContainer.style.height = '100%';
        rippleContainer.style.overflow = 'hidden';
        rippleContainer.style.pointerEvents = 'none';
        
        item.appendChild(rippleContainer);
    });
}

/**
 * 为导航项添加点击效果
 */
function addNavigationClickEffects() {
    const navItems = document.querySelectorAll('.bottom-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 阻止默认行为，我们将手动处理导航
            e.preventDefault();
            
            // 获取目标链接和当前页面路径
            const href = this.getAttribute('href');
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop();
            const targetPage = href.split('/').pop();
            
            // 如果点击当前页面，不进行处理
            if (currentPage === targetPage) {
                return;
            }
            
            // 添加震动效果
            applyShakeEffect(this);
            
            // 添加波纹效果
            createRippleEffect(e, this);
            
            // 高亮导航项
            updateActiveNavItem(this);
            
            // 应用页面过渡动画
            const pageContainer = document.querySelector('.page-container');
            if (pageContainer) {
                // 根据导航顺序决定滑动方向
                const direction = getNavigationDirection(currentPage, targetPage);
                
                if (direction === 'right') {
                    // 如果是向右导航，先移除当前类，添加右滑类，然后跳转
                    pageContainer.classList.remove('slide-current');
                    pageContainer.classList.add('slide-left');
                } else if (direction === 'left') {
                    // 如果是向左导航，先移除当前类，添加左滑类，然后跳转
                    pageContainer.classList.remove('slide-current');
                    pageContainer.classList.add('slide-right');
                }
                
                // 等待动画完成后再跳转
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            } else {
                // 如果没有页面容器，直接跳转
                window.location.href = href;
            }
        });
    });
}

/**
 * 获取导航方向
 * @param {string} currentPage - 当前页面名称
 * @param {string} targetPage - 目标页面名称
 * @returns {string} 方向，'left'或'right'
 */
function getNavigationDirection(currentPage, targetPage) {
    // 定义页面顺序
    const pageOrder = [
        'HomePage.html',
        'QuestionBankPage.html',
        'WrongQuestionsPage.html',
        'PersonalCenterPage.html'
    ];
    
    const currentIndex = pageOrder.indexOf(currentPage);
    const targetIndex = pageOrder.indexOf(targetPage);
    
    // 如果无法确定顺序，默认向右滑动
    if (currentIndex === -1 || targetIndex === -1) {
        return 'right';
    }
    
    // 如果目标索引大于当前索引，向左滑动（显示右侧页面）
    // 否则向右滑动（显示左侧页面）
    return targetIndex > currentIndex ? 'left' : 'right';
}

/**
 * 应用震动效果
 * @param {HTMLElement} element - 要应用效果的元素
 */
function applyShakeEffect(element) {
    // 移除之前可能存在的动画类
    element.classList.remove('nav-shake-animation');
    
    // 强制浏览器重新计算样式，以确保动画重新开始
    void element.offsetWidth;
    
    // 添加震动动画类
    element.classList.add('nav-shake-animation');
    
    // 在动画完成后移除类
    setTimeout(() => {
        element.classList.remove('nav-shake-animation');
    }, 500);
    
    // 添加自定义震动动画样式，如果还不存在
    if (!document.getElementById('nav-animation-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'nav-animation-styles';
        styleSheet.textContent = `
            @keyframes navShake {
                0% { transform: translateX(0); }
                12.5% { transform: translateX(-3px) rotate(-1deg); }
                25% { transform: translateX(3px) rotate(1deg); }
                37.5% { transform: translateX(-2px) rotate(-0.5deg); }
                50% { transform: translateX(2px) rotate(0.5deg); }
                62.5% { transform: translateX(-1px) rotate(-0.25deg); }
                75% { transform: translateX(1px) rotate(0.25deg); }
                87.5% { transform: translateX(-0.5px) rotate(-0.125deg); }
                100% { transform: translateX(0); }
            }
            
            .nav-shake-animation {
                animation: navShake 0.4s ease;
            }
            
            @keyframes navRipple {
                to {
                    transform: scale(15);
                    opacity: 0;
                }
            }
            
            .nav-ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(37, 99, 235, 0.2);
                transform: scale(0);
                animation: navRipple 0.6s ease-out;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

/**
 * 创建点击波纹效果
 * @param {Event} e - 点击事件
 * @param {HTMLElement} element - 要应用效果的元素
 */
function createRippleEffect(e, element) {
    const rippleContainer = element.querySelector('.nav-ripple-container');
    if (!rippleContainer) return;
    
    // 清除之前的波纹
    const existingRipples = rippleContainer.querySelectorAll('.nav-ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    // 创建新波纹
    const ripple = document.createElement('div');
    ripple.className = 'nav-ripple';
    
    // 获取容器尺寸
    const rect = rippleContainer.getBoundingClientRect();
    
    // 计算点击位置相对于容器的坐标
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // 设置波纹起始位置
    ripple.style.top = `${rect.height / 2}px`;
    ripple.style.left = `${rect.width / 2}px`;
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.marginLeft = '-5px';
    ripple.style.marginTop = '-5px';
    
    // 添加波纹到容器
    rippleContainer.appendChild(ripple);
    
    // 移除波纹
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * 更新活动导航项
 * @param {HTMLElement} activeItem - 当前激活的导航项
 */
function updateActiveNavItem(activeItem) {
    const navItems = document.querySelectorAll('.bottom-nav-item');
    
    // 移除所有导航项的活动状态
    navItems.forEach(item => {
        item.classList.remove('bottom-nav-active');
        
        // 重置图标和文本颜色
        const icon = item.querySelector('.mp-icon');
        const text = item.querySelector('.text-xs');
        
        if (icon) icon.classList.remove('text-blue-600');
        if (icon) icon.classList.add('text-gray-500');
        
        if (text) text.classList.remove('text-blue-600');
        if (text) text.classList.add('text-gray-500');
    });
    
    // 设置当前项为活动状态
    activeItem.classList.add('bottom-nav-active');
    
    // 更新图标和文本颜色
    const activeIcon = activeItem.querySelector('.mp-icon');
    const activeText = activeItem.querySelector('.text-xs');
    
    if (activeIcon) {
        activeIcon.classList.remove('text-gray-500');
        activeIcon.classList.add('text-blue-600');
    }
    
    if (activeText) {
        activeText.classList.remove('text-gray-500');
        activeText.classList.add('text-blue-600');
    }
}

/**
 * 根据当前页面URL高亮对应的导航项
 */
function highlightActiveNavItem() {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    
    // 为页面添加入场动画（从右或左侧滑入）
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
        // 检查sessionStorage中是否有导航方向记录
        const direction = sessionStorage.getItem('navigationDirection');

        if (direction === 'right') {
            pageContainer.classList.remove('slide-left');
            pageContainer.classList.add('slide-current');
        } else if (direction === 'left') {
            pageContainer.classList.remove('slide-right');
            pageContainer.classList.add('slide-current');
        }
        
        // 清除记录
        sessionStorage.removeItem('navigationDirection');
    }
    
    // 映射文件名到导航项索引
    const navMapping = {
        'HomePage.html': 0,
        'QuestionBankPage.html': 1,
        'WrongQuestionsPage.html': 2,
        'PersonalCenterPage.html': 3
    };
    
    // 查找当前激活的导航项索引
    const activeIndex = navMapping[filename];
    
    if (activeIndex !== undefined) {
        const navItems = document.querySelectorAll('.bottom-nav-item');
        if (navItems.length > activeIndex) {
            // 自动激活对应的导航项
            const activeItem = navItems[activeIndex];
            
            // 移除所有导航项的活动状态
            navItems.forEach(item => {
                item.classList.remove('bottom-nav-active');
                
                // 重置图标和文本颜色
                const icon = item.querySelector('.mp-icon');
                const text = item.querySelector('.text-xs');
                
                if (icon) icon.classList.remove('text-blue-600');
                if (icon) icon.classList.add('text-gray-500');
                
                if (text) text.classList.remove('text-blue-600');
                if (text) text.classList.add('text-gray-500');
            });
            
            // 设置当前项为活动状态
            activeItem.classList.add('bottom-nav-active');
            
            // 更新图标和文本颜色
            const activeIcon = activeItem.querySelector('.mp-icon');
            const activeText = activeItem.querySelector('.text-xs');
            
            if (activeIcon) {
                activeIcon.classList.remove('text-gray-500');
                activeIcon.classList.add('text-blue-600');
            }
            
            if (activeText) {
                activeText.classList.remove('text-gray-500');
                activeText.classList.add('text-blue-600');
            }
        }
    }
}

/**
 * 初始化页面滑动手势
 * 支持左右滑动切换页面
 */
function initPageSwipeGesture() {
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    // 定义页面顺序
    const pageOrder = [
        'HomePage.html',
        'QuestionBankPage.html',
        'WrongQuestionsPage.html',
        'PersonalCenterPage.html'
    ];
    
    // 获取当前页面索引
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    const currentIndex = pageOrder.indexOf(currentPage);
    
    // 如果当前页面不在导航中，则不添加滑动
    if (currentIndex === -1) return;
    
    // 触摸开始
    pageContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    // 触摸移动
    pageContainer.addEventListener('touchmove', function(e) {
        if (isSwiping) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchEndX - touchStartX;
        
        // 只对大于50px的滑动做出反应，并且只计算第一次滑动
        if (Math.abs(diffX) > 50) {
            isSwiping = true;
            
            // 向左滑动，显示右侧页面
            if (diffX < 0 && currentIndex < pageOrder.length - 1) {
                navigateToPage(pageOrder[currentIndex + 1], 'left');
            }
            // 向右滑动，显示左侧页面
            else if (diffX > 0 && currentIndex > 0) {
                navigateToPage(pageOrder[currentIndex - 1], 'right');
            }
        }
    }, { passive: true });
    
    // 触摸结束，重置状态
    pageContainer.addEventListener('touchend', function() {
        isSwiping = false;
    }, { passive: true });
}

/**
 * 导航到指定页面
 * @param {string} page - 目标页面名称
 * @param {string} direction - 滑动方向，'left'或'right'
 */
function navigateToPage(page, direction) {
    // 保存导航方向到sessionStorage，供下一页面使用
    sessionStorage.setItem('navigationDirection', direction);
    
    // 获取页面容器
    const pageContainer = document.querySelector('.page-container');
    if (!pageContainer) {
        window.location.href = page;
        return;
    }
    
    // 应用过渡动画
    pageContainer.classList.remove('slide-current');
    if (direction === 'left') {
        // 向左导航（显示右侧页面）
        pageContainer.classList.add('slide-left');
    } else {
        // 向右导航（显示左侧页面）
        pageContainer.classList.add('slide-right');
    }
    
    // 更新导航栏高亮显示
    const navItems = document.querySelectorAll('.bottom-nav-item');
    const targetPageIndex = ['HomePage.html', 'QuestionBankPage.html', 'WrongQuestionsPage.html', 'PersonalCenterPage.html'].indexOf(page);
    
    if (targetPageIndex !== -1 && navItems.length > targetPageIndex) {
        updateActiveNavItem(navItems[targetPageIndex]);
        
        // 添加震动效果到导航项
        applyShakeEffect(navItems[targetPageIndex]);
    }
    
    // 等待动画完成后再跳转
    setTimeout(() => {
        window.location.href = page;
    }, 150);
}

// 修复iOS Safari浏览器底部导航栏问题的辅助函数
function fixIOSNavBar() {
    // 检测是否为iOS设备
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIOS) return;
    
    // 获取底部导航栏
    const navBar = document.querySelector('.bottom-nav');
    if (!navBar) return;
    
    // 在滚动事件中强制重新计算导航栏位置
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            // 重新应用fixed定位
            navBar.style.position = 'fixed';
            navBar.style.bottom = '0';
            
            // 强制浏览器重新渲染
            navBar.style.display = 'none';
            void navBar.offsetHeight; // 触发回流
            navBar.style.display = 'flex';
        }, 100);
    }, { passive: true });
    
    // 在页面加载完成后强制更新一次导航栏位置
    window.addEventListener('load', function() {
        navBar.style.position = 'fixed';
        navBar.style.bottom = '0';
    });
}

// 在页面加载完成后自动调用修复函数
window.addEventListener('load', fixIOSNavBar); 