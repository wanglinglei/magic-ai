import chatPng from '@/assets/images/home/chat.png';
import imagePng from '@/assets/images/home/image.png';
import videoPng from '@/assets/images/home/video.png';
import docxPng from '@/assets/images/home/docx.png';
import { ROUTER_PATH_NAME } from '@/router/constants';
export const HOME_BANNER_LIST = [
  {
    title: '图像生成',
    description: 'AI 绘画、图片生成、图像编辑工具',
    image: imagePng,
    pathName: ROUTER_PATH_NAME.IMAGE,
    labels: [
      { text: '推荐', colorClass: 'bg-blue-100 text-blue-700' },
      { text: '热门', colorClass: 'bg-emerald-100 text-emerald-700' },
      { text: '图像', colorClass: 'bg-pink-100 text-pink-700' },
    ],
  },
  {
    title: '聊天',
    description: '智能AI聊天工具',
    image: chatPng,
    pathName: ROUTER_PATH_NAME.CHAT,
    labels: [
      { text: '推荐', colorClass: 'bg-indigo-100 text-indigo-700' },
      { text: '提示词', colorClass: 'bg-cyan-100 text-cyan-700' },
      { text: '通用', colorClass: 'bg-violet-100 text-violet-700' },
    ],
  },
  {
    title: '视频生成',
    description: 'AI 视频生成工具',
    image: videoPng,
    pathName: ROUTER_PATH_NAME.VIDEO,
    labels: [
      { text: '热门', colorClass: 'bg-sky-100 text-sky-700' },
      { text: '设计', colorClass: 'bg-teal-100 text-teal-700' },
    ],
  },
  {
    title: 'DOCX模板生成器',
    description: 'AI DOCX模板生成工具',
    image: docxPng,
    pathName: ROUTER_PATH_NAME.DOCX,
    labels: [
      { text: '新功能', colorClass: 'bg-purple-100 text-purple-700' },
      { text: '文档处理', colorClass: 'bg-green-100 text-green-700' },
    ],
  },
];
