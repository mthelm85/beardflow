// import Api from '@/router/api'
import Axios from 'axios'
import Cloudinary from '@/cloudinary.js'
import PictureInput from 'vue-picture-input'

export const uploadImg = {
  data () {
    return {
      cloudinary: {
        uploadPreset: 'bxjpjtd2',
        apiKey: Cloudinary.apiKey,
        cloudName: Cloudinary.cloudName
      },
      image: null
    }
  },

  components: {
    PictureInput
  },

  computed: {
    url () {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
    }
  },

  methods: {
    onChange (image) {
      if (image) {
        this.image = image
        this.multiImg(1)
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    onChange2 (image) {
      if (image) {
        this.image = image
        this.multiImg(2)
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    upload (file) {
      return new Promise((resolve, reject) => {
        if (this.image !== null) {
          const formData = new FormData()
          formData.append('file', this.image)
          formData.append('upload_preset', this.cloudinary.uploadPreset)
          // For debug purpose only
          // Inspects the content of formData
          // for (var pair of formData.entries()) {
          //   console.log(pair[0] + ', ' + pair[1])
          // }
          Axios.post(this.url, formData).then(res => {
            const data = res.data
            resolve(data)
          }).catch((err) => {
            reject(err)
          })
        } else {
          const data = {
            url: null
          }
          resolve(data)
        }
      })
    }
  }
}
