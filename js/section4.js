const section4 = {
    init() {
        this.img.src = '/CAT一轮考核/image/1.png';
        this.blindTextEvent();
        this.blindDotEvent(this.changeDot);
    },
    img: find('.section4 .slider-wrapper img'),
    sliderTexts: findAll('.slider-text'),
    sliderContent: find('.slider-content'),
    dots: findAll('.slider-dot .dot'),
    isDragging: false,
    startX: null,
    currentX: null,
    currentOpacity: 1,
    currentIndex: 0,
    windowWidth:window.innerWidth,
    /**
     * blindEvent 函数用于处理滑块内容的拖拽事件，实现滑块内容的切换和透明度变化。
     * 该函数通过监听鼠标的 mousedown、mousemove 和 mouseup 事件来实现拖拽效果。
     * 在拖拽过程中，根据鼠标移动的距离计算当前滑块的透明度，并在鼠标释放时决定是否切换到下一个或上一个滑块。
     */
    blindTextEvent() {

        // 监听滑块内容的 mousedown 事件，开始拖拽
        this.sliderContent.addEventListener('mousedown', (e) => {
            this.isDragging = true; // 设置拖拽状态为 true
            this.startX = e.clientX; // 记录鼠标按下时的初始 X 坐标
        });

        // 监听sliderContent的 mousemove 事件，处理拖拽过程中的透明度变化
        this.sliderContent.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.currentX = e.clientX; // 记录当前鼠标的 X 坐标
                const deltaX = this.startX - this.currentX; // 计算鼠标移动的距离
                this.currentOpacity = 1 - Math.abs(deltaX) / 300; // 根据移动距离计算当前透明度
                this.currentOpacity = Math.max(0, Math.min(1, this.currentOpacity)); // 确保透明度在 0 到 1 之间

                // 根据鼠标移动方向计算下一个滑块的索引
                const nextIndex = deltaX > 0 ? (this.currentIndex + 1) % this.sliderTexts.length : (this.currentIndex - 1 + this.sliderTexts.length) % this.sliderTexts.length;

                // 设置当前滑块和下一个滑块的透明度
                this.sliderTexts[this.currentIndex].style.opacity = this.currentOpacity;
                this.sliderTexts[nextIndex].style.opacity = 1 - this.currentOpacity;
            }
        });

        // 监听sliderContent mouseup 事件，结束拖拽并决定是否切换到下一个或上一个滑块
        this.sliderContent.addEventListener('mouseup', (e) => {
            this.isDragging = false; // 设置拖拽状态为 false
            const deltaX = this.currentX  && this.startX - this.currentX; // 计算鼠标移动的总距离
            this.currentX = null;
            // 如果移动距离超过阈值，则切换到下一个或上一个滑块
            if (Math.abs(deltaX) > 150 ) {
                if (deltaX > 0) {
                    this.currentIndex = (this.currentIndex + 1) % this.sliderTexts.length; // 切换到下一个滑块
                } else {
                    this.currentIndex = (this.currentIndex - 1 + this.sliderTexts.length) % this.sliderTexts.length; // 切换到上一个滑块
                }
                this.changeDot(this.dots[this.currentIndex],this.currentIndex)
                // 更新所有滑块的选中状态和透明度
                this.sliderTexts.forEach((text, index) => {
                    text.classList.toggle('selected', index === this.currentIndex);
                    text.style.opacity = index === this.currentIndex ? 1 : 0;
                });
            } else {
                // 如果移动距离未超过阈值，则恢复当前滑块的透明度
                this.sliderTexts.forEach(text => {
                    text.style.opacity = 0;
                });
                this.sliderTexts[this.currentIndex].style.opacity = 1;
            }

        });

        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        })

    },
    blindDotEvent(event) {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', event.bind(this,dot,index));
        });
    },
    changeDot(dot, index) {
        this.dots.forEach(dot => dot.classList.remove('selected'));
        dot.classList.add('selected');
        this.currentIndex = index;
        this.changeText();
    },
    changeText() {
        this.sliderTexts.forEach(text => {
            text.classList.remove('selected')
            text.style.opacity = 0;
        });
        this.sliderTexts[this.currentIndex].classList.add('selected');
        this.sliderTexts[this.currentIndex].style.opacity = 1;
    }
}
section4.init()



