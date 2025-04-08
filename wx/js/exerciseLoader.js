/**
 * 练习页面加载器
 * 用于从题库中加载题目并展示在练习页面中
 */

// 当前练习数据
let currentExercise = {
  questions: [], // 题目列表
  currentIndex: 0, // 当前题目索引
  answers: {}, // 用户的答案
  params: {} // 练习参数
};

/**
 * 初始化练习页面
 * @param {Object} params 练习参数：类别、科目、章节、知识点等
 */
async function initExercisePage(params = {}) {
  // 保存参数
  currentExercise.params = params;
  
  // 从URL参数中获取过滤条件
  if (!Object.keys(params).length) {
    const urlParams = new URLSearchParams(window.location.search);
    
    // 获取基本分类参数
    const category = urlParams.get('category');
    const subject = urlParams.get('subject');
    const chapter = urlParams.get('chapter');
    const knowledgePoint = urlParams.get('point');
    
    if (category) params.类别 = decodeURIComponent(category);
    if (subject) params.科目 = decodeURIComponent(subject);
    if (chapter) params.章节 = decodeURIComponent(chapter);
    if (knowledgePoint) params.知识点 = decodeURIComponent(knowledgePoint);
    
    // 更新参数
    currentExercise.params = params;
  }
  
  // 获取页面标题元素
  const titleElement = document.querySelector('.font-bold.text-lg.mx-auto');
  if (titleElement) {
    if (params.类别 && params.科目) {
      titleElement.textContent = `${params.类别}-${params.科目}`;
    } else if (params.类别) {
      titleElement.textContent = params.类别;
    }
  }
  
  try {
    // 加载题目
    let questions;
    
    // 如果有ID参数，加载指定题目
    if (params.id) {
      const question = await window.questionLoader.getQuestionById(params.id);
      questions = question ? [question] : [];
    } else {
      // 否则根据过滤条件加载题目
      questions = await window.questionLoader.getQuestionsByFilter(params);
      
      // 如果没有指定参数，加载随机题目
      if (questions.length === 0 && Object.keys(params).length === 0) {
        questions = await window.questionLoader.getRandomQuestions(10);
      }
    }
    
    // 保存题目
    currentExercise.questions = questions;
    
    // 展示题目
    if (questions.length > 0) {
      displayQuestion(0);
      updateProgress();
    } else {
      showNoQuestionsMessage();
    }
    
    // 绑定事件
    bindExerciseEvents();
    
  } catch (error) {
    console.error('初始化练习页面失败:', error);
  }
}

/**
 * 显示当前题目
 * @param {number} index 题目索引
 */
