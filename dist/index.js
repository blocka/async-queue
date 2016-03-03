"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var AsyncQueue = function AsyncQueue() {
	this.queue = [];
	this.running = false;
};

AsyncQueue.prototype = {
	push: function push(task) {
		this.queue.push(task);
		this.next();
	},
	next: function next() {
		var _this = this;

		if (this.queue.length === 0) return;

		if (this.running === true) return;

		var task = this.queue.shift();

		this.running = true;

		task(function () {
			_this.running = false;
			_this.next();
		});
	}
};

exports.default = AsyncQueue;