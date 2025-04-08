# 国网考试题库微信小程序 - 错题本页面设计

错题本是帮助用户集中复习错误题目的重要功能，设计注重分类展示、数据分析和高效复习。页面采用Tailwind CSS构建，UI风格与整体小程序保持一致。

## 页面结构

```html
<!-- 整体容器 -->
<view class="flex flex-col min-h-screen bg-gray-50">
  
  <!-- 顶部导航栏 -->
  <view class="bg-blue-600 text-white">
    <view class="flex items-center justify-between px-4 pt-10 pb-4">
      <text class="text-xl font-bold">错题本</text>
      <view class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
        <icon name="search" size="18" color="#ffffff" />
      </view>
    </view>
  </view>
  
  <!-- 错题统计卡片 -->
  <view class="mx-4 -mt-4 bg-white rounded-xl shadow-md p-4 z-10">
    <view class="flex justify-between items-center mb-3">
      <text class="font-medium">错题统计</text>
      <view class="px-2 py-1 bg-blue-100 rounded-full">
        <text class="text-xs text-blue-600">共{{totalWrongQuestions}}题</text>
      </view>
    </view>
    
    <!-- 错题分布饼图 -->
    <view class="aspect-video bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
      <!-- 这里是饼图区域，使用ECharts等图表库实现 -->
      <image class="w-full h-full" src="https://source.unsplash.com/400x200/?chart,pie" />
    </view>
    
    <!-- 错题分布数据 -->
    <view class="grid grid-cols-3 gap-2 text-center">
      <view class="p-2 bg-blue-50 rounded-lg">
        <text class="text-xs text-gray-500">电力系统</text>
        <text class="block text-blue-600 font-medium mt-1">{{category1Count}}题</text>
      </view>
      <view class="p-2 bg-green-50 rounded-lg">
        <text class="text-xs text-gray-500">配电技术</text>
        <text class="block text-green-600 font-medium mt-1">{{category2Count}}题</text>
      </view>
      <view class="p-2 bg-yellow-50 rounded-lg">
        <text class="text-xs text-gray-500">安全管理</text>
        <text class="block text-yellow-600 font-medium mt-1">{{category3Count}}题</text>
      </view>
    </view>
  </view>
  
  <!-- 筛选栏 -->
  <view class="px-4 py-4">
    <view class="flex space-x-3 mb-3 overflow-x-auto whitespace-nowrap -mx-4 px-4">
      <view class="px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm">
        全部
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
        电气设备
      </view>
    </view>
    
    <!-- 排序筛选 -->
    <view class="flex justify-between mb-4">
      <view class="flex space-x-2">
        <view class="px-2 py-1 bg-white rounded-lg border border-gray-200 flex items-center text-sm text-gray-600">
          <text>难度</text>
          <icon name="chevron-down" size="16" color="#6B7280" class="ml-1" />
        </view>
        <view class="px-2 py-1 bg-white rounded-lg border border-gray-200 flex items-center text-sm text-gray-600">
          <text>时间</text>
          <icon name="chevron-down" size="16" color="#6B7280" class="ml-1" />
        </view>
      </view>
      <view class="flex items-center text-sm text-gray-600">
        <icon name="filter" size="16" color="#6B7280" class="mr-1" />
        <text>筛选</text>
      </view>
    </view>
  </view>
  
  <!-- 错题列表 -->
  <view class="px-4 pb-24">
    <view class="space-y-4">
      <!-- 错题卡片1 -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- 错题标题栏 -->
        <view class="p-3 border-b border-gray-100 flex justify-between items-center">
          <view class="flex items-center">
            <view class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
              <text class="text-xs text-red-600">单</text>
            </view>
            <text class="font-medium text-gray-800">电力系统稳定性分析</text>
          </view>
          <view class="flex items-center">
            <view class="px-2 py-0.5 bg-red-100 rounded-full mr-2">
              <text class="text-xs text-red-600">错3次</text>
            </view>
            <icon name="chevron-right" size="16" color="#9CA3AF" />
          </view>
        </view>
        
        <!-- 错题内容预览 -->
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
          
          <!-- 错误时间 -->
          <view class="mt-2 flex justify-between items-center">
            <text class="text-xs text-gray-500">最近错误: 昨天 14:30</text>
            <view class="flex space-x-2">
              <view class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <icon name="trash" size="14" color="#6B7280" />
              </view>
              <view class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <icon name="book-open" size="14" color="#3B82F6" />
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 错题卡片2 -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- 错题标题栏 -->
        <view class="p-3 border-b border-gray-100 flex justify-between items-center">
          <view class="flex items-center">
            <view class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <text class="text-xs text-green-600">多</text>
            </view>
            <text class="font-medium text-gray-800">配电网络保护装置</text>
          </view>
          <view class="flex items-center">
            <view class="px-2 py-0.5 bg-red-100 rounded-full mr-2">
              <text class="text-xs text-red-600">错1次</text>
            </view>
            <icon name="chevron-right" size="16" color="#9CA3AF" />
          </view>
        </view>
        
        <!-- 错题内容预览 -->
        <view class="p-3">
          <text class="text-gray-700 text-sm line-clamp-2">以下哪些属于配电网络中常用的保护装置？</text>
          
          <!-- 标签区域 -->
          <view class="flex flex-wrap gap-2 mt-2">
            <view class="px-2 py-0.5 bg-green-50 rounded-full">
              <text class="text-xs text-green-600">配电技术</text>
            </view>
            <view class="px-2 py-0.5 bg-gray-100 rounded-full">
              <text class="text-xs text-gray-600">保护装置</text>
            </view>
          </view>
          
          <!-- 错误时间 -->
          <view class="mt-2 flex justify-between items-center">
            <text class="text-xs text-gray-500">最近错误: 3天前</text>
            <view class="flex space-x-2">
              <view class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <icon name="trash" size="14" color="#6B7280" />
              </view>
              <view class="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <icon name="book-open" size="14" color="#3B82F6" />
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 错题卡片3 -->
      <view class="bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- 错题标题栏 -->
        <view class="p-3 border-b border-gray-100 flex justify-between items-center">
          <view class="flex items-center">
            <view class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <text class="text-xs text-blue-600">判</text>
            </view>
            <text class="font-medium text-gray-800">安全操作规程</text>
          </view>
          <view class="flex items-center">
            <view class="px-2 py-0.5 bg-red-100 rounded-full mr-2">
              <text class="text-xs text-red-600">错2次</text>
            </view>
            <icon name="chevron-right" size="16" color="#9CA3AF" />
          </view>
        </view>
        
        <!-- 错题内容预览 -->
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
          
          <!-- 错误时间 -->
          <view class="mt-2 flex justify-between items-center">
            <text class="text-xs text-gray-500">最近错误: 今天 09:15</text>
            <view class="flex space-x-2">
              <view class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                <icon name="trash" size="14" color="#6B7280" />
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
        <icon name="trash" size="14" color="#6B7280" class="mr-1" />
        <text class="text-sm text-gray-600">删除</text>
      </view>
      <view class="px-3 py-1.5 bg-blue-600 text-white rounded-full flex items-center">
        <icon name="book-open" size="14" color="#ffffff" class="mr-1" />
        <text class="text-sm">练习</text>
      </view>
    </view>
  </view>
  
  <!-- 底部导航栏 -->
  <view class="fixed bottom-0 left-0 right-0 flex items-center justify-around bg-white shadow-lg px-5 py-3 border-t border-gray-200">
    <!-- 首页 -->
    <view class="flex flex-col items-center">
      <view class="w-6 h-6 flex items-center justify-center text-gray-500">
        <icon name="home" />
      </view>
      <text class="text-xs mt-1 text-gray-500">首页</text>
    </view>
    
    <!-- 题库 -->
    <view class="flex flex-col items-center">
      <view class="w-6 h-6 flex items-center justify-center text-gray-500">
        <icon name="book-open" />
      </view>
      <text class="text-xs mt-1 text-gray-500">题库</text>
    </view>
    
    <!-- 错题本 -->
    <view class="flex flex-col items-center">
      <view class="w-6 h-6 flex items-center justify-center text-blue-600">
        <icon name="bookmark" />
      </view>
      <text class="text-xs mt-1 text-blue-600">错题</text>
    </view>
    
    <!-- 我的 -->
    <view class="flex flex-col items-center">
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
        <view class="flex items-center p-3">
          <icon name="play" size="20" color="#3B82F6" class="mr-3" />
          <text class="text-gray-800">开始练习</text>
        </view>
        <view class="flex items-center p-3">
          <icon name="filter" size="20" color="#3B82F6" class="mr-3" />
          <text class="text-gray-800">按知识点筛选</text>
        </view>
        <view class="flex items-center p-3">
          <icon name="download" size="20" color="#3B82F6" class="mr-3" />
          <text class="text-gray-800">导出错题</text>
        </view>
        <view class="flex items-center p-3">
          <icon name="trash" size="20" color="#EF4444" class="mr-3" />
          <text class="text-red-600">清空错题本</text>
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
- 采用国网蓝色调的顶部栏，突出"错题本"主题
- 搜索按钮便于快速查找特定错题
- 错题统计卡片显示关键数据，包括总数和分类分布

### 错题统计可视化
- 饼图直观展示错题在不同知识领域的分布
- 分类统计卡片使用不同颜色区分主要知识领域
- 数据一目了然，帮助用户了解自身弱点

### 筛选与排序功能
- 顶部标签栏支持按知识领域快速筛选
- 排序功能支持按难度、时间等多维度排序
- 筛选按钮提供更多高级筛选选项

### 错题卡片设计
- 每张卡片包含题型标识、所属章节、错误次数等核心信息
- 简洁预览题目内容，点击可查看详情
- 知识点和特性标签使用不同颜色区分
- 显示最近错误时间，帮助记忆复习周期
- 快捷操作按钮方便删除和练习

### 批量操作工具栏
- 悬浮设计，不占用内容空间
- 圆角设计与半透明效果提升视觉美感
- 支持全选、批量删除和批量练习等操作

### 底部操作菜单
- 底部弹出式设计，遵循微信小程序交互规范
- 提供常用功能入口，如开始练习、筛选等
- 危险操作（如清空错题本）使用警示色强调

## 交互设计

### 错题筛选交互
1. 用户可通过顶部标签栏快速切换不同知识领域
2. 点击排序/筛选按钮可展开更多筛选选项
3. 筛选结果即时更新，无需加载页面

### 错题操作交互
1. 点击单个错题卡片进入详情页面
2. 点击练习图标直接开始该题的练习
3. 点击删除图标可移除该错题（带确认提示）
4. 长按卡片可进入多选模式

### 批量操作交互
1. 进入多选模式后，底部显示批量操作工具栏
2. 点击"全选"可选择当前筛选条件下的所有错题
3. 选择完成后可进行批量删除或练习操作

### 底部菜单交互
1. 上滑手势或点击菜单按钮打开底部菜单
2. 菜单提供更多高级功能入口
3. 点击蒙层或下滑手势关闭菜单

## 设计亮点

1. **数据可视化**：利用饼图直观展示错题分布，帮助用户了解自身弱点
2. **分类系统**：通过颜色编码和标签系统，清晰区分不同题型和知识点
3. **操作便捷性**：单题操作和批量操作并存，满足不同使用场景
4. **信息层级**：通过卡片式设计和空间划分，营造清晰的信息层级
5. **视觉一致性**：与整体小程序设计风格保持一致，色彩和组件复用
6. **交互流畅性**：考虑常见使用场景，设计直观的交互路径

## 适配与优化

- 使用Flex和Grid布局确保在不同屏幕尺寸下的良好表现
- 错题列表采用虚拟滚动技术，优化大量错题时的性能
- 统计图表根据屏幕尺寸自适应调整
- 批量操作工具栏自动适应屏幕宽度
- 暗色模式支持，提升不同光线环境下的使用体验