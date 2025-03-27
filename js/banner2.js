
// console.log(find)
const banner2 = {
    imgs: document.querySelectorAll('.imgs img'),
    imgsContainer: find('.imgs'),
    root: document.documentElement,
    left: find('section .section-banner .left'),
    right: find('section .section-banner .right'),
    timer:null,
    //获取imgsContainer的真实宽度
    realWidth() { return this.imgsContainer.scrollWidth },
    viewWidth() { return this.imgsContainer.clientWidth },
    offsetOnce() {
        return (this.realWidth() - this.viewWidth()) / 2
    },
    index: 0,
    rightDirection: true,
    move(offset) {
        this.imgsContainer.style.transform = `translateX(-${offset}px)`
    },
    leftOffset() {
        clearInterval(this.timer)
        if (this.index === 0) {
            return
        } else {
            //恢复右箭头可见
            this.right.style.visibility = 'visible'
            this.index--
            if (this.index === 0) {
                //如果已经是第一张，则隐藏左箭头
                this.left.style.visibility = 'hidden'
                //自动轮播转向
                this.rightDirection = true
            }
            this.move(this.index * this.offsetOnce())
        }
        this.autoPlay()
    },
    rightOffset() {
        clearInterval(this.timer)
        if (this.index === 2) {
            return
        } else {
            //恢复左箭头可见
            this.left.style.visibility = 'visible'
            this.index++
            if(this.index === 2){
                //如果已经是最后一张，则隐藏右箭头
                this.right.style.visibility = 'hidden'
                //自动轮播转向
                this.rightDirection = false
            }
            this.move(this.index * this.offsetOnce())
        }
        this.autoPlay()
    },
    init() {
        // 给每个img加上图片路径
        this.imgs.forEach((item, index) => {
            item.src = `./CAT一轮考核/image/2${index + 1}.jpg`
        })
        // 给左右箭头添加点击事件
        this.left.addEventListener('click', () => {
            this.leftOffset()
        })
        this.right.addEventListener('click', () => {
            this.rightOffset()
        })
        //启动自动轮播
        this.autoPlay()
        //当鼠标悬停在图片区域时，停止自动轮播
        this.imgsContainer.addEventListener('mouseover', () => {
            clearInterval(this.timer)
        })
        //当鼠标离开图片区域时，重新启动自动轮播
        this.imgsContainer.addEventListener('mouseout', () => {
            this.autoPlay()
        })
    },
    autoPlay(){
        //判断当前方向，实现自动来回轮播
        if(this.rightDirection){
            this.timer = setInterval(() => {
                this.rightOffset()
            }, 2000)
        }else{
            this.timer = setInterval(() => {
                this.leftOffset()
            }, 2000)
        }
    }
}


banner2.init()

