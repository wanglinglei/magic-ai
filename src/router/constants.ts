export const ROUTER_PATH_NAME = {
  HOME: 'Home',
  CHAT: 'Chat',
  IMAGE: 'Image',
  VIDEO: 'Video',
  DOCX: 'Docx',
  DIVINATION: 'Divination',
  USER_INFO: 'UserInfo',
  TEST: 'Test',
};

export type TRouterPathName = (typeof ROUTER_PATH_NAME)[keyof typeof ROUTER_PATH_NAME];
