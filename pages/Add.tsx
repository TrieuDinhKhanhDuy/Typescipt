import Product from '@/Type/Product'
import "./Add.css"
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
type Props = {
  onAdd : (product : Product) => void
}
const Schema = Joi.object({
  title : Joi.string().empty().required().min(6),
  price: Joi.number().empty().required().min(100),
  stock : Joi.number().empty().required().min(0),
  description : Joi.string().allow("",null)
})
const Add = ({onAdd}: Props) => {
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm<Product>(
    {
      resolver : joiResolver(Schema)
    }
  )
  const onSubmit = (product :Product) => {
    onAdd(product)
  }
  return (
    <div className="form-container">
    <p className="title">Add new product</p>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" className="input" placeholder="Title" 
      {...register("title" , {
        required: true,
        minLength : 6
      })}
      />
      {errors.title && <div className='text text-danger'>{errors.title.message}</div>}
      <input type="number" className="input" placeholder="Price" 
       {...register("price" , {
        required: true,
        min : 0
      })}
      />
      {errors.price && <div className='text text-danger'>{errors.price.message}</div>}
      <input type="number" className="input" placeholder="Stock"
       {...register("stock" , {
        required: true,
       min : 100
      })}
      />
      {errors.stock && <div className='text text-danger'>{errors.stock.message}</div>}
      <input type="text" className="input" placeholder="Desciption"
       {...register("description" , {
      })}
      />
      {errors.description && <div className='text text-danger'>{errors.description.message}</div>}
      <button className="form-btn">Submit</button>
    </form>
  </div>
  
  )
}

export default Add