var ColorProvider = function(colorsNumber, gradientStops) {
	var canvas, context, width = colorsNumber, height = 1;
	canvas = this._createVirtualCanvas(width, height);
	context = this._createContext(canvas);
	this._drawLinearGradientToContext(context, canvas.width, canvas.height, gradientStops);
	this.colors = this._getColorsFromContext(context, width, height);
};


ColorProvider.prototype._createVirtualCanvas = function(width, height) {
    var canvas;
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    document.querySelector('body').appendChild(canvas);
    return canvas;
};

ColorProvider.prototype._createContext = function(canvas) {
    var context;
    context = canvas.getContext('2d');
    context.rect(0, 0, canvas.width, canvas.height);
    return context;
};

ColorProvider.prototype._drawLinearGradientToContext = function(context, width, height, gradientStops) {
	var i, n, gradient = context.createLinearGradient(0, 0, width, height);
    for (i = 0, n = gradientStops.length; i < n; i++) {
        gradient.addColorStop(gradientStops[i][0], gradientStops[i][1]);
    }
    context.fillStyle = gradient;
    context.fill();
};

ColorProvider.prototype._getColorsFromContext = function (context, width, height) {
    var colorsData, i, n, colors;
    colorsData = context.getImageData(0, 0, width, height);
    colorsData = colorsData.data;
    colors = [];
    for (i = 0, n = colorsData.length; i < n; i = i + 4) {
        colors.push(colorsData[i] * 256 * 256 + 256 * colorsData[i + 1] + colorsData[i + 2]);
    }
    return colors;
}; 

ColorProvider.prototype.getColor = function(index) {
    return this.colors[index] || 0;
};

module.exports = ColorProvider;