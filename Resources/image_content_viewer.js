var win = Ti.UI.currentWindow;
var scrollView = Ti.UI.createScrollView({
	width : '100%',
	height : '100%',
	contentWidth : 'auto',
	contentHeight : 'auto',
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : true,
	maxZoomScale : 100,
	minZoomScale : 0.1,
	zoomScale : 1
});
scrollView.add(Ti.UI.createImageView({
	image : win.content.contentImageUrl,
	width : '100%',
	height : Ti.UI.SIZE
}));
win.add(scrollView);
