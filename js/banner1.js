// 定义一些别名，方便代码书写
const find = (a) => { return document.querySelector(a) }
const findAll = (a) => { return document.querySelectorAll(a) }
// 定义一些常量，方便代码书写
const preUrl = '../CAT一轮考核/image/'
const imgsUrl = ['1.png', '2.png', '3.jpg', '4.jpg', '5.jpg']
// 定义一个对象，用于管理轮播图逻辑和数据
const banner = {
    index: 0,
    root: document.documentElement,
    leftBtn: find('.left'),
    rightBtn: find('.right'),
    imgContainer: find('.img-container'),
    imgs: findAll('.img-container .img'),
    imgsNum: null,
    timer:null,
    init() {
        //先给每个div元素放置不同的图片
        this.imgs.forEach((item, index) => {
            item.style.backgroundImage = `url(${preUrl}${imgsUrl[index]})`
        })
        //辅助实现无缝轮播图效果
        this.imgsCircle()
        //将第三张和第四张的图片里的文字和按钮背景颜色设置为白色,按钮字体颜色设置为黑色
        for(let i =2;i<=3;i++){
            this.imgs[i].style.color = 'white'
            this.imgs[i].querySelector('.btn').style.backgroundColor = 'white'
            this.imgs[i].querySelector('.btn').style.color = 'black'
        }
    },
    /**
     * 实现图片轮播的无缝连接效果
     * 
     * 在头尾两部分添加两个div元素辅助实现无缝轮播图效果
     * 通过克隆首尾图片元素并调整其位置，实现轮播图的无缝连接
     * 这种方法使得用户在浏览轮播图时不会察觉到末尾的切换，提升了用户体验
     */
    imgsCircle() {
        // 克隆首尾图片元素，用于创建无缝轮播效果
        const first = this.imgContainer.firstElementChild.cloneNode(true)
        const last = this.imgContainer.lastElementChild.cloneNode(true)
        
        // 调整克隆的尾部图片元素位置，使其无缝连接到头部
        this.imgContainer.insertBefore(last, this.imgContainer.firstElementChild)
        this.imgContainer.appendChild(first)
        
        // 更新图片数量，确保包括新添加的克隆图片
        this.imgsNum = this.imgs.length
        
        // 设置克隆的尾部图片元素的样式，使其在视觉上与头部图片连接
        last.style.position = 'absolute'
        last.style.transform = 'translateX(-100%)'
    },
    getWidth() { return this.imgContainer.clientWidth },
    /**
     * 更新容器的位置偏移
     * 
     * 通过更改CSS变量来实现容器内容的滚动效果
     * `--container-offset` 是在CSS中定义的变量，用于控制容器内容的偏移
     * `this.index` 表示当前容器的索引，根据索引值计算偏移量
     */
    updateContainer() {
        this.root.style.setProperty('--container-offset', `-${this.index}00%`)
    },
    /**
     * 向左移动图片显示容器
     * 
     * 本函数用于实现图片轮播功能中的向左移动逻辑当图片显示索引不为第一张时，
     * 直接移动到上一张图片；当图片显示索引为第一张时，通过动画效果切换到最后一张图片，
     * 实现循环轮播的效果
     */
    leftMove() {
        //清除定时器
        clearInterval(this.timer)
        // 判断当前图片索引是否为第一张,不是则正常移动到上一张图片
        if (this.index !== 0) {
            this.index = (this.index - 1) % this.imgsNum
            this.updateContainer()
            return;
        }
        // 如果是第一张，则将图片索引设置为最后一张图片的索引，再移动到上一张图片
        // 保存数据以便恢复
        const temp = this.imgContainer.style.transition
        // 当图片索引为第一张时，先关闭动画效果，准备进行切换
        this.imgContainer.style.transition = 'none'
        // 设置容器偏移量，让所有图片瞬间移动到不可见区域，为切换到最后一张图片做准备
        this.root.style.setProperty('--container-offset', `-${this.imgsNum}00%`)
        // 强制浏览器重绘，触发重绘流程，确保样式即时更新
        this.imgContainer.clientWidth
        // 更新图片索引为最后一张图片的索引
        this.index = this.imgsNum - 1
        // 恢复动画效果，使图片容器平滑切换到新的位置
        this.imgContainer.style.transition = temp
        // 更新容器状态，以适应新的图片显示索引
        this.updateContainer()
        //重新定时
        this.autoPlay()
    },
    /**
     * 向右移动图片显示
     * 此函数用于处理图片轮播时向右移动的逻辑当图片移动到最后一张时，
     * 会重置到第一张图片，以实现循环轮播效果
     */
    rightMove() {
        // 停止定时器
        clearInterval(this.timer)
        // 判断当前图片索引是否为最后一张图片
        if (this.index === this.imgsNum - 1) {
            // 禁用过渡效果，以便快速重置图片容器位置
            this.imgContainer.style.transition = 'none'
            // 设置容器偏移量，用于重置图片容器位置
            this.root.style.setProperty('--container-offset', '100%')
            // 强制浏览器重绘，以应用样式更改
            this.imgContainer.clientWidth
            // 重置图片索引到第一张图片
            this.index = 0;
            // 重新启用过渡效果，以实现平滑移动
            this.imgContainer.style.transition = 'transform 1.5s'
            // 更新图片容器位置
            this.updateContainer()
        } else {
            // 如果当前图片不是最后一张，则索引递增，实现向右移动效果
            this.index = (this.index + 1) % this.imgsNum
            // 更新图片容器位置
            this.updateContainer()
        }
        //开启定时器
        this.autoPlay()
    },
    autoPlay(){
        this.timer = setInterval(()=>{
            this.rightMove()
        },3000)
    },
}
// 初始化轮播图逻辑和数据
banner.init()

// 定义两个函数，分别用于向左和向右移动图片，方便后续绑定事件和移除事件
const leftMove = banner.leftMove.bind(banner)
const rightMove = banner.rightMove.bind(banner)

//通过监听器调用会改变this指向，需用用bind固定this指向banner
banner.leftBtn.addEventListener('click',leftMove)
banner.rightBtn.addEventListener('click',rightMove)


//防止缩放影响轮播效果
window.addEventListener('resize', () => {
    banner.updateContainer()
})
// 监听过渡开始和结束事件，在过渡开始时移除点击事件，在过渡结束时添加点击事件
//防止过渡时触发点击事件导致潜在问题，如图片闪烁等
window.addEventListener('transitionstart',()=>{
    banner.leftBtn.removeEventListener('click',leftMove)
    banner.rightBtn.removeEventListener('click', rightMove)
})

window.addEventListener('transitionend',()=>{
    banner.leftBtn.addEventListener('click', leftMove)
    banner.rightBtn.addEventListener('click', rightMove)
})

//设置定时轮播
banner.timer = setInterval(()=>{
    banner.rightMove()
},3000)


