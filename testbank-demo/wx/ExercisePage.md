# 国网考试题库微信小程序 - 练习页面设计

练习页面是用户进行答题的核心页面，设计追求清晰的题目展示、便捷的答题操作和即时的反馈效果。整个页面采用Tailwind CSS构建，在交互上注重用户体验。

## 页面结构

```html
<!-- 整体容器 -->
<view class="flex flex-col min-h-screen bg-gray-50 relative">
  
  <!-- 顶部导航栏 -->
  <view class="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
    <!-- 返回按钮 -->
    <view class="w-8 h-8 flex items-center justify-center" bind:tap="handleBack">
      <icon name="chevron-left" size="20" color="#374151" />
    </view>
    
    <!-- 标题与进度 -->
    <view class="flex flex-col items-center">
      <text class="font-medium text-gray-700">{{chapterName}}</text>
      <text class="text-xs text-gray-500 mt-0.5">{{currentQuestionIndex + 1}}/{{totalQuestions}}题</text>
    </view>
    
    <!-- 更多按钮 -->
    <view class="w-8 h-8 flex items-center justify-center" bind:tap="showMenu">
      <icon name="dots-vertical" size="20" color="#374151" />
    </view>
  </view>
  
  <!-- 进度指示器 -->
  <view class="h-1 bg-gray-200 w-full">
    <view class="h-1 bg-blue-600 transition-all duration-300 ease-out" style="width: {{(currentQuestionIndex + 1) / totalQuestions * 100}}%"></view>
  </view>
  
  <!-- 题目内容区域 -->
  <scroll-view scroll-y class="flex-1 px-4 py-4">
    <!-- 题目类型标签 -->
    <view class="inline-block px-2 py-0.5 bg-blue-100 rounded-full mb-3">
      <text class="text-xs text-blue-700">{{questionType}}</text>
    </view>
    
    <!-- 题干 -->
    <view class="text-base text-gray-800 mb-6">
      <text decode="{{true}}" user-select>{{currentQuestion.content}}</text>
    </view>
    
    <!-- 选项区域（单选题） -->
    <block wx:if="{{currentQuestion.type === 'single'}}">
      <view class="space-y-3 mb-6">
        <view 
          wx:for="{{currentQuestion.options}}" 
          wx:key="label"
          class="flex rounded-lg border {{selectedOption === item.label ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : (correctOption === item.label && showAnswer ? 'bg-green-50 border-green-200' : 'border-gray-200')}} p-3"
          bind:tap="selectOption"
          data-option="{{item.label}}"
        >
          <view class="flex items-center justify-center w-8 h-8 rounded-full {{selectedOption === item.label ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : (correctOption === item.label && showAnswer ? 'bg-green-500' : 'bg-gray-100')}} mr-3">
            <text class="font-medium {{selectedOption === item.label ? 'text-white' : (correctOption === item.label && showAnswer ? 'text-white' : 'text-gray-600')}}">{{item.label}}</text>
          </view>
          <view class="flex-1">
            <text class="text-gray-700">{{item.content}}</text>
          </view>
          <block wx:if="{{showAnswer && selectedOption === item.label}}">
            <view class="flex items-center justify-center">
              <icon name="{{isCorrect ? 'check' : 'x'}}" size="20" color="{{isCorrect ? '#10B981' : '#EF4444'}}" />
            </view>
          </block>
        </view>
      </view>
    </block>
    
    <!-- 选项区域（多选题） -->
    <block wx:elif="{{currentQuestion.type === 'multiple'}}">
      <view class="space-y-3 mb-6">
        <view 
          wx:for="{{currentQuestion.options}}" 
          wx:key="label"
          class="flex rounded-lg border {{selectedOptions.includes(item.label) ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}} p-3"
          bind:tap="toggleOption"
          data-option="{{item.label}}"
        >
          <view class="flex items-center justify-center w-8 h-8 rounded-lg {{selectedOptions.includes(item.label) ? 'bg-blue-500' : 'bg-gray-100'}} mr-3">
            <icon name="{{selectedOptions.includes(item.label) ? 'check' : ''}}" size="16" color="#FFFFFF" />
          </view>
          <view class="flex-1">
            <text class="text-gray-700">{{item.content}}</text>
          </view>
        </view>
      </view>
      
      <!-- 多选题提交按钮 -->
      <view wx:if="{{!showAnswer}}" class="mb-6">
        <button class="w-full py-3 bg-blue-600 text-white rounded-lg" bind:tap="submitMultipleAnswer">
          提交答案
        </button>
      </view>
      
      <!-- 多选题答案结果 -->
      <view wx:if="{{showAnswer}}" class="mb-6 p-4 rounded-lg {{isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}}">
        <view class="flex items-center mb-2">
          <icon name="{{isCorrect ? 'check-circle' : 'x-circle'}}" size="20" color="{{isCorrect ? '#10B981' : '#EF4444'}}" />
          <text class="ml-2 font-medium {{isCorrect ? 'text-green-700' : 'text-red-700'}}">
            {{isCorrect ? '回答正确' : '回答错误'}}
          </text>
        </view>
        <text class="text-gray-700">正确答案: {{correctOptions.join(', ')}}</text>
      </view>
    </block>
    
    <!-- 判断题 -->
    <block wx:elif="{{currentQuestion.type === 'judge'}}">
      <view class="flex space-x-4 mb-6">
        <view 
          class="flex-1 py-3 rounded-lg border {{selectedOption === 'T' ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'border-gray-200'}} flex items-center justify-center"
          bind:tap="selectOption"
          data-option="T"
        >
          <text class="font-medium {{selectedOption === 'T' ? (isCorrect ? 'text-green-700' : 'text-red-700') : 'text-gray-700'}}">正确</text>
        </view>
        <view 
          class="flex-1 py-3 rounded-lg border {{selectedOption === 'F' ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'border-gray-200'}} flex items-center justify-center"
          bind:tap="selectOption"
          data-option="F"
        >
          <text class="font-medium {{selectedOption === 'F' ? (isCorrect ? 'text-green-700' : 'text-red-700') : 'text-gray-700'}}">错误</text>
        </view>
      </view>
      
      <!-- 判断题答案结果 -->
      <view wx:if="{{showAnswer}}" class="mb-6 p-4 rounded-lg {{isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}}">
        <view class="flex items-center">
          <icon name="{{isCorrect ? 'check-circle' : 'x-circle'}}" size="20" color="{{isCorrect ? '#10B981' : '#EF4444'}}" />
          <text class="ml-2 {{isCorrect ? 'text-green-700' : 'text-red-700'}}">
            {{isCorrect ? '回答正确' : '回答错误，正确答案为' + (correctOption === 'T' ? '正确' : '错误')}}
          </text>
        </view>
      </view>
    </block>
    
    <!-- 解析区域 -->
    <block wx:if="{{showAnswer}}">
      <view class="mt-3 bg-white rounded-lg p-4 border border-gray-200">
        <view class="flex items-center mb-2">
          <icon name="annotation" size="18" color="#3B82F6" />
          <text class="font-medium text-gray-800 ml-2">解析</text>
        </view>
        <view class="text-gray-700">
          <text user-select>{{currentQuestion.explanation}}</text>
        </view>
        
        <!-- 知识点标签 -->
        <view class="mt-3 pt-3 border-t border-gray-100">
          <text class="text-xs text-gray-500 mb-2">相关知识点</text>
          <view class="flex flex-wrap gap-2 mt-1">
            <view wx:for="{{currentQuestion.knowledgePoints}}" wx:key="index" class="px-2 py-1 bg-blue-50 rounded-full">
              <text class="text-xs text-blue-600">{{item.name}}</text>
            </view>
          </view>
        </view>
      </view>
    </block>
  </scroll-view>
  
  <!-- 底部工具栏 -->
  <view class="border-t border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
    <view class="flex space-x-3">
      <!-- 收藏按钮 -->
      <view class="w-10 h-10 rounded-full flex items-center justify-center {{isCollected ? 'text-yellow-500' : 'text-gray-400'}}" bind:tap="toggleCollect">
        <icon name="{{isCollected ? 'star-solid' : 'star'}}" size="22" />
      </view>
      
      <!-- 笔记按钮 -->
      <view class="w-10 h-10 rounded-full flex items-center justify-center text-gray-400" bind:tap="showNoteEditor">
        <icon name="pencil" size="22" />
      </view>
    </view>
    
    <view class="flex space-x-3">
      <!-- 上一题按钮 -->
      <button 
        class="px-4 py-2 rounded-lg {{currentQuestionIndex > 0 ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-400'}}" 
        disabled="{{currentQuestionIndex <= 0}}"
        bind:tap="prevQuestion"
      >
        上一题
      </button>
      
      <!-- 下一题按钮 -->
      <button 
        class="px-4 py-2 rounded-lg {{showAnswer || currentQuestion.type === 'single' || currentQuestion.type === 'judge' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}}" 
        disabled="{{!showAnswer && currentQuestion.type !== 'single' && currentQuestion.type !== 'judge'}}"
        bind:tap="nextQuestion"
      >
        {{currentQuestionIndex >= totalQuestions - 1 ? '完成' : '下一题'}}
      </button>
    </view>
  </view>
  
  <!-- 答题结果反馈弹出层 -->
  <view wx:if="{{showFeedback}}" class="fixed inset-0 flex items-center justify-center z-30">
    <view class="absolute inset-0 bg-black bg-opacity-50" bind:tap="hideFeedback"></view>
    <view class="bg-white rounded-xl p-6 w-4/5 max-w-sm z-40 flex flex-col items-center">
      <icon name="{{isCorrect ? 'check-circle' : 'x-circle'}}" size="64" color="{{isCorrect ? '#10B981' : '#EF4444'}}" />
      <text class="text-xl font-bold mt-4 {{isCorrect ? 'text-green-600' : 'text-red-600'}}">
        {{isCorrect ? '答对了' : '答错了'}}
      </text>
      <text class="text-center text-gray-600 mt-2">
        {{isCorrect ? '太棒了，继续保持！' : '别灰心，下次会更好！'}}
      </text>
      <view class="mt-6 w-full">
        <button class="w-full py-3 rounded-lg {{isCorrect ? 'bg-green-600' : 'bg-red-600'}} text-white" bind:tap="hideFeedback">
          {{isCorrect ? '继续答题' : '查看解析'}}
        </button>
      </view>
    </view>
  </view>
  
  <!-- 题目导航抽屉 -->
  <view wx:if="{{showQuestionNav}}" class="fixed inset-0 flex z-40">
    <view class="absolute inset-0 bg-black bg-opacity-50" bind:tap="hideQuestionNav"></view>
    <view class="absolute right-0 top-0 bottom-0 w-3/4 bg-white z-50 flex flex-col">
      <view class="p-4 border-b border-gray-200 flex items-center justify-between">
        <text class="font-medium">题目导航</text>
        <view class="w-8 h-8 flex items-center justify-center" bind:tap="hideQuestionNav">
          <icon name="x" size="20" color="#374151" />
        </view>
      </view>
      <scroll-view scroll-y class="flex-1 p-4">
        <view class="flex flex-wrap gap-3">
          <view 
            wx:for="{{questionStatus}}" 
            wx:key="index"
            class="w-10 h-10 rounded-lg flex items-center justify-center {{item.isAnswered ? (item.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : item.index === currentQuestionIndex ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}}"
            bind:tap="jumpToQuestion"
            data-index="{{index}}"
          >
            <text>{{index + 1}}</text>
          </view>
        </view>
      </scroll-view>
      <view class="p-4 border-t border-gray-200">
        <view class="flex justify-between text-sm text-gray-500">
          <view class="flex items-center">
            <view class="w-4 h-4 rounded-sm bg-blue-500 mr-1"></view>
            <text>当前题</text>
          </view>
          <view class="flex items-center">
            <view class="w-4 h-4 rounded-sm bg-green-500 mr-1"></view>
            <text>答对</text>
          </view>
          <view class="flex items-center">
            <view class="w-4 h-4 rounded-sm bg-red-500 mr-1"></view>
            <text>答错</text>
          </view>
          <view class="flex items-center">
            <view class="w-4 h-4 rounded-sm bg-gray-100 mr-1"></view>
            <text>未答</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  
  <!-- 笔记编辑弹出层 -->
  <view wx:if="{{showNoteEditor}}" class="fixed inset-0 flex items-end z-30">
    <view class="absolute inset-0 bg-black bg-opacity-50" bind:tap="hideNoteEditor"></view>
    <view class="bg-white rounded-t-xl p-4 w-full z-40">
      <view class="flex items-center justify-between mb-3">
        <text class="font-medium">添加笔记</text>
        <view class="w-8 h-8 flex items-center justify-center" bind:tap="hideNoteEditor">
          <icon name="x" size="20" color="#374151" />
        </view>
      </view>
      <textarea value="{{currentNote}}" class="w-full p-3 border border-gray-200 rounded-lg h-32" placeholder="写下你的笔记..." bindinput="updateNote"></textarea>
      <view class="mt-3 flex justify-end">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg" bind:tap="saveNote">
          保存笔记
        </button>
      </view>
    </view>
  </view>
</view>
```

