const { FourChanFull } = require("../FourChanFull");
const { EventEmitter } = require("events");
const sleep = require("stuffs/lib/sleep");
const { Thread } = require("../types/Thread");
const { resolve } = require("path");


class ThreadWatcher {

  /** @type {FourChanFull} */
  fchf;

  #options = {
    boardCode: "",
    threadId: "",
    checkIntervalMin: 0,
    checkIntervalMax: 0,
    checkIntervalAdder: 0
  }

  get options() {
    return this.#options;
  }

  #checkInterval = 0;

  get checkInterval() {
    return this.#checkInterval;
  }

  #running = false;

  get running() {
    return this.#running;
  }

  /** @type {Thread} */
  #lastResult = {};

  get lastResult() {
    return this.#lastResult;
  }

  #startTime = -1;

  get startTime() {
    return this.#startTime;
  }

  events = new EventEmitter();

  on(eventName, listener) {
    this.events.on(eventName, listener);
  }

  off(eventName, listener) {
    this.events.off(eventName, listener);
  }

  /**
   * @param {FourChanFull} fchf 
   * @param {{boardCode:string,threadId:string,checkIntervalMin:number,checkIntervalMax:number,checkIntervalAdder:number}} options
   */
  constructor(fchf, options) {
    this.fchf = fchf;
    this.#options.boardCode = options.boardCode;
    this.#options.threadId = options.threadId;
    this.#options.checkIntervalMin = options.checkIntervalMin || 3000;
    this.#options.checkIntervalMax = options.checkIntervalMax || 60000;
    this.#options.checkIntervalAdder = options.checkIntervalAdder || this.#options.checkIntervalMin;
  }

  start() {
    const self = this;
    const { boardCode, threadId, checkIntervalAdder, checkIntervalMax, checkIntervalMin, onUpdate } = this.options;
    return new Promise(async (resolve, reject) => {
      if (self.#running) return reject(Error("Thread watcher already running!"));
      self.#startTime = Date.now();
      self.#running = true;
      self.#checkInterval = checkIntervalMin;
      self.events.emit("#start");
      async function _check() {
        if (!self.#running) return self.events.emit("#stop");
        try {
          let thread = await self.fchf.thread(boardCode, threadId);
          resolve();
          if (self.#lastResult?.replies?.length != thread.replies.length) {
            self.#checkInterval = checkIntervalMin;
            self.events.emit("updated", self.#lastResult, thread);
          } else {
            self.#checkInterval += checkIntervalAdder;
            if (self.#checkInterval > checkIntervalMax) self.#checkInterval = checkIntervalMax;
            self.events.emit("notUpdated");
          }
          self.events.emit("checked", self.#lastResult, thread);
          self.#lastResult = thread;
          await sleep(self.#checkInterval);
          _check();
        } catch (err) {
          self.#running = false;
          self.events.emit("error", err);
          reject(err);
        }
      }
      _check();
    })
  }

  stop() {
    return new Promise(async (resolve, reject) => {
      this.#running = false;
      this.#startTime = -1;
      this.events.once("#stop", resolve);
    })
  }
}



module.exports = { ThreadWatcher };