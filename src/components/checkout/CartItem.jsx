function CartItem({ item, index, removeFromCart }) {
  return (
    <article key={index} className="cart_item">
      <div className="cartImage">
        <img src={item.image} />
      </div>
      <div className="cartName">
        <h2>{item.name}</h2>
      </div>
      <div className="cartQty">
        <h2>{item.qty}</h2>
      </div>
      <div className="cartPrice">
        <h2>€ {item.price}</h2>
      </div>
      <div className="cartSubtotal">
        <h2>
          <b>€ {(+item.price * +item.qty).toFixed(2)}</b>
        </h2>
      </div>
      <div className="delButton">
        <button
          id={item.id}
          type="button"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
