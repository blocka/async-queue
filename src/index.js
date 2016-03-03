const AsyncQueue = function() {
	this.queue = [];
	this.running = false;
};

AsyncQueue.prototype = {
	push: function(task) {
		this.queue.push(task);
		this.next();
	},
	next: function() {
		if (this.queue.length === 0)
			return;

		if (this.running === true)
			return;

		var task = this.queue.shift();

		this.running = true;

		task(() => {
			this.running = false;
			this.next();
		});
	}
};

export default AsyncQueue;