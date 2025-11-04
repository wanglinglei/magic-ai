export const ROUTER_PATH_NAME = {
  HOME: 'Home',
  CHAT: 'Chat',
  IMAGE: 'Image',
  VIDEO: 'Video',
  DOCX: 'Docx',
};

export type TRouterPathName = (typeof ROUTER_PATH_NAME)[keyof typeof ROUTER_PATH_NAME];
