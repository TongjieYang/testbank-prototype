# 国网考试题库微信小程序 - 个人中心页面设计

个人中心页面是用户管理个人信息、查看学习数据和调整设置的核心入口，设计注重直观的数据展示和便捷的功能访问。页面采用Tailwind CSS构建，保持与整体小程序一致的设计风格。

## 页面结构

```html
<!-- 整体容器 -->
<view class="flex flex-col min-h-screen bg-gray-50">
  
  <!-- 顶部用户信息区域 -->
  <view class="bg-blue-600 pt-12 pb-6 px-4 text-white relative">
    <!-- 用户基本信息 -->
    <view class="flex items-center">
      <image class="w-16 h-16 rounded-full border-2 border-white" src="{{userInfo.avatarUrl || '/assets/default-avatar.png'}}" />
      <view class="ml-4">
        <text class="text-xl font-bold">{{userInfo.nickName || '未登录'}}</text>
        <view class="flex items-center mt-1">
          <view class="px-2 py-0.5 bg-blue-500 rounded-full text-xs flex items-center">
            <icon name="briefcase" size="12" class="mr-1" />
            <text>{{userInfo.company || '未设置单位'}}</text>
          </view>
        </view>
      </view>
      <view class="absolute right-4 top-12 bg-blue-500 rounded-full p-2">
        <icon name="cog" size="20" color="#ffffff" bind:tap="navigateToSettings" />
      </view>
    </view>
    
    <!-- 学习数据简览 -->
    <view class="flex justify-between mt-6">
      <view class="text-center">
        <text class="text-xl font-bold">{{totalStudyDays}}</text>
        <text class="block text-xs text-blue-100">学习天数</text>
      </view>
      <view class="text-center">
        <text class="text-xl font-bold">{{totalQuestions}}</text>
        <text class="block text-xs text-blue-100">完成题目</text>
      </view>
      <view class="text-center">
        <text class="text-xl font-bold">{{userLevel}}</text>
        <text class="block text-xs text-blue-100">学习等级</text>
      </view>
    </view>
  </view>
  
  <!-- 学习进度卡片 -->
  <view class="mx-4 -mt-4 bg-white rounded-xl shadow-md p-4 z-10">
    <view class="flex justify-between items-center mb-3">
      <text class="font-medium">学习进度</text>
      <view class="text-sm text-blue-600" bind:tap="navigateToReport">查看详情</view>
    </view>
    
    <!-- 进度图表 -->
    <view class="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
      <!-- 这里是学习进度图表，可使用ECharts等图表库实现 -->
      <image class="w-full h-full object-cover rounded-lg" src="https://source.unsplash.com/400x200/?chart,graph" />
    </view>
    
    <!-- 学习目标进度 -->
    <view class="mt-3">
      <view class="flex justify-between text-sm mb-1">
        <text class="text-gray-700">本周学习目标</text>
        <text class="text-gray-700">{{weeklyProgress}}%</text>
      </view>
      <view class="h-2 bg-gray-200 rounded-full">
        <view class="h-2 bg-blue-600 rounded-full" style="width: {{weeklyProgress}}%;"></view>
      </view>
    </view>
  </view>
  
  <!-- 功能模块区域 -->
  <view class="px-4 mt-5">
    <text class="font-bold mb-3 block">学习管理</text>
    
    <!-- 功能列表 -->
    <view class="bg-white rounded-xl overflow-hidden">
      <!-- 我的收藏 -->
      <view class="flex items-center p-4 border-b border-gray-100" bind:tap="navigateToFavorites">
        <view class="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center mr-3">
          <icon name="star" size="18" color="#F59E0B" />
        </view>
        <text class="flex-1 text-gray-700">我的收藏</text>
        <view class="flex items-center">
          <text class="text-sm text-gray-500 mr-2">{{favoritesCount}}题</text>
          <icon name="chevron-right" size="16" color="#9CA3AF" />
        </view>
      </view>
      
      <!-- 错题本 -->
      <view class="flex items-center p-4 border-b border-gray-100" bind:tap="navigateToWrongQuestions">
        <view class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3">
          <icon name="bookmark" size="18" color="#EF4444" />
        </view>
        <text class="flex-1 text-gray-700">错题本</text>
        <view class="flex items-center">
          <text class="text-sm text-gray-500 mr-2">{{wrongQuestionsCount}}题</text>
          <icon name="chevron-right" size="16" color="#9CA3AF" />
        </view>
      </view>
      
      <!-- 学习计划 -->
      <view class="flex items-center p-4 border-b border-gray-100" bind:tap="navigateToStudyPlan">
        <view class="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
          <icon name="calendar" size="18" color="#10B981" />
        </view>
        <text class="flex-1 text-gray-700">学习计划</text>
        <view class="flex items-center">
          <text class="text-sm text-gray-500 mr-2">{{hasActivePlan ? '进行中' : '未设置'}}</text>
          <icon name="chevron-right" size="16" color="#9CA3AF" />
        </view>
      </view>
      
      <!-- 学习报告 -->
      <view class="flex items-center p-4" bind:tap="navigateToStudyReport">
        <view class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
          <icon name="chart-bar" size="18" color="#8B5CF6" />
        </view>
        <text class="flex-1 text-gray-700">学习报告</text>
        <view class="flex items-center">
          <icon name="chevron-right" size="16" color="#9CA3AF" />
        </view>
      </view>
    </view>
  </view>
  
  <!-- 其他功能区域 -->
  <view class="px-4 mt-5">
    <text class="font-bold mb-3 block">其他功能</text>
    
    <view class="bg-white rounded-xl overflow-hidden">
      <!-- 消息通知 -->
      <view class="flex items-center p-4 border-b border-gray-100" bind:tap="navigateToNotifications">
        <view class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
          <icon name="bell" size="18" color="#3B82F6" />
        </view>
        <text class="flex-1 text-gray-700">消息通知</text>
        <view class="flex items-center">
          <view wx:if="{{hasUnreadMessages}}" class="w-2 h-2 rounded-full bg-red-500 mr-2"></view>
          <icon name="chevron-right" size="16" color="#9CA3AF" />
        </view>
      </view>
      
      <!-- 帮助中心 -->
      <view class="flex items-center p-4 border-b border-gray-100" bind:tap="navigateToHelp">
        <view class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
          <icon name="question-mark-circle" size="18" color="#6B7280" />
        </view>
        <text class="flex-1 text-gray-700">帮助与反馈</text>
        <view class="flex items-center">
          <icon name="chevron-right" size="16" color="#9CA3AF" />
        </view>
      </view>
      
      <!-- 设置 -->
      <view class="flex items-center p-4" bind:tap="navigateToSettings">
        <view class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
          <icon name="cog" size="18" color="#6B7280" />
        </view>
        <text class="flex-1 text-gray-700">设置</text>
        <view class="flex items-center">
          <icon name="chevron-right" size="16" color="#9CA3AF" />
        </view>
      </view>
    </view>
  </view>
  
  <!-- 学习成就展示 -->
  <view class="px-4 my-5">
    <view class="flex justify-between items-center mb-3">
      <text class="font-bold">学习成就</text>
      <view class="text-sm text-blue-600" bind:tap="navigateToAllAchievements">查看全部</view>
    </view>
    
    <!-- 成就卡片 -->
    <scroll-view scroll-x class="whitespace-nowrap -mx-4 px-4">
      <view class="inline-block mr-3 w-32 bg-white rounded-lg shadow-sm overflow-hidden p-3">
        <view class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
          <icon name="fire" size="24" color="#3B82F6" />
        </view>
        <text class="block text-center font-medium text-sm">连续学习</text>
        <text class="block text-center text-xs text-gray-500 mt-1">已坚持{{consecutiveDays}}天</text>
      </view>
      
      <view class="inline-block mr-3 w-32 bg-white rounded-lg shadow-sm overflow-hidden p-3">
        <view class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
          <icon name="academic-cap" size="24" color="#F59E0B" />
        </view>
        <text class="block text-center font-medium text-sm">电力达人</text>
        <text class="block text-center text-xs text-gray-500 mt-1">已解锁3/5</text>
      </view>
      
      <view class="inline-block mr-3 w-32 bg-white rounded-lg shadow-sm overflow-hidden p-3">
        <view class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
          <icon name="check-circle" size="24" color="#10B981" />
        </view>
        <text class="block text-center font-medium text-sm">答题能手</text>
        <text class="block text-center text-xs text-gray-500 mt-1">已答对{{correctAnswers}}题</text>
      </view>
      
      <view class="inline-block w-32 bg-white rounded-lg shadow-sm overflow-hidden p-3">
        <view class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
          <icon name="lock-closed" size="24" color="#9CA3AF" />
        </view>
        <text class="block text-center font-medium text-sm">待解锁</text>
        <text class="block text-center text-xs text-gray-500 mt-1">继续努力学习</text>
      </view>
    </scroll-view>
  </view>
  
  <!-- 底部版本信息 -->
  <view class="py-4 px-4 text-center">
    <text class="text-xs text-gray-400">国网考试题库 v{{appVersion}}</text>
  </view>
  
  <!-- 底部导航栏 -->
  <view class="fixed bottom-0 left-0 right-0 flex items-center justify-around bg-white shadow-lg px-5 py-3 border-t border-gray-200">
    <!-- 首页 -->
    <view class="flex flex-col items-center" bind:tap="navigateToHome">
      <view class="w-6 h-6 flex items-center justify-center text-gray-500">
        <icon name="home" />
      </view>
      <text class="text-xs mt-1 text-gray-500">首页</text>
    </view>
    
    <!-- 题库 -->
    <view class="flex flex-col items-center" bind:tap="navigateToLibrary">
      <view class="w-6 h-6 flex items-center justify-center text-gray-500">
        <icon name="book-open" />
      </view>
      <text class="text-xs mt-1 text-gray-500">题库</text>
    </view>
    
    <!-- 错题本 -->
    <view class="flex flex-col items-center" bind:tap="navigateToWrongQuestions">
      <view class="w-6 h-6 flex items-center justify-center text-gray-500">
        <icon name="bookmark" />
      </view>
      <text class="text-xs mt-1 text-gray-500">错题</text>
    </view>
    
    <!-- 我的 -->
    <view class="flex flex-col items-center">
      <view class="w-6 h-6 flex items-center justify-center text-blue-600">
        <icon name="user" />
      </view>
      <text class="text-xs mt-1 text-blue-600">我的</text>
    </view>
  </view>
</view>
```

