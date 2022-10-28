import axios from "axios";

const getDetail = async () => {
  const token = localStorage.getItem('token');  
  const base = process.env.REACT_APP_BASE_URL; 

   token && await axios.get(base + '/detail', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    if(res.data.status === 'success' && res.data.data.role === 'admin')
    {
      window.location.href = '/dashboard'
    } else {
      window.location.href = '/'
    }
  }).catch(err => {
    console.log(err)
  })

  //!token && (window.location.href = '/login' )
}

export default getDetail;