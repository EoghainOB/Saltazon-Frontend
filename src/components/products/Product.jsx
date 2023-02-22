function Product({ product, addToCart }) {
  return (
    <>
      <article className="product_item">
        <div className="product_list_img">
          <img src={product.imageUrl} alt="picture of product" />
        </div>
        <section className="product_list_txt">
          <h1>{product.title}</h1>
          <h2>{product.description}</h2>
          <h3>{product.price}</h3>
        </section>
      </article>
    </>
  );
}

export default Product;
