import Product from "@/Type/Product";
import { Link } from "react-router-dom";

type Props = {
  product: Product[];
 onDelete : (id : number) => void
};

const Home = ({ product, onDelete }: Props) => {
  return (
    <table className="table">
      <thead>
      <Link to={"/products/add"} className="btn btn-primary">Add new Product</Link>
      <Link to={"/register"} className="btn btn-primary">Register</Link>
      <Link to={"/login"} className="btn btn-primary">Login</Link>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Description</th>
          <th scope="col">Acction</th>
        </tr>
      </thead>
      <tbody>
        {product.map((item) => (
          <tr key={item.id}>
            <th>{item.id}</th>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.stock}</td>
            <td>{item.description}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(Number(item.id))}
              >
                Delete
              </button>
              <Link to={`/products/edit/${item.id}`} className="btn btn-primary">
                Update
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
