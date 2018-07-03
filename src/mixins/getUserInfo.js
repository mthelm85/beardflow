import Api from '@/router/api'
export const getUserInfo = {
  created () {
    Api().get('/account').then((res) => {
      this.profilePicUrl = res.data.profilePicUrl
      this.userName = res.data.userName
      this.userTitle = res.data.userTitle
      this.userEmail = res.data.userEmail
    }).catch((err) => {
      console.log(err)
    })
  },
  data () {
    return {
      profilePicUrl: null,
      userName: null,
      userTitle: null,
      userEmail: null
    }
  }
}
