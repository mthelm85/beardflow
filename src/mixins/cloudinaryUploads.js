import Axios from 'axios'
import Cloudinary from '@/cloudinary.js'

export const cloudinaryUploads = {
  data () {
    return {
      cloudinary: {
        uploadPreset: 'bxjpjtd2',
        apiKey: Cloudinary.apiKey,
        cloudName: Cloudinary.cloudName
      },
      image1: 'test',
      image2: null
    }
  },

  computed: {
    url () {
      return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`
    }
  },

  methods: {
    onChangeFirst (image) {
      if (image) {
        this.image1 = image
      } else {
        alert('That did not work....')
      }
    },
    onChangeSecond (image) {
      if (image) {
        this.image2 = image
        console.log(this.images)
      } else {
        alert('That did not work....')
      }
    },
    sendToCloudinary () {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', this.image1)
        formData.append('upload_preset', this.cloudinary.uploadPreset)
        // For debug purpose only
        // Inspects the content of formData
        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1])
        }
        Axios.post(this.url, formData).then(res => {
          const data = res.data
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    upload () {
      this.sendToCloudinary().then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