function displayQuestion(index) {
  if (!currentExercise.questions || index >= currentExercise.questions.length) {
    return;
  }
  
  // 更新当前索引
  currentExercise.currentIndex = index;
  
  // 获取当前题目
  const question = currentExercise.questions[index];
  
  // 更新题目类型标签
  const typeElement = document.querySelector('.bg-blue-100.text-blue-600');
  if (typeElement && question.题型) {
    typeElement.textContent = question.题型;
  }
  
  // 更新题目数量信息
  const countElement = document.querySelector('.text-xs.text-gray-500');
  if (countElement) {
    countElement.textContent = `题目 ${index + 1} / ${currentExercise.questions.length}`;
  }
  
  // 更新题目内容
  const contentElement = document.querySelector('.text-base.font-medium.text-gray-800');
  if (contentElement) {
    contentElement.textContent = question.题干;
  }
  
  // 更新知识点标签
  const tagsContainer = document.querySelector('.mt-2.flex.flex-wrap.gap-2');
  if (tagsContainer) {
    let tagsHTML = '';
    
    if (question.章节) {
      tagsHTML += `
        <div class="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600 flex items-center">
          <div class="icon-tag mp-icon w-3 h-3 mr-1"></div>
          ${question.章节}
        </div>
      `;
    }
    
    if (question.知识点) {
      tagsHTML += `
        <div class="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600 flex items-center">
          <div class="icon-tag mp-icon w-3 h-3 mr-1"></div>
          ${question.知识点}
        </div>
      `;
    }
    
    tagsContainer.innerHTML = tagsHTML;
  }
  
  // 更新选项
  const optionsContainer = document.querySelector('.px-4.py-2');
  if (optionsContainer && question.选项) {
    let optionsHTML = '';
    
    // 判断题型
    if (question.题型 === '单选题' || question.题型 === '多选题') {
      // 处理选择题选项
      const options = question.选项;
      
      Object.keys(options).forEach(key => {
        optionsHTML += `
          <div class="mb-3 p-3 border border-gray-200 rounded-lg flex items-center option list-item-slide" data-option="${key}">
            <div class="w-7 h-7 flex-shrink-0 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
              ${key}
            </div>
            <div class="ml-3 text-gray-700">
              ${options[key]}
            </div>
          </div>
        `;
      });
    } else if (question.题型 === '判断题') {
      // 处理判断题选项
      optionsHTML += `
        <div class="mb-3 p-3 border border-gray-200 rounded-lg flex items-center option list-item-slide" data-option="正确">
          <div class="w-7 h-7 flex-shrink-0 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
            A
          </div>
          <div class="ml-3 text-gray-700">
            正确
          </div>
        </div>
        <div class="mb-3 p-3 border border-gray-200 rounded-lg flex items-center option list-item-slide" data-option="错误">
          <div class="w-7 h-7 flex-shrink-0 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
            B
          </div>
          <div class="ml-3 text-gray-700">
            错误
          </div>
        </div>
      `;
    }
    
    optionsContainer.innerHTML = optionsHTML;
  }
  
  // 更新解析内容（默认隐藏）
  const analysisContainer = document.querySelector('.bg-blue-50.rounded-lg.p-4');
  if (analysisContainer) {
    // 先隐藏解析
    analysisContainer.style.display = 'none';
    
    // 更新解析内容
    let answerText = '';
    if (question.题型 === '单选题' || question.题型 === '多选题') {
      answerText = `正确答案：${question.答案}`;
    } else if (question.题型 === '判断题') {
      answerText = `正确答案：${question.答案 === 'A' ? '正确' : '错误'}`;
    }
    
    const analysisHTML = `
      <div class="font-medium text-blue-800 mb-2">答案解析</div>
      <div class="text-sm text-gray-700 leading-relaxed">
        <p>${answerText}</p>
        <p class="mt-2">${question.解析 || '暂无解析'}</p>
      </div>
    `;
    
    analysisContainer.innerHTML = analysisHTML;
  }
  
  // 恢复选项的默认状态
  resetOptions();
  
  // 如果用户之前已经作答，恢复选择状态
  if (currentExercise.answers[question.id]) {
    const userAnswer = currentExercise.answers[question.id];
    showAnswer(userAnswer);
  }
}

/**
 * 更新进度条
 */
function updateProgress() {
  if (!currentExercise.questions || currentExercise.questions.length === 0) {
    return;
  }
  
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    const progress = (currentExercise.currentIndex + 1) / currentExercise.questions.length * 100;
    progressBar.style.width = `${progress}%`;
  }
}

/**
 * 显示无题目消息
 */
function showNoQuestionsMessage() {
  const contentElement = document.querySelector('.text-base.font-medium.text-gray-800');
  if (contentElement) {
    contentElement.textContent = '暂无符合条件的题目';
  }
  
  // 隐藏选项和解析
  const optionsContainer = document.querySelector('.px-4.py-2');
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
  }
  
  const analysisContainer = document.querySelector('.bg-blue-50.rounded-lg.p-4');
  if (analysisContainer) {
    analysisContainer.style.display = 'none';
  }
}

/**
 * 重置所有选项的状态
 */
function resetOptions() {
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.classList.remove('option-selected', 'border-2', 'border-blue-500', 'bg-blue-50');
    option.classList.add('border', 'border-gray-200');
    
    // 重置选项字母样式
    const letter = option.querySelector('div:first-child');
    if (letter) {
      letter.classList.remove('bg-blue-500', 'text-white');
      letter.classList.add('border-2', 'border-gray-300', 'text-gray-600');
    }
  });
  
  // 隐藏解析
  const analysisContainer = document.querySelector('.bg-blue-50.rounded-lg.p-4');
  if (analysisContainer) {
    analysisContainer.style.display = 'none';
  }
}

/**
 * 显示答案
 * @param {string} answer 用户的答案
 */
