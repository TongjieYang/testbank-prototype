/**
 * 底部导航栏修复脚本
 * 专门处理底部导航栏固定在底部的问题
 */

// 立即执行函数，确保不污染全局作用域
(function() {
    // 在DOM加载完成时执行
    document.addEventListener('DOMContentLoaded', initFixedNav);
    
    // 在window加载完成时执行，确保图片等资源也加载完成
    window.addEventListener('load', initFixedNav);
    
    // 在滚动时重新检查导航栏位置
    window.addEventListener('scroll', function() {
        // 使用节流函数，避免频繁触发
        if (!window.requestAnimationFrame) {
            fixNavBar();
        } else {
            window.requestAnimationFrame(fixNavBar);
        }
    }, { passive: true });
    
    // 在窗口大小改变时重新检查导航栏位置
    window.addEventListener('resize', function() {
        // 使用防抖函数，避免频繁触发
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(fixNavBar, 100);
    }, { passive: true });
    
    /**
     * 初始化固定导航栏
     */
    function initFixedNav() {
        // 检测设备类型
        detectDevice();
        
        // 确保应用容器高度正确
        ensureAppContainerHeight();
        
        // 修复导航栏位置
        fixNavBar();
        
        // 在一段时间后再次修复，处理某些延迟渲染的情况
        setTimeout(fixNavBar, 500);
        setTimeout(fixNavBar, 1000);
        setTimeout(fixNavBar, 2000);
    }
    
    /**
     * 确保.fixed-app-container容器高度占满整个视口
     */
    function ensureAppContainerHeight() {
        const appContainer = document.querySelector('.fixed-app-container');
        if (appContainer) {
            // 设置最小高度为视口高度
            appContainer.style.minHeight = '100vh';
            
            // 如果在iOS设备上，特殊处理
            if (isIOS()) {
                // 针对iOS设备的特殊处理，解决底部工具栏问题
                const setHeight = () => {
                    appContainer.style.height = window.innerHeight + 'px';
                };
                
                setHeight();
                window.addEventListener('resize', setHeight);
                window.addEventListener('orientationchange', setHeight);
            }
        }
    }
    
    /**
     * 修复导航栏位置
     */
    function fixNavBar() {
        const navBar = document.querySelector('.bottom-nav');
        if (!navBar) return;
        
        // 获取应用容器
        const appContainer = document.querySelector('.fixed-app-container');
        
        if (appContainer) {
            // 计算导航栏在容器中的位置
            navBar.style.position = 'absolute';
            navBar.style.bottom = '0';
            navBar.style.left = '0';
            navBar.style.right = '0';
            navBar.style.zIndex = '9999';
            
            // 提高页面容器的z-index，确保内容可见
            const pageContainer = document.querySelector('.page-container');
            if (pageContainer) {
                pageContainer.style.position = 'relative';
                pageContainer.style.zIndex = '1';
            }
        } else {
            // 如果没有应用容器，回退到fixed定位
            navBar.style.position = 'fixed';
            navBar.style.bottom = '0';
            navBar.style.left = '0';
            navBar.style.right = '0';
            navBar.style.zIndex = '9999';
        }
        
        // 应用硬件加速，避免滚动时闪烁
        navBar.style.transform = 'translate3d(0,0,0)';
        navBar.style.webkitTransform = 'translate3d(0,0,0)';
        navBar.style.backfaceVisibility = 'hidden';
        navBar.style.webkitBackfaceVisibility = 'hidden';
        
        // 特别针对iOS设备
        if (isIOS()) {
            document.documentElement.style.webkitOverflowScrolling = 'touch';
            document.body.style.webkitOverflowScrolling = 'touch';
        }
        
        // 确保页面内容不被底部导航栏遮挡
        const pageContainer = document.querySelector('.page-container');
        if (pageContainer) {
            pageContainer.style.paddingBottom = '80px';
            
            // 检查是否需要添加iOS安全区域适配
            if (hasIOSSafeArea()) {
                pageContainer.style.paddingBottom = 'calc(80px + env(safe-area-inset-bottom))';
            }
        }
    }
    
    /**
     * 检测设备类型，为不同设备添加特定类名
     */
    function detectDevice() {
        // 检测是否是iOS设备
        if (isIOS()) {
            document.documentElement.classList.add('ios-device');
            document.body.classList.add('ios-device');
            
            // 获取应用容器并添加iOS类
            const appContainer = document.querySelector('.fixed-app-container');
            if (appContainer) {
                appContainer.classList.add('ios-device');
            }
        }
        
        // 检测是否是Android设备
        if (isAndroid()) {
            document.documentElement.classList.add('android-device');
            document.body.classList.add('android-device');
        }
    }
    
    /**
     * 检测是否是iOS设备
     * @returns {boolean} 是否是iOS设备
     */
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    
    /**
     * 检测是否是Android设备
     * @returns {boolean} 是否是Android设备
     */
    function isAndroid() {
        return /Android/.test(navigator.userAgent);
    }
    
    /**
     * 检测是否支持iOS安全区域
     * @returns {boolean} 是否支持iOS安全区域
     */
    function hasIOSSafeArea() {
        return CSS.supports('padding-bottom: env(safe-area-inset-bottom)');
    }
    
    /**
     * 当页面滚动到底部时，特别处理导航栏
     * 避免iOS橡皮筋效果导致导航栏位置错误
     */
    function handleScrollEnd() {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        // 检查是否滚动到底部
        if (Math.abs(scrollHeight - scrollTop - clientHeight) < 10) {
            // 已滚动到底部，确保导航栏在视口内
            const navBar = document.querySelector('.bottom-nav');
            if (navBar) {
                navBar.style.bottom = '0';
            }
        }
    }
    
    // 监听滚动结束事件
    window.addEventListener('scroll', function() {
        clearTimeout(window.scrollEndTimer);
        window.scrollEndTimer = setTimeout(handleScrollEnd, 100);
    }, { passive: true });
    
    // 在页面返回时特别处理
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // 页面从缓存恢复，重新修复导航栏
            fixNavBar();
        }
    });
})(); 