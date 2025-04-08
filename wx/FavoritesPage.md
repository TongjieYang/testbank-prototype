# 国网考试题库微信小程序 - 收藏题目页面设计

收藏题目页面是用户保存和管理重要题目的功能入口，设计注重内容分类、快速检索和便捷复习。页面采用Tailwind CSS构建，与整体小程序保持一致的视觉风格。

## 页面结构

```html
<!-- 整体容器 -->
<view class="flex flex-col min-h-screen bg-gray-50">
  
  <!-- 顶部导航栏 -->
  <view class="bg-blue-600 text-white">
    <view class="flex items-center justify-between px-4 pt-10 pb-4">
      <text class="text-xl font-bold">我的收藏</text>
      <view class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
        <icon name="search" size="18" color="#ffffff" />
      </view>
    </view>
  </view>
  
  <!-- 收藏统计卡片 -->
  <view class="mx-4 -mt-4 bg-white rounded-xl shadow-md p-4 z-10">
    <view class="flex justify-between items-center mb-3">
      <text class="font-medium">收藏统计</text>
      <view class="px-2 py-1 bg-yellow-100 rounded-full">
        <text class="text-xs text-yellow-600">共{{totalFavorites}}题</text>
      </view>
    </view>
    
    <!-- 收藏题目分布 -->
    <view class="grid grid-cols-2 gap-3">
      <view class="rounded-lg overflow-hidden">
        <view class="aspect-square bg-blue-50 flex flex-col items-center justify-center relative">
          <view class="absolute top-0 left-0 right-0 bg-blue-100 py-1 px-2">
            <text class="text-xs text-blue-700">按题型</text>
          </view>
          <!-- 这里是饼图，可使用ECharts等图表库实现 -->
          <view class="w-24 h-24 mt-4">
            <image class="w-full h-full" src="https://source.unsplash.com/200x200/?chart,pie" />
          </view>
          <view class="grid grid-cols-2 gap-1 w-full px-2 mt-1">
            <view class="flex items-center">
              <view class="w-2 h-2 rounded-full bg-blue-500 mr-1"></view>
              <text class="text-xs text-gray-600">单选题</text>
            </view>
            <view class="flex items-center">
              <view class="w-2 h-2 rounded-full bg-green-500 mr-1"></view>
              <text class="text-xs text-gray-600">多选题</text>
            </view>
            <view class="flex items-center">
              <view class="w-2 h-2 rounded-full bg-yellow-500 mr-1"></view>
              <text class="text-xs text-gray-600">判断题</text>
            </view>
            <view class="flex items-center">
              <view class="w-2 h-2 rounded-full bg-purple-500 mr-1"></view>
              <text class="text-xs text-gray-600">其他</text>
            </view>
          </view>
        </view>
      </view>
      
      <view class="rounded-lg overflow-hidden">
        <view class="aspect-square bg-yellow-50 flex flex-col items-center justify-center relative">
          <view class="absolute top-0 left-0 right-0 bg-yellow-100 py-1 px-2">
            <text class="text-xs text-yellow-700">按难度</text>
          </view>
          <!-- 这里是条形图，可使用ECharts等图表库实现 -->
          <view class="w-24 h-24 mt-4">
            <image class="w-full h-full" src="https://source.unsplash.com/200x200/?chart,bar" />
          </view>
          <view class="w-full px-2 mt-1">
            <view class="flex items-center justify-between">
              <view class="flex items-center">
                <view class="w-2 h-2 rounded-full bg-green-500 mr-1"></view>
                <text class="text-xs text-gray-600">简单</text>
              </view>
              <text class="text-xs text-gray-600">{{easyCount}}题</text>
            </view>
            <view class="flex items-center justify-between">
              <view class="flex items-center">
                <view class="w-2 h-2 rounded-full bg-yellow-500 mr-1"></view>
                <text class="text-xs text-gray-600">中等</text>
              </view>
              <text class="text-xs text-gray-600">{{mediumCount}}题</text>
            </view>
            <view class="flex items-center justify-between">
              <view class="flex items-center">
                <view class="w-2 h-2 rounded-full bg-red-500 mr-1"></view>
                <text class="text-xs text-gray-600">困难</text>
              </view>
              <text class="text-xs text-gray-600">{{hardCount}}题</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  
  <!-- 筛选与排序栏 -->
  <view class="px-4 py-4">
    <!-- 分类标签栏 -->
    <view class="flex space-x-3 mb-3 overflow-x-auto whitespace-nowrap -mx-4 px-4">
      <view class="px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm">
        全部收藏
      </view>
      <view class="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm border border-gray-200">
        电力系统
      </view>
      <view class="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm border border-gray-200">
        配电技术
      </view>
      <view class="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm border border-gray-200">
        安全管理
      </view>
      <view class="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm border border-gray-200">
        有标注
      </view>
    </view>
    
    <!-- 排序与筛选选项 -->
    <view class="flex justify-between items-center mb-4">
      <view class="flex space-x-2">
        <view class="px-2 py-1 bg-white rounded-lg border border-gray-200 flex items-center text-sm text-gray-600">
          <text>收藏时间</text>
          <icon name="chevron-down" size="16" color="#6B7280" class="ml-1" />
        </view>
        <view class="px-2 py-1 bg-white rounded-lg border border-gray-200 flex items-center text-sm text-gray-600">
          <text>题型</text>
          <icon name="chevron-down" size="16" color="#6B7280" class="ml-1" />
        </view>
      </view>
      
      <!-- 布局切换按钮 -->
      <view class="flex space-x-1 bg-gray-100 rounded-lg p-0.5">
        <view class="p-1 bg-white rounded" bind:tap="switchToCardView">
          <icon name="template" size="16" color="#3B82F6" />
        </view>
        <view class="p-1" bind:tap="switchToListView">
          <icon name="menu" size="16" color="#9CA3AF" />
        </view>
      </view>
    </view>
  </view>
  
  <!-- 收藏题目列表 -->
  <view class="px-4 pb-24">
    <view class="space-y-4">
      <!-- 收藏题目卡片1 -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- 题目标题栏 -->
        <view class="p-3 border-b border-gray-100 flex justify-between items-center">
          <view class="flex items-center">
            <view class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <text class="text-xs text-red-600">单</text>
            </view>
            <text class="font-medium text-gray-800">电力系统稳定性分析</text>
          </view>
          <view class="flex items-center space-x-2">
            <view class="px-2 py-0.5 bg-yellow-100 rounded-full">
              <text class="text-xs text-yellow-600">重点</text>
            </view>
            <icon name="chevron-right" size="16" color="#9CA3AF" />
          </view>
        </view>
        
        <!-- 题目内容预览 -->
        <view class="p-3">
          <text class="text-gray-700 text-sm line-clamp-2">在电力系统中，发电机转子失步的主要原因是什么？</text>
          
          <!-- 标签区域 -->
          <view class="flex flex-wrap gap-2 mt-2">
            <view class="px-2 py-0.5 bg-blue-50 rounded-full">
              <text class="text-xs text-blue-600">电力系统</text>
            </view>
            <view class="px-2 py-0.5 bg-gray-100 rounded-full">
              <text class="text-xs text-gray-600">稳定性</text>
            </view>
            <view class="px-2 py-0.5 bg-yellow-50 rounded-full">
              <text class="text-xs text-yellow-600">核心考点</text>
            </view>
          </view>
          
          <!-- 收藏信息 -->
          <view class="mt-2 flex justify-between items-center">
            <text class="text-xs text-gray-500">收藏于: 2024-03-15</text>
            <view class="flex space-x-2">
              <view class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <icon name="pencil" size="14" color="#6B7280" />
              </view>
              <view class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <icon name="book-open" size="14" color="#3B82F6" />
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 收藏题目卡片2 -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- 题目标题栏 -->
        <view class="p-3 border-b border-gray-100 flex justify-between items-center">
          <view class="flex items-center">
            <view class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <text class="text-xs text-green-600">多</text>
            </view>
            <text class="font-medium text-gray-800">变压器并列运行条件</text>
          </view>
          <view class="flex items-center">
            <icon name="chevron-right" size="16" color="#9CA3AF" />
          </view>
        </view>
        
        <!-- 题目内容预览 -->
        <view class="p-3">
          <text class="text-gray-700 text-sm line-clamp-2">变压器并列运行必须满足以下哪些条件？</text>
          
          <!-- 标签区域 -->
          <view class="flex flex-wrap gap-2 mt-2">
            <view class="px-2 py-0.5 bg-blue-50 rounded-full">
              <text class="text-xs text-blue-600">电气设备</text>
            </view>
            <view class="px-2 py-0.5 bg-gray-100 rounded-full">
              <text class="text-xs text-gray-600">变压器</text>
            </view>
          </view>
          
          <!-- 收藏信息 -->
          <view class="mt-2 flex justify-between items-center">
            <text class="text-xs text-gray-500">收藏于: 2024-04-02</text>
            <view class="flex space-x-2">
              <view class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <icon name="pencil" size="14" color="#6B7280" />
              </view>
              <view class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <icon name="book-open" size="14" color="#3B82F6" />
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 收藏题目卡片3 (带笔记) -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- 题目标题栏 -->
        <view class="p-3 border-b border-gray-100 flex justify-between items-center">
          <view class="flex items-center">
            <view class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <text class="text-xs text-blue-600">判</text>
            </view>
            <text class="font-medium text-gray-800">安全操作规程</text>
          </view>
          <view class="flex items-center space-x-2">
            <view class="px-2 py-0.5 bg-purple-100 rounded-full">
              <text class="text-xs text-purple-600">有笔记</text>
            </view>
            <icon name="chevron-right" size="16" color="#9CA3AF" />
          </view>
        </view>
        
        <!-- 题目内容预览 -->
        <view class="p-3">
          <text class="text-gray-700 text-sm line-clamp-2">在进行带电作业时，可以不穿绝缘手套，只需要使用绝缘工具。</text>
          
          <!-- 标签区域 -->
          <view class="flex flex-wrap gap-2 mt-2">
            <view class="px-2 py-0.5 bg-yellow-50 rounded-full">
              <text class="text-xs text-yellow-600">安全管理</text>
            </view>
            <view class="px-2 py-0.5 bg-red-50 rounded-full">
              <text class="text-xs text-red-600">易错点</text>
            </view>
          </view>
          
          <!-- 笔记预览 -->
          <view class="mt-2 p-2 bg-purple-50 rounded-lg">
            <view class="flex items-start">
              <icon name="annotation" size="14" color="#8B5CF6" class="mt-0.5 mr-1 flex-shrink-0" />
              <text class="text-xs text-purple-700 line-clamp-2">记住：带电作业必须同时使用绝缘手套和绝缘工具，缺一不可。这在2023年考试中经常出现。</text>
            </view>
          </view>
          
          <!-- 收藏信息 -->
          <view class="mt-2 flex justify-between items-center">
            <text class="text-xs text-gray-500">收藏于: 2024-04-05</text>
            <view class="flex space-x-2">
              <view class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <icon name="pencil" size="14" color="#6B7280" />
              </view>
              <view class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <icon name="book-open" size="14" color="#3B82F6" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  
  <!-- 批量操作工具栏 -->
  <view class="fixed bottom-16 inset-x-0 mx-auto w-11/12 bg-white rounded-full shadow-xl py-2 px-4 flex items-center justify-between max-w-md opacity-90">
    <view class="flex items-center">
      <view class="w-6 h-6 rounded-full border-2 border-gray-300 mr-2"></view>
      <text class="text-gray-700">全选</text>
    </view>
    
    <view class="flex space-x-2">
      <view class="px-3 py-1.5 bg-white border border-gray-200 rounded-full flex items-center">
        <icon name="folder-remove" size="14" color="#6B7280" class="mr-1" />
        <text class="text-sm text-gray-600">取消收藏</text>
      </view>
      <view class="px-3 py-1.5 bg-blue-600 text-white rounded-full flex items-center">
        <icon name="play" size="14" color="#ffffff" class="mr-1" />
        <text class="text-sm">练习</text>
      </view>
    </view>
  </view>
  
  <!-- 空状态展示 -->
  <view wx:if="{{favorites.length === 0}}" class="flex flex-col items-center justify-center py-12 px-4" style="display: none;">
    <image class="w-32 h-32 mb-4" src="/assets/images/empty-favorites.png" />
    <text class="text-gray-700 font-medium mb-2">暂无收藏题目</text>
    <text class="text-gray-500 text-sm text-center mb-6">在做题过程中点击星标图标，将重要题目收藏起来吧</text>
    <button class="bg-blue-600 text-white py-2 px-6 rounded-full text-sm" bind:tap="navigateToLibrary">
      去刷题
    </button>
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
    <view class="flex flex-col items-center" bind:tap="navigateToPersonal">
      <view class="w-6 h-6 flex items-center justify-center text-gray-500">
        <icon name="user" />
      </view>
      <text class="text-xs mt-1 text-gray-500">我的</text>
    </view>
  </view>
  
  <!-- 弹出菜单 -->
  <view wx:if="{{showMenu}}" class="fixed inset-0 flex items-end z-30">
    <view class="absolute inset-0 bg-black bg-opacity-50" bind:tap="hideMenu"></view>
    <view class="bg-white rounded-t-xl w-full p-4 z-40">
      <view class="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></view>
      
      <view class="space-y-3">
        <view class="flex items-center p-3" bind:tap="startPractice">
          <icon name="play" size="20" color="#3B82F6" class="mr-3" />
          <text class="text-gray-800">开始练习</text>
        </view>
        <view class="flex items-center p-3" bind:tap="addTags">
          <icon name="tag" size="20" color="#3B82F6" class="mr-3" />
          <text class="text-gray-800">添加标签</text>
        </view>
        <view class="flex items-center p-3" bind:tap="exportFavorites">
          <icon name="download" size="20" color="#3B82F6" class="mr-3" />
          <text class="text-gray-800">导出收藏</text>
        </view>
        <view class="flex items-center p-3" bind:tap="batchOperation">
          <icon name="collection" size="20" color="#3B82F6" class="mr-3" />
          <text class="text-gray-800">批量操作</text>
        </view>
        <view class="border-t border-gray-100 mt-2 pt-2">
          <view class="flex items-center p-3 text-red-600" bind:tap="clearAllFavorites">
            <icon name="trash" size="20" color="#EF4444" class="mr-3" />
            <text>清空收藏夹</text>
          </view>
        </view>
      </view>
      
      <view class="mt-3">
        <button class="w-full py-3 bg-gray-100 text-gray-700 rounded-lg" bind:tap="hideMenu">
          取消
        </button>
      </view>
    </view>
  </view>
</view>
```

