/**
 * 分类页面加载器
 * 用于加载和展示四级分类结构
 */

// 当前分类导航状态
let categoryNavState = {
  level: 1, // 当前层级：1-类别，2-科目，3-章节，4-知识点
  category: '', // 当前选中的类别
  subject: '', // 当前选中的科目
  chapter: '', // 当前选中的章节
  knowledgePoint: '' // 当前选中的知识点
};

/**
 * 初始化分类页面
 */
async function initCategoryPage() {
  console.log('初始化分类页面...');
  
  try {
    // 加载分类结构
    const structure = await window.questionLoader.getCategoryStructure();
    if (!structure) {
      console.error('加载分类结构失败');
      return;
    }
    
    // 更新类别页面 (第一级)
    updateCategoryLevel(structure);
    
    // 绑定分类页面事件
    bindCategoryEvents();
    
  } catch (error) {
    console.error('初始化分类页面失败:', error);
  }
}

/**
 * 更新类别页面 (第一级)
 * @param {Object} structure 分类结构
 */
function updateCategoryLevel(structure) {
  const categoryContainer = document.getElementById('level-1');
  if (!categoryContainer) return;
  
  // 构建类别卡片
  const categoriesDiv = categoryContainer.querySelector('.grid');
  if (!categoriesDiv) return;
  
  const categoriesHTML = Object.keys(structure).map(category => {
    const color = window.questionLoader.getCategoryColor(category);
    const subjects = Object.keys(structure[category]).length;
    const progress = Math.floor(Math.random() * 50) + 30; // 模拟学习进度
    
    return `
      <div class="category-card bg-white rounded-lg shadow-sm p-4 flex flex-col items-center list-item-slide" data-category="${category}">
        <div class="w-14 h-14 rounded-full ${color.bg} flex items-center justify-center mb-2">
          <div class="icon-book mp-icon w-7 h-7 ${color.text}"></div>
        </div>
        <div class="font-medium text-center">${category}</div>
        <div class="text-xs text-gray-500 mt-1">${subjects}个科目</div>
        <div class="mt-2 text-xs">
          <div class="w-full bg-gray-200 h-1.5 rounded-full">
            <div class="${color.progress} h-full rounded-full progress-animate" style="width: ${progress}%"></div>
          </div>
          <div class="mt-1 text-gray-500">已掌握 ${progress}%</div>
        </div>
      </div>
    `;
  }).join('');
  
  categoriesDiv.innerHTML = categoriesHTML;
}

/**
 * 更新科目页面 (第二级)
 * @param {string} category 类别名称
 */
