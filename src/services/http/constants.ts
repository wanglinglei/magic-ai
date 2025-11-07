export enum ErrorCode {
  // 认证相关错误 (401)
  /** 未登录 */
  UNAUTHORIZED = 'UNAUTHORIZED',
  /** Token 已过期 */
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  /** Token 无效 */
  TOKEN_INVALID = 'TOKEN_INVALID',
  /** 用户不存在 */
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  /** 账户已被禁用 */
  USER_DISABLED = 'USER_DISABLED',

  // 权限相关错误 (403)
  /** 权限不足 */
  FORBIDDEN = 'FORBIDDEN',
  /** 功能权限不足 */
  FEATURE_PERMISSION_DENIED = 'FEATURE_PERMISSION_DENIED',
}
