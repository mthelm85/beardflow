import Api from '@/router/api'
import Axios from 'axios'
import Cloudinary from '@/cloudinary.js'
import PictureInput from 'vue-picture-input'

export const uploadImg = {
  data () {
    return {
      cloudinary: {
        uploadPreset: Cloudinary.uploadPreset,
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
    },
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
  },

  methods: {
    onChange (image) {
      if (image) {
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    upload (file) {
      const formData = new FormData()
      formData.append('file', this.image)
      formData.append('upload_preset', this.cloudinary.uploadPreset)
      formData.append('tags', 'profile_pic')
      formData.append('public_id', this.userEmail)
      // For debug purpose only
      // Inspects the content of formData
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      Axios.post(this.url, formData).then(res => {
        this.profilePicUrl = res.data.url
        Api().post('/account-setup', {
          userEmail: this.userEmail,
          profilePicUrl: this.profilePicUrl,
          userName: this.userName,
          userTitle: this.userTitle
        }).then(() => {
          this.$router.push('/profile')
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
