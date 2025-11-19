const ResumenCompra = ({cart,getTotal}) => {
    return <div className="text-white">
        {cart?.detalle?.map((item)=>(
            <div key={item._id}>
                <div>
                    <p>{item.product.name}</p>
                    <p>cantidad: {item.quantity}</p>
                </div>
                <p>${(item.price * item.quantity)}</p>
            </div>
        ))}

        <div>
            <p>Total:{getTotal()}</p>
        </div>
    </div>
}

export default ResumenCompra