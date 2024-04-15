import User from '@/Type/User'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import "./Add.css"
import instance from '@/api/instance'
import { useNavigate } from 'react-router-dom'

const Schema = Joi.object({
  email : Joi.string().empty().required().email({tlds : false}),
  password :Joi.string().empty().required().min(6),
})
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm<User>(
    {
      resolver : joiResolver(Schema)
    }
  )
  const onSubmit = (user :User) => {
    (async () => {
      const {data} = await instance.post(`/login` , user)
      if(data.user){
        sessionStorage.setItem('token', data.accessToken)
        const cf = confirm("Đăng nhập thành công bạn muốn chuyển sang trang home không?")
        if(cf){
          navigate(`/products`)
        }
      }
    })()
  }
  return (
    <div className="form-container">
    <p className="title">Login</p>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" className="input" placeholder="Email" 
      {...register("email" , {
        required: true,
      })}
      />
      {errors.email && <div className='text text-danger'>{errors.email.message}</div>}
      <input type="text" className="input" placeholder="Password" 
       {...register("password" , {
        required: true,
        minLength : 6
      })}
      />
      {errors.password && <div className='text text-danger'>{errors.password.message}</div>}
      <button className="form-btn">Submit</button>
    </form>
  </div>
  
  )
}

export default Login