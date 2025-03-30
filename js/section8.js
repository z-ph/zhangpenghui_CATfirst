const section8 = {

    folderPath: './CAT一轮考核/image',
    imagePaths: [
        'CAT一轮考核\\image\\Pale-Blue-600x600.png',
        'CAT一轮考核\\image\\SixtySix-Magazine-600x600.png',
        'CAT一轮考核\\image\\Stir-revised-600x600.png',
        'CAT一轮考核\\image\\Studio_Magazine-2021-600x600.png',
        'CAT一轮考核\\image\\trinityBIA_Sponors-Logos600x600.png',
        'CAT一轮考核\\image\\Umbra_Sponors-Logos600x600.png',
        'CAT一轮考核\\image\\Union600x600.png',
        'CAT一轮考核\\image\\YabuPushelberg-YP-Sponors-Logos600x600.png',
        'CAT一轮考核\\image\\YongeStClair600x600.png'
    ],
    ul: find('.section8 .container'),
    ulScrollWidth: null,
    init() {
        //创建两次循环，确保图片轮播图可以循环播放，实现无限滚动
        this.imgInit();
        this.imgInit();
        this.ulScrollWidth = this.ul.scrollWidth;
        console.log(this.ulScrollWidth);
        this.ul.style.setProperty('--container-scroll-width', `-${this.ulScrollWidth/2}px`);
        window.addEventListener('resize', () => {
            this.ulScrollWidth = this.ul.scrollWidth;
            this.ul.style.setProperty('--container-scroll-width', `-${this.ulScrollWidth/2}px`);
        })
        this.ul.classList.add('animate');
    },
    imgInit() {
        // 遍历图片路径，创建li元素并添加图片
        this.imagePaths.forEach(imagePath => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = 'image';
            li.appendChild(img);
            this.ul.appendChild(li);
        });
    }

};
section8.init();