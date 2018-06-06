import React, {Component} from 'react';

let json = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

// 商品行
class ProductRow extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        let style = !this.props.stocked ? {
            color: 'red'
        } : {};

        return (
            <tr>
                <td><span style={style}>{this.props.name}</span></td>
                <td>{this.props.price}</td>
            </tr>
        );
    }
}

// 商品类别行
class ProductCategoryRow extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <tr>
                <th colSpan="2">
                    {this.props.category}
                </th>   
            </tr>
        );
    }
}

// 商品表格
class ProductTable extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        let productsData = {};

        (this.props.productsData || []).forEach((item) => {
            if (productsData[item.category]) {
                productsData[item.category].push(item);
            } else {
                productsData[item.category] = [item];
            }
        })

        let products = [];
        
        Object.keys(productsData).forEach(item => {
            let category = <ProductCategoryRow category={item} />;
            let prod = productsData[item].map(p => 
                 <ProductRow stocked={p.stocked} name={p.name} price={p.price}/>
            );

            products.push(category);
            products.push(prod);
        });

        return (
            <table> 
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                   {products}
                </tbody>
            </table>
        );
    }
}

// 搜索栏
class SearchBar extends Component {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleChange (e) {
        this.props.onSearchChange(e.target.value);
    }

    handleCheck (e) {
        this.props.onStockChecked(e.target.checked);
    }

    render () {
        return (
            <div>
                <div>
                    <input type="text" placeholder="Search..." value={this.props.search} onChange={this.handleChange}/>
                </div>
                <div>
                    <input type="checkbox" checked={this.props.stock} onChange={this.handleCheck}/>Only show products in stock
                </div>
            </div>
        );
    }
}

// 过滤商品表格
class FilterableProductTable extends Component {
    constructor (props) {
        super(props);

        this.state = {
            search: '',
            stock: false,
            product: json
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleStockChecked = this.handleStockChecked.bind(this);
    }

    handleSearchChange (search) {
        this.setState({search: search});
        this.updateProduct(this.state.stock, search);
    }

    handleStockChecked (stock) {
        this.setState({stock: stock});
        this.updateProduct(stock, this.state.search);
    }

    updateProduct (stock, search) {
        this.setState(() => {
            let product = json.filter(item => {
                let name = (item.name).toLowerCase();
                let keyword = (search || '').toLowerCase();
                return name.indexOf(keyword) !== -1  && (stock ? !!item.stocked : true);;
            });
            return {
                product: product
            };
        });
    }

    render () {
        let style = {
            textAlign: 'left',
            marginTop: '100px'
        };
        return (
            <div style={style}>
                <SearchBar search={this.state.search} onSearchChange={this.handleSearchChange}
                    stock={this.state.stock} onStockChecked={this.handleStockChecked} />
                <ProductTable productsData={this.state.product}/>
            </div>
        );
    }
}

export default FilterableProductTable;