## 设计说明

### 顶部导航与进度
- 简洁的顶部导航栏，显示章节名称和当前进度
- 线性进度条直观展示答题进度
- 轻量化的边框和阴影，不抢占视觉焦点

### 题目展示区域
- 采用卡片式设计，突出题目内容
- 题型标签使用蓝色圆角标签，便于区分
- 题干文字采用适中大小，确保良好可读性
- 支持文本选择功能，便于用户复制内容

### 选项设计
- 根据题型展示不同的选项样式
  - 单选题：圆形选项标记
  - 多选题：方形复选框
  - 判断题：大按钮分离设计
- 选中状态有明显的视觉反馈
- 答题后的状态标识清晰：正确(绿色)、错误(红色)

### 答题反馈
- 答题后立即展示正确答案和用户的答案
- 使用颜色和图标增强视觉反馈
- 错误提示友好，不刺激用户
- 可选的弹窗式反馈，增强成就感

### 解析区域
- 独立卡片式设计，突出重要性
- 清晰的标题和分隔，易于阅读
- 相关知识点以标签形式展示，支持跳转
- 支持文本选择功能，便于用户复制内容

### 底部工具栏
- 固定在屏幕底部，主要功能触手可及
- 收藏和笔记功能便于个人学习管理
- 上一题/下一题按钮设计符合操作习惯
- 按钮状态变化明确指示可用性

