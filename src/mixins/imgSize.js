export const imgSize = {
  computed: {
    width () {
      switch (this.$mq) {
        case 'desktop':
          return '150'
        case 'laptop':
          return '150'
        case 'tablet':
          return '100'
        case 'mobile':
          return '75'
      }
    },
    height () {
      switch (this.$mq) {
        case 'desktop':
          return '150'
        case 'laptop':
          return '150'
        case 'tablet':
          return '100'
        case 'mobile':
          return '75'
      }
    }
  }
}
