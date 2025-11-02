export interface MenuItem {
  label: string;
  path: string;
  icon?: string;
}

export interface UserMenuItem {
  label: string;
  icon: string;
  action: string; // 'profile' | 'settings' | 'logout' | 'theme' 等
  divided?: boolean; // 是否显示分割线
}

// 应用信息
export const APP_INFO = {
  name: 'MagicAI',
  logo: '🪄',
  homeUrl: '/',
};

// 导航菜单配置
export const NAV_MENUS: MenuItem[] = [
  {
    label: '首页',
    path: '/',
    icon: 'i-carbon-home',
  },
  {
    label: 'AI 对话',
    path: '/chat',
    icon: 'i-carbon-chat',
  },
  {
    label: '图片生成',
    path: '/image',
    icon: 'i-carbon-image',
  },
];

// 用户下拉菜单配置
export const USER_MENUS: UserMenuItem[] = [
  {
    label: '个人资料',
    icon: 'i-carbon-user',
    action: 'profile',
  },
  {
    label: '设置',
    icon: 'i-carbon-settings',
    action: 'settings',
  },
  {
    label: '切换主题',
    icon: 'i-carbon-sun',
    action: 'theme',
    divided: true,
  },
  {
    label: '退出登录',
    icon: 'i-carbon-logout',
    action: 'logout',
  },
];

// 用户信息（可以从 store 或 API 获取）
export const DEFAULT_USER = {
  name: '用户',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
};
