import React, { useEffect, useState } from 'react'

const HomeProducts = () => {

    const [products , setProducts] = useState([]);
    const storedToken = localStorage.getItem('token');
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);
    const [filteredData , setfilteredData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

  const onSearch = (e) => {
    setSearchQuery(e.target.value);
  }


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:5000/api/product/` , {
                    method: 'GET'
                });

                if(!response.ok){
                    console.log("not able to get");
                    throw new Error(`unable to fetch data ${response.status}`);
                }

                const json = await response.json();
                console.log(json);

                if (!Array.isArray(json)) {
                    throw new Error('Expected an array in the products property of the API response.');
                }

                setProducts(json);
            }
            catch(error){
                console.log(error);
                setError("unable to fetch data");
            }
            finally{
                setLoading(false);
            }
        };
            fetchProducts();
        
    },[]);

    const Add = async (e, productId) => {
      try {
        const response = await fetch("http://localhost:5000/api/orders/", {
          method: 'POST',
          headers: {
            'Token': `Bearer ${storedToken}`,
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            userID: "656eac4e1fb6f20967b876f0",
            products: [
              {
                productID: productId,
                quantity: 1
              }
            ],
            amount: 590,
            address: "usa"
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        console.log("Order created successfully!");
      } catch (error) {
        console.error('Error creating order:', error);
        // Handle the error as needed
      }
    }

    useEffect(() => {
      // Filter products based on the search query
      if (searchQuery) {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setfilteredData(filteredProducts);
      } else {
        setfilteredData(null); // Reset filteredData if searchQuery is empty
      }
    }, [searchQuery, products]);

    

    // console.log(storedToken);

    return (
        <>
          <div>Products</div>
          <input type='text' onChange={onSearch} />
      <div className="products">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : filteredData && filteredData.length > 0 || !searchQuery ? (
            <div className="div">
              
              {products.map((i) => (
                <ProductCard
                key={i.id}
                imgSrc={i.imgSrc}
                title={i.title}
                price={i.price}
                id={i.id}
                handler={Add}
              />
              ))}
           </div>
          ) : (
            <p>No products available.</p>
          )}
          </div>
        </>
      );
}

const ProductCard = ({ title, id, price, handler, imgSrc }) => (
  <div className="product-Card">
  <img src={imgSrc} alt={name} />
  <p>{title}</p>
  <h4>${price}</h4>
  <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
    Add to Cart
  </button>
</div>
);

export default HomeProducts