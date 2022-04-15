export const pubsub = {
  events: {},
  subscribe: function (evName, fn) {
    console.log(`PUBSUB: someone just subscribed to know about ${evName}`);
    this.events[evName] = this.events[evName] || [];
    this.events[evName].push(fn);
    console.log(this.events);
  },
  unsubscribe: function (evName, fn) {
    console.log(`PUBSUB: someone just UNsubscribed to know about ${evName}`);
    if (this.events[evName]) {
      this.events[evName] = this.events[evName].filter((f) => f !== fn);
    }
  },
  publish: function (evName, data) {
    console.log(`PUBSUB: Making an broadcast about ${evName} with ${data}`);
    if (this.events[evName]) {
      this.events[evName].forEach((f) => {
        f(data);
      });
    }
  },
};
