import React from 'react'
import ProdutoService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'

const initialState = {
    name: '',
    sku: '',
    description: '',
    price: 0,
    provider: '',
    success: false,
    errors: [],
    updating: false
}


class CadastroProduto extends React.Component {

    state = initialState;

    constructor(){
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const vl = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: vl })
    }

    onSubmit = (event) => {
        const product = {
            name: this.state.name,
            sku: this.state.sku,
            description: this.state.description,
            price: this.state.price,
            provider: this.state.provider
        }
        try{
            this.service.save(product)
            this.fieldClean()
            this.setState({ success: true})
        }
        catch(error){
            const errors = error.errors;
            this.setState({ errors : errors})
        }
    }

    fieldClean = () => {
        this.setState(initialState)
    }

    componentDidMount(){
        const sku = this.props.match.params.sku

        if(sku){
            const result = this
                    .service
                    .getProduct()
                    .filter( product => product.sku === sku )

                    if(result.length){
                        const foundProduct = result[0]
                        this.setState({ ...foundProduct, updating: true})
                    }

        }
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    {this.state.updating ? 'Atualizacao ' : 'Cadastro '}
                    de Produto
                </div>
                <div className="card-body">

                    {
                        this.state.success &&
                            <div className="alert alert-dismissible alert-success">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Uhuuu \o/!</strong> Cadastro realizado com sucesso.
                            </div>
                    }

                    {
                        this.state.errors.length > 0 &&

                        this.state.errors.map( msg => {
                            return(
                                <div className="alert alert-dismissible alert-danger">
                                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                                    <strong>Ops!</strong> {msg}
                                </div>
                            )
                        })
                            
                    }
                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Name: *</label>
                                <input name="name" 
                                    value={this.state.name}  
                                    type="text" 
                                    className="form-control" 
                                    onChange={this.onChange}/>  
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input name="sku" 
                                    value={this.state.sku} 
                                    type="text"
                                    disabled={this.state.updating} 
                                    className="form-control" 
                                    onChange={this.onChange}/>  
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label>Description:</label>
                            <textarea name="description" 
                                value={this.state.description}
                                onChange={this.onChange} 
                                className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Price: *</label>
                                <input name="price" 
                                    value={this.state.price} 
                                    type="text" 
                                    className="form-control" 
                                    onChange={this.onChange}/>  
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Provider: *</label>
                                <input name="producer" 
                                    value={this.state.provider} 
                                    type="text" 
                                    className="form-control" 
                                    onChange={this.onChange}/>  
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-success" onClick={this.onSubmit}>
                                {this.state.updating ? 'Update' : 'Save'}
                            </button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={this.fieldClean}>Clean</button>
                        </div>
                    </div>

                </div>
            </div>      
        )
    }
}

export default withRouter(CadastroProduto);