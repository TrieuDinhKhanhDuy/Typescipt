import Product from '@/Type/Product'
import instance from '@/api/instance'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import "./Add.css"
type Props = {
  onEdit : (product : Product) => void
}
const Schema = Joi.object({
  title : Joi.string().empty().required().min(6),
  price: Joi.number().empty().required().min(100),
  stock : Joi.number().empty().required().min(0),
  description : Joi.string().allow("",null)
})
const Edit = ({onEdit}: Props) => {
  const {id} = useParams()
  const[product,setProduct] = useState<Product | null>(null)
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data)
    })()
  },[])
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
    onEdit({...product,id})
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
      defaultValue={product?.title}
      />
      {errors.title && <div className='text text-danger'>{errors.title.message}</div>}
      <input type="number" className="input" placeholder="Price" 
       {...register("price" , {
        required: true,
        min : 0
      })}
      defaultValue={product?.price}
      />
      {errors.price && <div className='text text-danger'>{errors.price.message}</div>}
      <input type="number" className="input" placeholder="Stock"
       {...register("stock" , {
        required: true,
       min : 100
      })}
      defaultValue={product?.stock}
      />
      {errors.stock && <div className='text text-danger'>{errors.stock.message}</div>}
      <input type="text" className="input" placeholder="Desciption"
       {...register("description" , {
      })}
      defaultValue={product?.description}
      />
      {errors.description && <div className='text text-danger'>{errors.description.message}</div>}
      <button className="form-btn">Submit</button>
    </form>
  </div>
  )
}

export default Edit