## 设计说明

### 顶部用户信息区域
- 采用国网蓝作为背景色，突出品牌特性
- 用户头像、昵称和单位信息清晰展示
- 顶部位置突出，是页面视觉焦点
- 学习数据简览直观展示用户的学习成果

### 学习进度卡片
- 卡片式设计，与页面背景形成层次对比
- 图表可视化展示学习进度和趋势
- 进度条直观呈现周目标达成情况
- "查看详情"入口引导用户深入了解学习数据

### 功能模块布局
- 分类展示各功能模块，提升信息层次感
- 每个功能项配有图标、文字和操作入口
- 使用不同的图标颜色进行视觉区分
- 功能项右侧展示关键数据或状态信息

### 学习成就展示
- 横向滚动的成就卡片设计，节省空间同时展示更多信息
- 每个成就配有图标和进度说明
- 已解锁和未解锁成就有明显的视觉区分
- 激励用户持续学习，解锁更多成就

### 视觉设计风格
- 整体采用圆角设计，增强友好感
- 功能区块使用白色卡片，与背景形成对比
- 图标使用轻量的填充色背景，增强视觉层次
- 色彩方案与整体小程序保持一致

## 交互设计

### 导航交互
1. 点击底部导航栏可快速切换到对应功能页面
2. 功能列表项点击可进入对应的详情页面
3. "查看全部"和"查看详情"链接提供额外的导航入口

### 个人信息交互
1. 点击设置图标可直接进入设置页面
2. 用户头像区域支持点击查看/编辑个人信息

### 学习成就交互
1. 横向滑动可查看更多成就卡片
2. 点击成就卡片可查看详细的成就获取条件和进度

### 视觉反馈
1. 列表项点击时有轻微的背景色变化反馈
2. 未读消息使用红点标记提示用户关注
3. 功能图标使用与功能相关的颜色，提升识别度

## 设计亮点

1. **数据可视化**：使用图表和进度条直观展示学习数据
2. **模块化布局**：功能清晰分类，便于用户快速定位所需功能
3. **成就系统**：通过成就展示激励用户持续学习
4. **一致的设计语言**：色彩、圆角和卡片式设计与整体小程序保持一致
5. **信息层级**：通过颜色、大小和位置建立清晰的信息层级
6. **用户中心思维**：从用户需求出发，将高频功能放在显眼位置

## 适配与优化

- 使用相对单位和Flex布局确保在不同设备上的良好表现
- 顶部信息区域采用固定高度设计，保证视觉一致性
- 学习数据图表根据设备尺寸自适应调整
- 成就展示区域使用滚动视图，适应不同宽度的设备
- 边距和间距采用一致的系统，保证视觉舒适度 