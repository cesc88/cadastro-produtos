import React from 'react'
import ProdutoService from '../../app/produtoService'
import { withRouter} from 'react-router-dom'

class ConsultaProduto extends React.Component{


    state = {
        products: []
    }

    constructor(){
        super()
        this.service = new ProdutoService();
    }

    componentDidMount(){
        const products = this.service.getProduct();
        this.setState({ products })
    }

    prepareEdit = (sku) => {
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }


    render(){
        return(
            <div className="card">
                <div className="card-header">
                    Consulta Produtos
                </div>
                <div className="card-body">
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
                        {this.state.products.map((product, index) => {
                            return(
                                <tr key={index}>
                                    <th>{product.name}</th>
                                    <th>{product.sku}</th>
                                    <th>{product.price}</th>
                                    <th>{product.provider}</th>
                                    <th>
                                        <button onClick={ () => this.prepareEdit(product.sku)} className="btn btn-primary">Edit</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </th>
                                </tr>
                                )}
                            )}
                    </tbody>
                </table>
            </div>
        </div> 
        )
    }
}


export default withRouter(ConsultaProduto);