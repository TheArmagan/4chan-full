const { FourChanFull } = require("../FourChanFull");
const { Thread } = require("../types/Thread");
const { Reply } = require("../types/Reply");
const { EventEmitter } = require("events");

class ThreadWatcher {

  /** @type {FourChanFull} */
  fchf;

  /** @type {EventEmitter} */
  events = new EventEmitter();

  #timeoutMultiplier = 1;

  #checkTimeout;

  #timeoutId = 0;

  #running = false;

  /** @type {String} */
  #boardCode;

  /** @type {String} */
  #threadId;

  /** @type {Number} */
  timeout;

  /** @type {Number} */
  defaultCheckTimeout;

  /** @type {Number} */
  lastCheckAt = 0;

  /** @type {Number} */
  lastReplyAt = 0;

  /** @type {Thread} */
  thread;


  /**
   * @param {FourChanFull} fchf 
   * @param {String} boardCode 
   * @param {String} threadId 
   * @param {Number} timeout
   * @param {Number} defaultCheckTimeout
   */
  constructor(fchf, boardCode, threadId, timeout, defaultCheckTimeout) {
    this.fchf = fchf;
    this.#boardCode = boardCode;
    this.#threadId = threadId;
    this.timeout = timeout ?? 60000 * 60;
    this.defaultCheckTimeout = defaultCheckTimeout ?? 2500;
    this.#checkTimeout = this.defaultCheckTimeout;
  }

  get isRunning() {
    return this.#running;
  }

  start(resetTimes = true) {
    if (this.#running) throw "Already running.";
    if (resetTimes) {
      this.#timeoutMultiplier = 1;
      this.#checkTimeout = 2500;
    }

    this.#running = true;
    this.#check();
    return true;
  }

  stop(resetTimes = false) {
    if (!this.#running) throw "Already not running.";
    this.#running = false;
    clearTimeout(this.#timeoutId);
    this.#timeoutId = null;

    if (resetTimes) {
      this.#timeoutMultiplier = 1;
      this.#checkTimeout = 2500;
    }
    return true;
  }

  #check = async () => {
    let thread = await this.fchf.thread(this.#boardCode, this.#threadId);
    this.events.emit("thread", thread);
    /** @type {Array<Reply>} */
    let newReplies = [];
    thread.replies.forEach(reply => {
      let isHere = this?.thread?.replies?.some(i => i.id == reply.id);
      if (!isHere) {
        newReplies.push(reply);
      }
    });
    if (newReplies.length != 0) {
      this.events.emit("replies", newReplies);
      this.#timeoutMultiplier = 1;
      this.#checkTimeout = 2500;
      this.lastReplyAt = Date.now();
    } else {
      this.#timeoutMultiplier += 1;
    }

    this.lastCheckAt = Date.now();
    this.#checkTimeout *= this.#timeoutMultiplier;

    if (Date.now() - this.lastReplyAt > this.timeout) {
      this.events.emit("timeout");
      this.stop()
    } else {
      this.#timeoutId = setTimeout(() => {
        this.#check();
      }, this.#checkTimeout);
    }

  }
}

// TODO: Make tests.

module.exports = { ThreadWatcher };