var CanvasVisualizer = function(element) {
    this.canvasContext = null;
    this.canvas = null;
    this.drawWidth = null;
    this.drawHeight = null;

    this.canvas = element;
    this.canvasContext = this.canvas.getContext('2d');
    this.initCanvasContext(this.canvas.width, this.canvas.height);
};


CanvasVisualizer.prototype.initCanvasContext = function(width, height) {
    this.drawWidth = width;
    this.drawHeight = height;
    this.canvasContext.clearRect(0, 0, this.drawWidth, this.drawHeight);
    this.canvasContext.fillStyle = 'rgba(0, 255, 0, 1)';
};

CanvasVisualizer.prototype.update = function(data) {
    this.render(data);
};

CanvasVisualizer.prototype.render = function(data) {
    var n, val;
    data = data || [];
    if (this.canvasContext) {
        this.canvasContext.clearRect(0, 0, this.drawWidth, this.drawHeight);
        n = data.length;
        while (n--) {
            val = data[n] / 3;
            this.canvasContext.fillRect(n * 2, this.drawHeight - val, 1, val);
        }

    } else {
        //Should do something here
    }
};

module.exports = CanvasVisualizer;