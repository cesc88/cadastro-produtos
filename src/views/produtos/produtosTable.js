import React from 'react'

export default (props) => (
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Provider</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                props.products.map((product, index) => {
                    return(
                        <tr key={index}>
                            <th>{product.name}</th>
                            <th>{product.sku}</th>
                            <th>{product.price}</th>
                            <th>{product.provider}</th>
                            <th>
                                <button onClick={ () => props.editAction(product.sku)} 
                                className="btn btn-primary">Edit</button>
                                <button onClick={ () => props.deleteAction(product.sku) }
                                className="btn btn-danger">Delete</button>
                            </th>
                        </tr>
                    )}
                )}
        </tbody>
    </table>
)