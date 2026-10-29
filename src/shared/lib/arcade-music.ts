export type MusicStatus = "idle" | "playing" | "muted" | "paused" | "unavailable";

/** Original 32-step melody; no recordings or third-party compositions. */
const MELODY = [76, 79, 81, 79, 74, 76, 72, null, 76, 79, 83, 81, 79, 74, 76, null,
  81, 84, 83, 79, 76, 74, 72, 74, 76, 79, 74, 76, 72, null, 67, null];
const BASS = [48, 53, 57, 55];
const STEP_SECONDS = 0.23;

/** One quiet synth per game session. Constructing it never starts audio. */
export class ArcadeMusic {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private voices = new Set<OscillatorNode>();
  private started = false;
  private enabled = true;
  private visible = true;
  private generation = 0;
  private step = 0;
  private nextTime = 0;

  constructor(private readonly report: (status: MusicStatus) => void) {}

  start(enabled: boolean) {
    this.started = true;
    this.enabled = enabled;
    this.sync();
  }

  setEnabled(enabled: boolean) { this.enabled = enabled; this.sync(); }
  setVisible(visible: boolean) { this.visible = visible; this.sync(); }

  private sync() {
    const generation = ++this.generation;
    if (!this.started || !this.enabled || !this.visible) {
      this.stopScheduler();
      void this.context?.suspend().catch(() => {});
      this.report(!this.enabled ? "muted" : this.started ? "paused" : "idle");
      return;
    }
    try {
      if (!this.context) {
        const AudioConstructor = window.AudioContext ??
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioConstructor) { this.report("unavailable"); return; }
        this.context = new AudioConstructor();
        this.master = this.context.createGain();
        this.master.gain.setValueAtTime(0.4, this.context.currentTime);
        const filter = this.context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2400, this.context.currentTime);
        this.master.connect(filter);
        filter.connect(this.context.destination);
      }
      const context = this.context;
      // Resume is invoked synchronously from Press Start / the toggle gesture.
      void context.resume().then(() => {
        if (generation !== this.generation) return;
        if (this.timer === null) {
          this.nextTime = context.currentTime + 0.04;
          this.schedule();
          this.timer = setInterval(() => this.schedule(), 40);
        }
        this.report("playing");
      }).catch(() => { if (generation === this.generation) this.report("unavailable"); });
    } catch { this.report("unavailable"); }
  }

  private schedule() {
    const context = this.context;
    if (!context || context.state !== "running") return;
    // Drop missed time rather than emitting a burst after a stalled tab.
    this.nextTime = Math.max(this.nextTime, context.currentTime);
    while (this.nextTime < context.currentTime + 0.12) {
      const note = MELODY[this.step % MELODY.length];
      if (note !== null) this.note(note, this.nextTime, 0.17, "triangle", 0.16);
      if (this.step % 4 === 0) this.note(BASS[Math.floor(this.step / 8) % BASS.length], this.nextTime, 0.62, "sine", 0.2);
      this.step = (this.step + 1) % MELODY.length;
      this.nextTime += STEP_SECONDS;
    }
  }

  private note(midi: number, time: number, duration: number, type: OscillatorType, volume: number) {
    const context = this.context;
    if (!context || !this.master) return;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(440 * 2 ** ((midi - 69) / 12), time);
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(volume, time + 0.018);
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(envelope);
    envelope.connect(this.master);
    this.voices.add(oscillator);
    oscillator.onended = () => { this.voices.delete(oscillator); oscillator.disconnect(); envelope.disconnect(); };
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  }

  private stopScheduler() {
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
    for (const voice of this.voices) {
      try { voice.stop(); } catch { /* The voice may have ended already. */ }
    }
    this.voices.clear();
  }

  dispose() {
    ++this.generation;
    this.stopScheduler();
    void this.context?.close().catch(() => {});
    this.context = null;
    this.master = null;
  }
}
