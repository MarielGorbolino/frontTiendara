const ResumenCompra = ({cart,getTotal}) => {
    return <div className="text-white">
        {cart?.detalle?.map((item)=>(
            <div key={item._id}>
                <div>
                    <p  className="text-blue-300">{item.product.title}</p>
                    <p>cantidad: {item.quantity}</p>
                </div>
                <p>${((item.price * item.quantity).toLocaleString("es-AR"))}</p>
            </div>
        ))}

        <div>
            <p className="text-xl">
            Total: <span className="text-green-400 font-bold">${getTotal()}</span>
            </p>
        </div>
    </div>
}

export default ResumenCompra