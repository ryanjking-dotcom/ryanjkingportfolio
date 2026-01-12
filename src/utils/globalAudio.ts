// Global audio instance to prevent multiple music players
class GlobalAudioManager {
  private audio: HTMLAudioElement | null = null;
  private initialized = false;

  getInstance(): HTMLAudioElement {
    if (!this.audio) {
      const isGithubPages = import.meta.env.PROD && window.location.hostname.endsWith('github.io');
      const repo = window.location.pathname.split('/').filter(Boolean)[0];
      const base = isGithubPages && repo ? `/${repo}/` : '/';

      this.audio = new Audio(`${base}assets/FutureBossaLofi.mp3`);
      this.audio.loop = true;
      this.audio.volume = 0.3;
      this.initialized = true;
      console.log('Global audio instance created');
    }
    return this.audio;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  cleanup(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
      this.initialized = false;
      console.log('Global audio instance cleaned up');
    }
  }
}

export const globalAudioManager = new GlobalAudioManager();