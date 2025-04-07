/**
 * 启动画面控制脚本
 * 用于控制启动画面的显示和隐藏
 */
document.addEventListener('DOMContentLoaded', function() {
    // 判断是否是第一次打开应用
    const isFirstVisit = !localStorage.getItem('app_visited');
    
    // 如果是从别的页面返回，则不显示启动画面
    const isFromOtherPage = document.referrer.includes(window.location.hostname);
    
    // 创建闪光效果元素
    const flashEffect = document.createElement('div');
    flashEffect.className = 'flash-effect';
    document.body.appendChild(flashEffect);
    
    // 如果不是首次访问，且是从别的页面返回，则不显示启动画面
    if (!isFirstVisit && isFromOtherPage) {
        // 只显示闪光效果，不显示完整启动画面
        setTimeout(() => {
            flashEffect.remove();
        }, 2500);
        return;
    }
    
    // 标记为已访问
    localStorage.setItem('app_visited', 'true');
    
    // 创建启动画面
    const splashScreen = document.createElement('div');
    splashScreen.className = 'splash-screen';
    
    // 构建启动画面内容
    splashScreen.innerHTML = `
        <div class="splash-logo">
            <img src="./assets/logo.svg" alt="国网考试题库" onerror="this.src='./assets/logo.png'; this.onerror=null;">
        </div>
        <div class="splash-title">国网考试题库</div>
        <div class="splash-subtitle">提升专业技能，助力职业发展</div>
        <div class="splash-loading"></div>
        <div class="splash-loading-text">正在加载资源...</div>
    `;
    
    // 添加到页面
    document.body.appendChild(splashScreen);
    
    // 防止滚动
    document.body.style.overflow = 'hidden';
    
    // 模拟加载完成后隐藏启动画面
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        // 恢复滚动
        document.body.style.overflow = '';
        
        // 完全隐藏后移除元素
        setTimeout(() => {
            splashScreen.remove();
            flashEffect.remove();
        }, 500);
    }, 3000);
});

/**
 * 手动显示启动动画
 * 可在任何需要的地方调用这个函数来显示启动动画
 * @param {number} duration - 启动动画显示时长(毫秒)
 */
function showSplashScreen(duration = 3000) {
    // 创建闪光效果元素
    const flashEffect = document.createElement('div');
    flashEffect.className = 'flash-effect';
    document.body.appendChild(flashEffect);
    
    // 创建启动画面
    const splashScreen = document.createElement('div');
    splashScreen.className = 'splash-screen';
    
    // 构建启动画面内容
    splashScreen.innerHTML = `
        <div class="splash-logo">
            <img src="./assets/logo.svg" alt="国网考试题库" onerror="this.src='./assets/logo.png'; this.onerror=null;">
        </div>
        <div class="splash-title">国网考试题库</div>
        <div class="splash-subtitle">提升专业技能，助力职业发展</div>
        <div class="splash-loading"></div>
        <div class="splash-loading-text">正在加载资源...</div>
    `;
    
    // 添加到页面
    document.body.appendChild(splashScreen);
    
    // 防止滚动
    document.body.style.overflow = 'hidden';
    
    // 模拟加载完成后隐藏启动画面
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        // 恢复滚动
        document.body.style.overflow = '';
        
        // 完全隐藏后移除元素
        setTimeout(() => {
            splashScreen.remove();
            flashEffect.remove();
        }, 500);
    }, duration);
    
    return {
        hide: function() {
            splashScreen.classList.add('fade-out');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                splashScreen.remove();
                flashEffect.remove();
            }, 500);
        }
    };
} 