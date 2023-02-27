
export default {
    image(img) {
        if (img == undefined) {
            // 이미지 없을 때
            return require(`@/assets/${this.images}`)
        } else {
            return `https://image.tmdb.org/t/p/w300/${img}`
        }
    },
}