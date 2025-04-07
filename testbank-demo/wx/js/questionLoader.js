/**
 * 题库加载与处理工具
 * 用于加载JSON题库文件并提供相关处理函数
 */

// 题库基础路径
const BANK_BASE_PATH = './bank/';

// 课程分类颜色映射
const CATEGORY_COLORS = {
  '电力系统基础': {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    progress: 'bg-blue-600'
  },
  '配电技术': {
    bg: 'bg-green-100',
    text: 'text-green-600',
    progress: 'bg-green-600'
  },
  '安全管理': {
    bg: 'bg-red-100',
    text: 'text-red-600',
    progress: 'bg-red-600'
  },
  '电力自动化': {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    progress: 'bg-purple-600'
  }
};

/**
 * 加载目录文件
 * @returns {Promise<Object>} 题库目录数据
 */
async function loadCatalog() {
  try {
    const response = await fetch(`${BANK_BASE_PATH}目录.json`);
    if (!response.ok) {
      throw new Error('无法加载题库目录');
    }
    return await response.json();
  } catch (error) {
    console.error('加载题库目录失败:', error);
    return null;
  }
}

/**
 * 加载指定的题库文件
 * @param {string} filename 题库文件名
 * @returns {Promise<Object>} 题库数据
 */
async function loadQuestionBank(filename) {
  try {
    const response = await fetch(`${BANK_BASE_PATH}${filename}`);
    if (!response.ok) {
      throw new Error(`无法加载题库: ${filename}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`加载题库失败 ${filename}:`, error);
    return null;
  }
}

/**
 * 获取所有可用题库列表
 * @returns {Promise<Array>} 题库列表
 */
async function getAllBanks() {
  const catalog = await loadCatalog();
  if (!catalog || !catalog.题库列表) {
    return [];
  }
  return catalog.题库列表;
}

/**
 * 获取分类结构
 * @returns {Promise<Object>} 四级分类结构
 */
async function getCategoryStructure() {
  const catalog = await loadCatalog();
  if (!catalog || !catalog.四级分类结构) {
    return {};
  }
  return catalog.四级分类结构;
}

/**
 * 根据类别获取所有科目
 * @param {string} category 类别名称
 * @returns {Promise<Array>} 科目列表
 */
async function getSubjectsByCategory(category) {
  const structure = await getCategoryStructure();
  if (!structure || !structure[category]) {
    return [];
  }
  return Object.keys(structure[category]);
}

/**
 * 根据类别和科目获取所有章节
 * @param {string} category 类别名称
 * @param {string} subject 科目名称
 * @returns {Promise<Array>} 章节列表
 */
async function getChaptersBySubject(category, subject) {
  const structure = await getCategoryStructure();
  if (!structure || !structure[category] || !structure[category][subject]) {
    return [];
  }
  return Object.keys(structure[category][subject]);
}

/**
 * 根据类别、科目和章节获取所有知识点
 * @param {string} category 类别名称
 * @param {string} subject 科目名称
 * @param {string} chapter 章节名称
 * @returns {Promise<Array>} 知识点列表
 */
async function getKnowledgePointsByChapter(category, subject, chapter) {
  const structure = await getCategoryStructure();
  if (!structure || !structure[category] || !structure[category][subject] || !structure[category][subject][chapter]) {
    return [];
  }
  return structure[category][subject][chapter];
}

/**
 * 根据ID获取特定题目
 * @param {string} id 题目ID
 * @returns {Promise<Object>} 题目数据
 */
async function getQuestionById(id) {
  const banks = await getAllBanks();
  
  for (const bank of banks) {
    const bankData = await loadQuestionBank(bank.文件名);
    if (!bankData || !bankData.题目集) continue;
    
    const question = bankData.题目集.find(q => q.id === id);
    if (question) {
      return question;
    }
  }
  
  return null;
}

/**
 * 根据分类条件获取题目
 * @param {Object} filters 过滤条件，可包含类别、科目、章节、知识点
 * @returns {Promise<Array>} 题目列表
 */
async function getQuestionsByFilter(filters = {}) {
  const banks = await getAllBanks();
  let results = [];
  
  for (const bank of banks) {
    // 按类别和科目筛选符合条件的题库
    if ((filters.类别 && bank.类别 !== filters.类别) || 
        (filters.科目 && bank.科目 !== filters.科目)) {
      continue;
    }
    
    const bankData = await loadQuestionBank(bank.文件名);
    if (!bankData || !bankData.题目集) continue;
    
    // 进一步筛选题目
    let filteredQuestions = bankData.题目集;
    
    if (filters.章节) {
      filteredQuestions = filteredQuestions.filter(q => q.章节 === filters.章节);
    }
    
    if (filters.知识点) {
      filteredQuestions = filteredQuestions.filter(q => q.知识点 === filters.知识点);
    }
    
    if (filters.题型) {
      filteredQuestions = filteredQuestions.filter(q => q.题型 === filters.题型);
    }
    
    if (filters.难度) {
      filteredQuestions = filteredQuestions.filter(q => q.难度 === filters.难度);
    }
    
    results = results.concat(filteredQuestions);
  }
  
  return results;
}

/**
 * 获取随机题目
 * @param {number} count 题目数量
 * @param {Object} filters 可选的过滤条件
 * @returns {Promise<Array>} 随机题目列表
 */
async function getRandomQuestions(count = 10, filters = {}) {
  const questions = await getQuestionsByFilter(filters);
  
  if (questions.length <= count) {
    return questions;
  }
  
  // 随机选择指定数量的题目
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * 获取颜色样式
 * @param {string} category 分类名称
 * @returns {Object} 颜色样式对象
 */
function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    progress: 'bg-gray-600'
  };
}

/**
 * 更新题库分类页面
 */
async function updateCategoryPage() {
  const structure = await getCategoryStructure();
  if (!structure) return;
  
  const categoryContainer = document.getElementById('level-1');
  if (!categoryContainer) return;
  
  const categoriesHTML = Object.keys(structure).map((category, index) => {
    const color = getCategoryColor(category);
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
  
  // 更新类别容器
  const categoriesDiv = categoryContainer.querySelector('.grid');
  if (categoriesDiv) {
    categoriesDiv.innerHTML = categoriesHTML;
  }
}

/**
 * 更新科目页面
 * @param {string} category 类别名称
 */
async function updateSubjectsPage(category) {
  const subjects = await getSubjectsByCategory(category);
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
    return `<div class="category-tab ${index === 0 ? 'active text-blue-600' : 'text-gray-600'} whitespace-nowrap px-4 py-2 text-sm font-medium">${subject}</div>`;
  }).join('');
  
  const tabsContainer = subjectsContainer.querySelector('.category-tabs');
  if (tabsContainer) {
    tabsContainer.innerHTML = tabsHTML;
  }
}

/**
 * 初始化题库加载
 */
function initQuestionLoader() {
  console.log('题库加载器初始化...');
  
  // 加载目录并验证题库可用性
  loadCatalog().then(catalog => {
    if (catalog) {
      console.log(`成功加载题库目录，共有${catalog.题库列表.length}个题库`);
      
      // 尝试加载第一个题库以验证
      if (catalog.题库列表.length > 0) {
        const firstBank = catalog.题库列表[0];
        return loadQuestionBank(firstBank.文件名);
      }
    }
    return null;
  }).then(bank => {
    if (bank) {
      console.log(`成功加载题库: ${bank.类别}-${bank.科目}`);
      console.log(`该题库共有${bank.题目集.length}道题目`);
    }
  }).catch(error => {
    console.error('题库初始化失败:', error);
  });
  
  // 如果在分类页面，初始化分类数据
  if (document.getElementById('level-1')) {
    updateCategoryPage();
  }
}

// 当页面加载完成时初始化题库加载器
document.addEventListener('DOMContentLoaded', initQuestionLoader);

// 导出函数供其他脚本使用
window.questionLoader = {
  loadCatalog,
  loadQuestionBank,
  getAllBanks,
  getCategoryStructure,
  getSubjectsByCategory,
  getChaptersBySubject,
  getKnowledgePointsByChapter,
  getQuestionById,
  getQuestionsByFilter,
  getRandomQuestions,
  getCategoryColor,
  updateCategoryPage,
  updateSubjectsPage
}; 