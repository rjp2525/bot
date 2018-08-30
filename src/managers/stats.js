/**
 * Very basic stats class
 */
class Stats {
  /**
   * Creates an instance of Stats.
   */
  constructor() {
    this._stats = {};
  }

  get(key) {
    return this._stats[key];
  }

  set(key, value) {
    this._stats[key] = value;
  }

  increment(key, amount) {
    this.set(key, (this.get(key) || 0) + (amount || 1));
  }
}

export default Stats;