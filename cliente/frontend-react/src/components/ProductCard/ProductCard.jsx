export const ProductCard = ({product}) => {
  return (
    <div className="card w-25">
      <img src={product.thumbnail} className="card-image-top w-full" />
      <div className="card-body">
        <h3>Nombrdsadsae: {product.title}</h3>
      </div>
    </div>
  )
}
