function CartItem({ item, removeFromCart, updateQty }) {
  return (
    <>
      <div className="cartImage">
        <img src={item.image} />
      </div>
      <div className="cartName">
        <h2>{item.name}</h2>
      </div>
      <div className="cartQty">
        <select
          name="quantity"
          id={`quantity_${item.id}`}
          value={item.qty}
          onChange={(e) => updateQty(e, item.id)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
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
    </>
  );
}

export default CartItem;