function showAnswer(answer) {
  const currentQuestion = currentExercise.questions[currentExercise.currentIndex];
  const options = document.querySelectorAll('.option');
  
  // 保存用户答案
  currentExercise.answers[currentQuestion.id] = answer;
  
  // 找到对应选项并设置为已选中
  options.forEach(option => {
    if (option.dataset.option === answer) {
      // 设置当前选中状态
      option.classList.remove('border', 'border-gray-200');
      option.classList.add('option-selected', 'border-2', 'border-blue-500', 'bg-blue-50');
      
      // 修改选项字母样式
      const letter = option.querySelector('div:first-child');
      if (letter) {
        letter.classList.remove('border-2', 'border-gray-300', 'text-gray-600');
        letter.classList.add('bg-blue-500', 'text-white');
      }
    }
  });
  
  // 显示答案解析
  setTimeout(() => {
    const analysisContainer = document.querySelector('.bg-blue-50.rounded-lg.p-4');
    if (analysisContainer) {
      analysisContainer.style.display = 'block';
      
      // 滚动到解析区域
      analysisContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, 500);
}

/**
 * 绑定练习页面事件
 */
function bindExerciseEvents() {
  // 选项点击事件
  document.addEventListener('click', function(event) {
    const option = event.target.closest('.option');
    if (option) {
      const answer = option.dataset.option;
      if (answer) {
        showAnswer(answer);
      }
    }
  });
  
  // 下一题按钮点击
  const nextButton = document.querySelector('a[href="#"].flex.items-center.justify-center.h-11.px-4.bg-blue-600');
  if (nextButton) {
    nextButton.addEventListener('click', function(event) {
      event.preventDefault();
      
      // 如果有下一题，则显示下一题
      if (currentExercise.currentIndex < currentExercise.questions.length - 1) {
        displayQuestion(currentExercise.currentIndex + 1);
        updateProgress();
      } else {
        // 否则显示练习完成消息
        alert('恭喜您，已完成所有题目！');
      }
    });
  }
  
  // 上一题按钮点击
  const prevButton = document.querySelector('a[href="#"].flex.items-center.justify-center.h-11.px-4.bg-gray-100');
  if (prevButton) {
    prevButton.addEventListener('click', function(event) {
      event.preventDefault();
      
      // 如果有上一题，则显示上一题
      if (currentExercise.currentIndex > 0) {
        displayQuestion(currentExercise.currentIndex - 1);
        updateProgress();
      }
    });
  }
  
  // 收藏按钮点击
  const favoriteBtn = document.getElementById('favoriteBtn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', function() {
      const iconEl = this.querySelector('.icon-star');
      
      if (iconEl.classList.contains('text-yellow-500')) {
        iconEl.classList.remove('text-yellow-500');
        iconEl.classList.add('text-gray-600');
        showToast('已取消收藏');
      } else {
        iconEl.classList.remove('text-gray-600');
        iconEl.classList.add('text-yellow-500');
        showToast('已收藏');
        
        // 添加动画效果
        iconEl.classList.add('activation-success');
        setTimeout(() => {
          iconEl.classList.remove('activation-success');
        }, 500);
      }
    });
  }
  
  // 错题本按钮点击
  const bookmarkBtn = document.getElementById('bookmarkBtn');
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', function() {
      const iconEl = this.querySelector('.icon-bookmark');
      
      if (iconEl.classList.contains('text-blue-600')) {
        iconEl.classList.remove('text-blue-600');
        iconEl.classList.add('text-gray-600');
        showToast('已从错题本移除');
      } else {
        iconEl.classList.remove('text-gray-600');
        iconEl.classList.add('text-blue-600');
        showToast('已加入错题本');
        
        // 添加动画效果
        iconEl.classList.add('activation-success');
        setTimeout(() => {
          iconEl.classList.remove('activation-success');
        }, 500);
      }
    });
  }
}

/**
 * 显示提示消息
 * @param {string} message 消息内容
 */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-16 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm bg-gray-800 z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // 添加动画
  toast.style.opacity = '0';
  toast.style.transform = 'translate(-50%, -20px)';
  toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  
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

// 当页面加载完成时初始化练习页面
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否在练习页面
  const exercisePage = document.querySelector('.progress-bar');
  if (exercisePage) {
    // 初始化练习页面
    initExercisePage();
  }
});

// 导出函数供其他脚本使用
window.exerciseLoader = {
  initExercisePage,
  displayQuestion,
  updateProgress,
  showAnswer
}; 