## 设计说明

### 顶部区域设计
- 采用国网蓝作为背景色，与整体小程序风格统一
- 明确的"我的收藏"标题，便于用户理解当前页面
- 搜索按钮便于快速查找特定收藏题目

### 收藏统计可视化
- 采用并排的双卡片布局，高效利用屏幕空间
- 按题型和难度分别进行数据可视化，提供多维度分析
- 使用饼图和条形图直观展示收藏题目的分布情况
- 图表下方提供简洁的数据图例，帮助用户理解

### 筛选与排序功能
- 顶部标签栏支持按分类快速筛选收藏题目
- 排序选项支持按收藏时间、题型等多维度排序
- 布局切换按钮允许用户在卡片视图和列表视图间切换
- 筛选区域固定，便于用户随时调整查看方式

### 收藏题目卡片设计
- 题目卡片包含题型标识、科目分类和重要度标签
- 简洁预览题目内容，点击可查看详情
- 知识点和特性标签使用不同颜色区分
- 显示收藏时间，帮助用户了解时间脉络
- 笔记预览区使用紫色底色，突出用户的个人笔记内容

### 批量操作工具栏
- 悬浮设计，不占用内容空间
- 支持全选、批量取消收藏和批量练习等操作
- 圆角设计与半透明效果提升视觉美感

