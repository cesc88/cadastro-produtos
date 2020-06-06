const PRODUCT = '_PRODUCT';

export function ErroValidate(errors){
    this.errors = errors;
}

export default class ProdutoService {

    validate = (product) => {
        const errors = []

        if(!product.name){
        errors.push('The "Name" field is mandatory')
        }

        if(!product.sku){
            errors.push('The "SKU" field is mandatory')
        }

        if(!product.price || product.price <= 0){
            errors.push('The value of the "Price" field must be greater than (0)')
        }

        if(!product.provider){
            errors.push('The "Provider" field is mandatory')
        }

        if(errors.length > 0){
            throw new ErroValidate(errors)
        }
    }

    getProduct = () => {
        const product = localStorage.getItem(PRODUCT)
        if(!product)
            return []
        return JSON.parse(product)
    }

    getIndex = (sku) => {
        let index = null;
        this.getProduct().forEach((product, i) => {
            if(product.sku === sku){
                index = i;
            }
        })
        return index;
    }

    save = (product) => {

        this.validate(product);

        let products = localStorage.getItem(PRODUCT)
        
        if(!products){
            products = []
        }else{
            products = JSON.parse(products)
        }    

        const index = this.getIndex(product.sku)
        if(index === null){
            products.push(product);    
        }else{
            products[index] = product;
        }

        localStorage.setItem(PRODUCT, JSON.stringify(products))
    }

    delete = (sku) => {
        const index  = this.getIndex(sku)
        if(index !== null){
            const product = this.getProduct()
            product.splice(index, 1)
            localStorage.setItem(PRODUCT, JSON.stringify(product) )
            return product
        }
    }
}