async function updateSubjectLevel(category) {
  const structure = await window.questionLoader.getCategoryStructure();
  if (!structure || !structure[category]) return;
  
  const subjects = Object.keys(structure[category]);
  if (!subjects.length) return;
  
  const subjectsContainer = document.getElementById('level-2');
  if (!subjectsContainer) return;
  
  // 更新标题
  const title = subjectsContainer.querySelector('.font-medium');
  if (title) {
    title.textContent = `${category} - 科目`;
  }
  
  // 更新标签
  const tabsHTML = subjects.map((subject, index) => {
    return `<div class="category-tab ${index === 0 ? 'active text-blue-600' : 'text-gray-600'} whitespace-nowrap px-4 py-2 text-sm font-medium" data-subject="${subject}">${subject}</div>`;
  }).join('');
  
  const tabsContainer = subjectsContainer.querySelector('.category-tabs');
  if (tabsContainer) {
    tabsContainer.innerHTML = tabsHTML;
  }
  
  // 更新章节列表 (默认显示第一个科目的章节)
  const defaultSubject = subjects[0];
  const chapters = Object.keys(structure[category][defaultSubject]);
  
  const chaptersHTML = chapters.map(chapter => {
    const progress = Math.floor(Math.random() * 100); // 模拟学习进度
    const progressColor = progress >= 80 ? 'bg-green-600' : progress >= 50 ? 'bg-yellow-600' : 'bg-red-600';
    const progressText = progress >= 80 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600';
    
    return `
      <div class="list-item-slide" data-chapter="${chapter}">
        <div class="bg-white rounded-lg shadow-sm p-4">
          <div class="flex justify-between items-start">
            <div>
              <div class="font-medium">${chapter}</div>
              <div class="text-xs text-gray-500 mt-1">${structure[category][defaultSubject][chapter].length}个知识点</div>
            </div>
            <div class="flex items-center">
              <div class="text-xs ${progressText} mr-2">掌握度 ${progress}%</div>
              <div class="icon-chevron-right mp-icon w-5 h-5 text-gray-400"></div>
            </div>
          </div>
          <div class="mt-2 w-full bg-gray-200 h-1.5 rounded-full">
            <div class="${progressColor} h-full rounded-full progress-animate" style="width: ${progress}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  const chaptersContainer = subjectsContainer.querySelector('.p-4.space-y-3');
  if (chaptersContainer) {
    chaptersContainer.innerHTML = chaptersHTML;
  }
}

/**
 * 更新章节页面 (第三级)
 * @param {string} category 类别名称
 * @param {string} subject 科目名称
 * @param {string} chapter 章节名称
 */
async function updateChapterLevel(category, subject, chapter) {
  const structure = await window.questionLoader.getCategoryStructure();
  if (!structure || !structure[category] || !structure[category][subject] || !structure[category][subject][chapter]) return;
  
  const knowledgePoints = structure[category][subject][chapter];
  if (!knowledgePoints.length) return;
  
  const chapterContainer = document.getElementById('level-3');
  if (!chapterContainer) return;
  
  // 更新标题
  const title = chapterContainer.querySelector('.font-medium');
  if (title) {
    title.textContent = `${subject} - 章节`;
  }
  
  // 更新标签
  const chapters = Object.keys(structure[category][subject]);
  const tabsHTML = chapters.map((ch, index) => {
    const isActive = ch === chapter;
    return `<div class="category-tab ${isActive ? 'active text-blue-600' : 'text-gray-600'} whitespace-nowrap px-4 py-2 text-sm font-medium" data-chapter="${ch}">${ch}</div>`;
  }).join('');
  
  const tabsContainer = chapterContainer.querySelector('.category-tabs');
  if (tabsContainer) {
    tabsContainer.innerHTML = tabsHTML;
  }
  
  // 更新知识点列表
  const pointsHTML = knowledgePoints.map((point, index) => {
    const progress = Math.floor(Math.random() * 100); // 模拟学习进度
    const progressColor = progress >= 80 ? 'bg-green-600' : progress >= 50 ? 'bg-yellow-600' : 'bg-red-600';
    const progressText = progress >= 80 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600';
    const status = progress >= 80 ? '已掌握' : progress >= 50 ? '学习中' : '待学习';
    const statusColor = progress >= 80 ? 'text-green-600' : progress >= 50 ? 'text-yellow-600' : 'text-red-600';
    
    return `
      <div class="bg-white rounded-lg shadow-sm p-4 list-item-slide" data-point="${point}" onclick="location.href='./ExercisePage.html?category=${encodeURIComponent(category)}&subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapter)}&point=${encodeURIComponent(point)}'">
        <div class="flex justify-between">
          <div class="font-medium">${point}</div>
          <div class="text-xs ${statusColor}">${status}</div>
        </div>
        <div class="text-xs text-gray-500 mt-1">上次学习: ${index % 2 === 0 ? '今天' : '3天前'}</div>
        <div class="mt-2 flex justify-between items-center">
          <div class="text-xs text-gray-600">掌握度</div>
          <div class="text-xs ${progressText}">${progress}%</div>
        </div>
        <div class="mt-1 w-full bg-gray-200 h-1.5 rounded-full">
          <div class="${progressColor} h-full rounded-full progress-animate" style="width: ${progress}%"></div>
        </div>
      </div>
    `;
  }).join('');
  
  const pointsContainer = chapterContainer.querySelector('.space-y-3');
  if (pointsContainer) {
    pointsContainer.innerHTML = pointsHTML;
  }
}

/**
 * 绑定分类页面事件
 */
function bindCategoryEvents() {
  // 类别卡片点击事件
  document.addEventListener('click', function(event) {
    const categoryCard = event.target.closest('.category-card');
    if (categoryCard) {
      const category = categoryCard.dataset.category;
      if (category) {
        // 更新导航状态
        categoryNavState.level = 2;
        categoryNavState.category = category;
        
        // 显示面包屑
        const breadcrumbPath = document.getElementById('breadcrumb-path');
        if (breadcrumbPath) {
          breadcrumbPath.classList.remove('hidden');
          const categoryItem = breadcrumbPath.querySelector('[data-level="1"]');
          if (categoryItem) {
            categoryItem.textContent = category;
          }
        }
        
        // 切换到二级页面
        document.getElementById('level-1').classList.remove('active');
        document.getElementById('level-1').classList.add('hidden');
        document.getElementById('level-2').classList.remove('hidden');
        
        // 更新二级页面内容
        updateSubjectLevel(category);
        
        // 添加进入动画
        setTimeout(() => {
          document.getElementById('level-2').classList.add('active');
        }, 50);
        
        // 显示提示
        showToast(`已选择: ${category}`);
      }
    }
    
    // 科目标签点击事件
    const subjectTab = event.target.closest('.category-tab');
    if (subjectTab && categoryNavState.level === 2) {
      const subject = subjectTab.dataset.subject;
      if (subject) {
        // 更新所有标签状态
        const tabs = document.querySelectorAll('#level-2 .category-tab');
        tabs.forEach(tab => {
          tab.classList.remove('active', 'text-blue-600');
          tab.classList.add('text-gray-600');
        });
        
        // 设置当前标签为激活状态
        subjectTab.classList.add('active', 'text-blue-600');
        subjectTab.classList.remove('text-gray-600');
        
        // 更新导航状态
        categoryNavState.subject = subject;
        
        // 更新面包屑
        const breadcrumbPath = document.getElementById('breadcrumb-path');
        if (breadcrumbPath) {
          const subjectItem = breadcrumbPath.querySelector('[data-level="2"]');
          if (subjectItem) {
            subjectItem.textContent = subject;
          }
        }
      }
    }
    
    // 章节点击事件
    const chapterItem = event.target.closest('[data-chapter]');
    if (chapterItem && categoryNavState.level === 2) {
      const chapter = chapterItem.dataset.chapter;
      if (chapter) {
        // 更新导航状态
        categoryNavState.level = 3;
        categoryNavState.chapter = chapter;
        
        // 更新面包屑
        const breadcrumbPath = document.getElementById('breadcrumb-path');
        if (breadcrumbPath) {
          const chapterItem = breadcrumbPath.querySelector('[data-level="3"]');
          if (chapterItem) {
            chapterItem.textContent = chapter;
          }
        }
        
        // 切换到三级页面
        document.getElementById('level-2').classList.remove('active');
        document.getElementById('level-2').classList.add('hidden');
        document.getElementById('level-3').classList.remove('hidden');
        
        // 更新三级页面内容
        updateChapterLevel(categoryNavState.category, categoryNavState.subject, chapter);
        
        // 添加进入动画
        setTimeout(() => {
          document.getElementById('level-3').classList.add('active');
        }, 50);
        
        // 显示提示
        showToast(`已选择: ${chapter}`);
      }
    }
  });
  
  // 面包屑导航点击
  const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
  breadcrumbItems.forEach(item => {
    item.addEventListener('click', function() {
      const level = parseInt(this.dataset.level);
      
      // 设置当前导航级别
      categoryNavState.level = level + 1;
      
      // 隐藏所有层级内容
      document.querySelectorAll('.category-content').forEach(content => {
        content.classList.remove('active');
        content.classList.add('hidden');
      });
      
      // 显示当前层级内容
      const targetLevel = document.getElementById(`level-${level + 1}`);
      if (targetLevel) {
        targetLevel.classList.remove('hidden');
        setTimeout(() => {
          targetLevel.classList.add('active');
        }, 50);
      }
      
      // 更新面包屑显示
      if (level === 0) {
        document.getElementById('breadcrumb-path').classList.add('hidden');
      }
      
      // 显示提示
      showToast(`返回到: ${this.textContent}`);
    });
  });
}

/**
 * 显示提示消息
 * @param {string} message 消息内容
 */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm bg-gray-800 z-50 opacity-0';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // 添加动画
  toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  toast.style.transform = 'translate(-50%, -20px)';
  
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
  }, 10);
  
  // 自动消失
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// 当页面加载完成时初始化分类页面
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否在分类页面
  const categoryPage = document.getElementById('level-1');
  if (categoryPage) {
    initCategoryPage();
  }
});

// 导出函数供其他脚本使用
window.categoryLoader = {
  initCategoryPage,
  updateCategoryLevel,
  updateSubjectLevel,
  updateChapterLevel
}; 