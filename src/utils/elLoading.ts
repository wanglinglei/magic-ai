import { ElLoading, type LoadingInstance } from 'element-plus';

export class ElLoadingUtils {
  private loadingInstance: LoadingInstance | null = null;

  showLoading(message: string) {
    if (this.loadingInstance) {
      return;
    }
    this.loadingInstance = ElLoading.service({
      lock: true,
      text: message,
      background: 'rgba(0, 0, 0, 0.7)',
    });
  }

  hideLoading() {
    if (this.loadingInstance) {
      this.loadingInstance.close();
      this.loadingInstance = null;
    }
  }
}

export const elLoadingUtils = new ElLoadingUtils();
