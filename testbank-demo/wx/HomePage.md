# 国网考试题库微信小程序 - 首页设计

首页是用户进入小程序的第一个页面，设计以简洁、直观为原则，采用Tailwind CSS构建，图片素材通过Unsplash API获取。

## 页面结构

```html
<!-- 整体容器 -->
<view class="flex flex-col min-h-screen bg-gray-50">
  
  <!-- 顶部用户信息栏 -->
  <view class="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
    <!-- 用户头像和信息 -->
    <view class="flex items-center">
      <image class="w-10 h-10 rounded-full" src="{{userInfo.avatarUrl || '/assets/default-avatar.png'}}" />
      <view class="ml-3">
        <text class="font-bold">{{userInfo.nickName || '请登录'}}</text>
        <view class="text-xs text-blue-100">{{userInfo.company || '未设置单位'}}</view>
      </view>
    </view>
    
    <!-- 搜索按钮 -->
    <view class="rounded-full bg-blue-500 w-9 h-9 flex items-center justify-center">
      <icon type="search" size="18" color="#ffffff" />
    </view>
  </view>
  
  <!-- 学习统计卡片 -->
  <view class="mx-4 -mt-4 rounded-xl bg-white shadow-md p-4 z-10">
    <view class="text-sm text-gray-500 mb-2">今日学习</view>
    <view class="flex justify-between">
      <!-- 学习时长 -->
      <view class="flex flex-col items-center">
        <text class="text-xl font-bold text-blue-600">{{studyTime}}</text>
        <text class="text-xs text-gray-500">学习时长</text>
      </view>
      
      <!-- 完成题目 -->
      <view class="flex flex-col items-center">
        <text class="text-xl font-bold text-blue-600">{{completedQuestions}}</text>
        <text class="text-xs text-gray-500">完成题目</text>
      </view>
      
      <!-- 准确率 -->
      <view class="flex flex-col items-center">
        <text class="text-xl font-bold text-blue-600">{{accuracyRate}}%</text>
        <text class="text-xs text-gray-500">准确率</text>
      </view>
    </view>
    
    <!-- 学习进度条 -->
    <view class="mt-3 bg-gray-200 rounded-full h-2">
      <view class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" 
            style="width: {{studyProgress}}%"></view>
    </view>
    <view class="flex justify-between text-xs text-gray-500 mt-1">
      <text>今日目标</text>
      <text>{{completedQuestions}}/{{dailyTarget}}题</text>
    </view>
  </view>
  
  <!-- 功能快捷入口 -->
  <view class="px-4 py-5">
    <view class="grid grid-cols-2 gap-3">
      <!-- 继续学习卡片 -->
      <view class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
        <view class="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
          <icon class="text-blue-600" name="play-circle" />
        </view>
        <text class="font-medium">继续学习</text>
        <text class="text-xs text-gray-500 mt-1">{{lastStudyChapter}}</text>
      </view>
      
      <!-- 随机练习卡片 -->
      <view class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
        <view class="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
          <icon class="text-orange-500" name="shuffle" />
        </view>
        <text class="font-medium">随机练习</text>
        <text class="text-xs text-gray-500 mt-1">多样化题目</text>
      </view>
      
      <!-- 错题本卡片 -->
      <view class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
        <view class="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
          <icon class="text-red-500" name="bookmark" />
        </view>
        <text class="font-medium">错题本</text>
        <text class="text-xs text-gray-500 mt-1">{{wrongQuestionCount}}道题</text>
      </view>
      
      <!-- 收藏夹卡片 -->
      <view class="bg-white rounded-lg shadow-sm p-4 flex flex-col">
        <view class="bg-yellow-100 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
          <icon class="text-yellow-500" name="star" />
        </view>
        <text class="font-medium">收藏夹</text>
        <text class="text-xs text-gray-500 mt-1">{{favoriteCount}}道题</text>
      </view>
    </view>
  </view>
  
  <!-- 知识分类浏览 -->
  <view class="px-4 pt-2 pb-4">
    <view class="flex justify-between items-center mb-3">
      <text class="font-bold">知识分类</text>
      <view class="flex items-center text-blue-600 text-sm">
        <text>全部</text>
        <icon name="chevron-right" size="16" />
      </view>
    </view>
    
    <scroll-view scroll-x class="whitespace-nowrap -mx-4 px-4">
      <view class="inline-block mr-3 w-32 bg-white rounded-lg shadow-sm overflow-hidden">
        <image class="w-32 h-20 object-cover" src="https://source.unsplash.com/300x200/?power,grid" />
        <view class="p-2">
          <text class="font-medium text-sm">电力系统</text>
          <view class="flex items-center mt-1">
            <text class="text-xs text-gray-500">243题</text>
            <view class="ml-auto bg-blue-100 px-2 rounded-full">
              <text class="text-xs text-blue-600">80%</text>
            </view>
          </view>
        </view>
      </view>
      
      <view class="inline-block mr-3 w-32 bg-white rounded-lg shadow-sm overflow-hidden">
        <image class="w-32 h-20 object-cover" src="https://source.unsplash.com/300x200/?electric,transformer" />
        <view class="p-2">
          <text class="font-medium text-sm">配电技术</text>
          <view class="flex items-center mt-1">
            <text class="text-xs text-gray-500">186题</text>
            <view class="ml-auto bg-blue-100 px-2 rounded-full">
              <text class="text-xs text-blue-600">65%</text>
            </view>
          </view>
        </view>
      </view>
      
      <view class="inline-block mr-3 w-32 bg-white rounded-lg shadow-sm overflow-hidden">
        <image class="w-32 h-20 object-cover" src="https://source.unsplash.com/300x200/?power,plant" />
        <view class="p-2">
          <text class="font-medium text-sm">发电工程</text>
          <view class="flex items-center mt-1">
            <text class="text-xs text-gray-500">156题</text>
            <view class="ml-auto bg-gray-100 px-2 rounded-full">
              <text class="text-xs text-gray-600">0%</text>
            </view>
          </view>
        </view>
      </view>
      
      <view class="inline-block w-32 bg-white rounded-lg shadow-sm overflow-hidden">
        <image class="w-32 h-20 object-cover" src="https://source.unsplash.com/300x200/?electricity,safety" />
        <view class="p-2">
          <text class="font-medium text-sm">安全管理</text>
          <view class="flex items-center mt-1">
            <text class="text-xs text-gray-500">92题</text>
            <view class="ml-auto bg-blue-100 px-2 rounded-full">
              <text class="text-xs text-blue-600">45%</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
  
  <!-- 最近学习记录 -->
  <view class="px-4 pt-2 pb-20">
    <view class="flex justify-between items-center mb-3">
      <text class="font-bold">最近学习</text>
      <view class="flex items-center text-blue-600 text-sm">
        <text>查看全部</text>
        <icon name="chevron-right" size="16" />
      </view>
    </view>
    
    <view class="space-y-3">
      <!-- 学习记录卡片1 -->
      <view class="bg-white rounded-lg shadow-sm p-4">
        <view class="flex justify-between items-center">
          <text class="font-medium">电力系统稳定性分析</text>
          <text class="text-xs text-gray-500">2小时前</text>
        </view>
        <view class="flex items-center mt-2">
          <view class="flex-1 h-1.5 bg-gray-200 rounded-full mr-3">
            <view class="h-1.5 bg-blue-600 rounded-full" style="width: 75%"></view>
          </view>
          <text class="text-xs text-gray-500">15/20题</text>
        </view>
      </view>
      
      <!-- 学习记录卡片2 -->
      <view class="bg-white rounded-lg shadow-sm p-4">
        <view class="flex justify-between items-center">
          <text class="font-medium">配电网络故障分析</text>
          <text class="text-xs text-gray-500">昨天</text>
        </view>
        <view class="flex items-center mt-2">
          <view class="flex-1 h-1.5 bg-gray-200 rounded-full mr-3">
            <view class="h-1.5 bg-blue-600 rounded-full" style="width: 100%"></view>
          </view>
          <text class="text-xs text-gray-500">30/30题</text>
        </view>
      </view>
    </view>
  </view>
  
  <!-- 底部导航栏 -->
  <view class="fixed bottom-0 left-0 right-0 flex items-center justify-around bg-white shadow-lg px-5 py-3 border-t border-gray-200">
    <!-- 首页 -->
    <view class="flex flex-col items-center">
      <view class="w-6 h-6 flex items-center justify-center text-blue-600">
        <icon name="home" />
      </view>
      <text class="text-xs mt-1 text-blue-600">首页</text>
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
      <view class="w-6 h-6 flex items-center justify-center text-gray-500">
        <icon name="bookmark" />
      </view>
      <text class="text-xs mt-1 text-gray-500">错题</text>
    </view>
    
    <!-- 我的 -->
    <view class="flex flex-col items-center">
      <view class="w-6 h-6 flex items-center justify-center text-gray-500">
        <icon name="user" />
      </view>
      <text class="text-xs mt-1 text-gray-500">我的</text>
    </view>
  </view>
</view>
```