### 辅助功能
- 题目导航抽屉：快速跳转到任意题目
- 笔记编辑弹层：随时记录学习心得
- 使用遮罩层增强层级感，聚焦用户注意力

## 交互设计

### 答题流程
1. 用户进入练习页面，顶部显示当前所在章节和题目进度
2. 展示题干和选项，用户可通过点击选择答案
   - 单选题/判断题：点击即提交答案
   - 多选题：需点击提交按钮确认
3. 提交答案后，立即显示正确与否的反馈
4. 显示解析内容和相关知识点
5. 用户可通过底部按钮进入下一题

### 额外功能交互
- **收藏功能**：点击星形图标即可收藏/取消收藏
- **笔记功能**：
  1. 点击笔记图标弹出笔记编辑器
  2. 输入笔记内容
  3. 点击保存按钮保存笔记
- **题目导航**：
  1. 点击顶部"更多"按钮展开题目导航
  2. 题目导航显示所有题目状态（当前题/已答对/已答错/未答）
  3. 点击任意题号可直接跳转
- **手势操作**：支持左右滑动切换上一题/下一题

## 设计亮点

1. **自适应布局**：使用Flex布局保证在不同尺寸设备上的良好表现
2. **状态清晰**：通过颜色、图标和动效清晰传达交互状态
3. **视觉层级**：主次分明的布局设计，引导用户关注重点内容
4. **交互反馈**：丰富的视觉反馈，增强用户操作的确定感
5. **细节优化**：如可选择文本、知识点标签化等提升学习效率的细节
6. **情绪关怀**：答题反馈中注重情绪化设计，鼓励用户持续学习

## 适配说明

- 设计考虑了不同尺寸手机屏幕的适配
- 字体大小采用相对单位，支持系统字体大小调整
- 关键操作区域大小适中，便于手指点击
- 内容超出时支持滚动查看，避免信息丢失 