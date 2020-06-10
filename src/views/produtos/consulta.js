import React from 'react'
import Card from '../../components/card'
import ProdutosTable from './produtosTable'
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

    prepareEdit = sku => {
        this.props.history.push(`/cadastro-produtos/${sku}`)
    }

    delete = sku => {
        const products = this.service.delete(sku)
        this.setState({ products })
    }

    render(){
        return(
            <Card hearder="Consulta Produtos">
                <ProdutosTable products={this.state.products} 
                editAction={this.prepareEdit} 
                deleteAction={this.delete}/>
            </Card>
        )
    }
}


export default withRouter(ConsultaProduto);