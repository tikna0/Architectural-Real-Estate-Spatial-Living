/**
 * Web Audio API synthesizer for tactile Apple-style physical feedback
 * and ambient architectural room tone without external audio asset dependencies.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientSource: AudioNode | null = null;
  public isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /** Subtle, tactile acoustic click (similar to iOS haptic toggle) */
  playClick() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy or unavailable
    }
  }

  /** Soft snap sound for toggle switches and room changes */
  playSnap() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Graceful fallback
    }
  }

  /** Subtle serene spatial room tone (binaural warm room resonance) */
  toggleAmbient(enable?: boolean): boolean {
    try {
      this.initContext();
      if (!this.ctx) return false;

      const shouldPlay = enable !== undefined ? enable : !this.isAmbientPlaying;

      if (!shouldPlay) {
        if (this.ambientGain) {
          this.ambientGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.5);
          setTimeout(() => {
            this.ambientSource?.disconnect();
            this.ambientSource = null;
            this.isAmbientPlaying = false;
          }, 600);
        }
        this.isAmbientPlaying = false;
        return false;
      }

      // Generate soft pink-filtered warm room tone
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
      for (let channel = 0; channel < 2; channel++) {
        const data = buffer.getChannelData(channel);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99765 * b0 + white * 0.0990460;
          b1 = 0.96300 * b1 + white * 0.2965164;
          b2 = 0.57000 * b2 + white * 1.0526913;
          data[i] = (b0 + b1 + b2) * 0.015;
        }
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Filter to deep warm room presence (around 180Hz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 1.2);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseSource.start();

      this.ambientSource = noiseSource;
      this.ambientGain = gain;
      this.isAmbientPlaying = true;
      return true;
    } catch {
      this.isAmbientPlaying = false;
      return false;
    }
  }
}

export const sound = new SoundController();
