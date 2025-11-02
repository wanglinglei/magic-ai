export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

// 公司信息
export const COMPANY_INFO = {
  name: import.meta.env.VITE_APP_NAME,
  year: new Date().getFullYear(),
  copyright: 'All rights reserved',
};

// 主导航链接
export const NAV_LINKS: NavLink[] = [
  { label: 'DeepSeek', href: 'https://chat.deepseek.com/' },
  { label: '豆包', href: 'https://www.doubao.com/' },
  { label: '通义千问', href: 'https://tongyi.aliyun.com/' },
];

// 次级导航链接
export const SECONDARY_LINKS: NavLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

// 社交媒体链接
export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: 'i-carbon-logo-twitter',
    href: 'https://twitter.com',
    label: 'Twitter',
  },
  {
    icon: 'i-carbon-logo-github',
    href: 'https://github.com',
    label: 'GitHub',
  },
];