### 空状态设计
- 当无收藏题目时，展示友好的空状态提示
- 配图+文字说明+行动按钮的组合设计
- 引导用户去题库中收藏重要题目

## 交互设计

### 题目筛选交互
1. 用户可通过顶部标签栏快速切换不同分类的收藏题目
2. 点击排序按钮可展开更多排序选项
3. 可通过布局切换按钮更改收藏题目的展示方式

### 题目操作交互
1. 点击单个题目卡片进入题目详情页
2. 点击"练习"图标直接开始该题的练习
3. 点击"笔记"图标可编辑或查看笔记
4. 长按题目卡片可进入多选模式

### 批量操作交互
1. 进入多选模式后，底部显示批量操作工具栏
2. 点击"全选"可选择当前筛选条件下的所有收藏题目
3. 选择完成后可进行批量取消收藏或批量练习

### 弹出菜单交互
1. 菜单提供更多高级功能入口
2. 点击蒙层或下滑手势关闭菜单
3. 危险操作（如清空收藏夹）放置在菜单底部，并使用警示色

## 设计亮点

1. **数据可视化**：使用图表直观展示收藏题目的分布情况
2. **标签系统**：通过颜色编码和标签分类，帮助用户快速识别题目特性
3. **笔记突显**：使用独特的视觉设计突出用户添加的个人笔记
4. **多视图支持**：支持卡片和列表两种展示方式，满足不同用户习惯
5. **空状态设计**：考虑无内容场景，提供友好的引导
6. **批量操作**：提供高效的批量管理功能，提升用户体验

## 适配与优化

- 使用Flex和Grid布局确保在不同设备上的良好表现
- 统计图表采用等比例设计，适配不同尺寸的屏幕
- 卡片内容采用行数限制，避免不同长度内容导致的视觉不一致
- 批量操作工具栏自动适应屏幕宽度
- 标签栏支持横向滚动，适应各种长度的标签内容 