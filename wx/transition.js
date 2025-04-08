// 页面过渡效果
document.addEventListener('DOMContentLoaded', function() {
  // 添加页面进入动画
  document.body.classList.add('page-enter');
  setTimeout(function() {
    document.body.classList.add('page-enter-active');
  }, 10);
  
  // 为所有链接添加页面退出动画
  document.querySelectorAll('a[href]:not([target="_blank"])').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // 只处理本地链接
      if (href.startsWith('./') || href.startsWith('#') || href.startsWith('javascript:')) {
        // 对于返回链接，直接返回
        if (href === 'javascript:history.back()') {
          return;
        }
        
        e.preventDefault();
        document.body.classList.remove('page-enter-active');
        document.body.classList.add('page-exit', 'page-exit-active');
        
        setTimeout(function() {
          window.location.href = href;
        }, 300); // 匹配CSS中的过渡时间
      }
    });
  });
  
  // 为所有卡片添加悬浮效果
  document.querySelectorAll('.card-hover').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });
  
  // 延迟加载列表项动画
  document.querySelectorAll('.list-item-slide').forEach(function(item, index) {
    setTimeout(function() {
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 50 * (index + 1));
  });
  
  // 底部导航点击效果
  document.querySelectorAll('.bottom-nav-item').forEach(function(item) {
    item.addEventListener('click', function() {
      // 移除所有激活状态
      document.querySelectorAll('.bottom-nav-item').forEach(function(navItem) {
        navItem.classList.remove('bottom-nav-active');
      });
      
      // 添加当前项激活状态
      this.classList.add('bottom-nav-active');
    });
  });
  
  // 进度条动画
  const progressBars = document.querySelectorAll('.progress-bar');
  if (progressBars.length > 0) {
    setTimeout(function() {
      progressBars.forEach(function(bar) {
        const targetWidth = bar.getAttribute('data-width') || '0%';
        bar.style.width = targetWidth;
      });
    }, 200);
  }
  
  // 添加按钮点击波纹效果
  document.querySelectorAll('.btn-pulse').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(function() {
        ripple.remove();
      }, 600); // 匹配动画持续时间
    });
  });
}); 