## 设计说明

### 顶部用户信息栏
- 使用国网蓝色背景 `bg-blue-600`
- 左侧显示用户头像和昵称，右侧为搜索按钮
- 自然下沉的视觉层级，突出重要信息

### 学习统计卡片
- 白色卡片带轻微阴影 `shadow-md`，边角圆润 `rounded-xl`
- 三项核心统计数据：学习时长、完成题目、准确率
- 进度条采用渐变蓝色 `bg-gradient-to-r`，视觉效果更佳
- 对比鲜明的数据展示，易于用户快速获取信息

### 功能快捷入口
- 采用2×2网格布局 `grid grid-cols-2`
- 每个功能卡片使用不同的图标和颜色系统，易于区分
- 图标底色采用浅色，增强视觉层次感
- 卡片内描述文字简洁明了

### 知识分类浏览
- 横向滚动的卡片设计 `scroll-view scroll-x`
- 使用Unsplash API获取的电力相关主题图片
- 每个分类卡片包含：主题图片、分类名称、题目数量、完成度百分比
- 完成度使用不同底色直观表示：蓝色表示已开始学习，灰色表示未开始

### 最近学习记录
- 简洁的卡片式设计，重点突出学习进度
- 进度条直观显示完成比例
- 时间戳清晰标明学习时间点

### 底部导航栏
- 固定在屏幕底部 `fixed bottom-0`
- 四个主要功能入口：首页、题库、错题、我的
- 当前页面使用主题色高亮显示
- 图标与文字组合，增强可识别性

## 设计亮点

1. **色彩系统**：以国网蓝为主色调，辅以功能性颜色，形成统一而丰富的视觉体验
2. **层级分明**：通过阴影、间距和色彩搭配，营造出清晰的信息层级
3. **数据可视化**：进度条、百分比等元素直观展示学习状态
4. **图像应用**：利用Unsplash API获取专业相关图片，提升专业感
5. **响应式设计**：基于Flex和Grid的布局，适应不同尺寸的设备
6. **视觉一致性**：统一的圆角、间距和排版规则，确保整体设计协调

## 交互说明

1. 点击顶部搜索按钮进入搜索页面
2. 点击功能快捷入口跳转到相应功能页面
3. 水平滑动知识分类区域可查看更多分类
4. 点击分类卡片进入相应的知识点列表
5. 点击"全部"或"查看全部"可展开更多内容
6. 点击底部导航栏切换主要功能模块 