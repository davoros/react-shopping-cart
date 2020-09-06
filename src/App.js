import React from 'react';
import data from './data.json'
import Products from './components/Products';
import Filter from './components/Filter';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  filterProducts = (event) => {
    const selectedSize = event.target.value;
    this.setState({
      size: selectedSize,
      sort: this.state.sort,
      products: selectedSize === ""? data.products : data.products.filter(
        (product) => product.availableSizes.indexOf(selectedSize) >= 0
      ),
    });
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort: sort,
      filter: this.state.filter,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest" ? a.price > b.price ? 1 : -1
          : 
          sort === "highest" ? a.price < b.price ? 1 : -1
            :
            a._id > b._id? 1 : -1
            
      ))
    })
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart </a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All rigths reserved. </footer>
      </div>
    );
  }
}

export default App;
