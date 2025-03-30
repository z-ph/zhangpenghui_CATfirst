const section5 = {
    imgUrl: ['51.png', '52.jpg', '53.jpeg', '54.jpg'],
    preUrl: './CAT一轮考核/image/',
    imgs:findAll('.section5 img'),
    init() {
        for(const index in this.imgs) {
            this.imgs[index].src = this.preUrl + this.imgUrl[index]
        }
    },
}
section5.init();