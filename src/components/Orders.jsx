import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [products , setProducts] = useState([]);
  const storedToken = localStorage.getItem('token');
  const id = localStorage.getItem('ID')
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        try{
            const response = await fetch("http://localhost:5000/api/orders/" , {
                method: 'GET',
                headers: {
                  'Token': `Bearer ${storedToken}`,
                }
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

const handleDelete = async (e, contactId) => {
  try{
      const response = await fetch(`http://localhost:5001/api/contacts/${contactId}` , {
          method: 'DELETE'
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact._id !== contactId)
  );
  }
  catch (error) {
      console.error('Error deleting contact:', error);
      // Handle the error as needed
  }
}

  return (
    <>
    <div>Products</div>

    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>{error}</p>
    ) : Array.isArray(products) && products.length > 0 ? (
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.title} - {product.desc} - {product.category}
            <button onClick={(e) => handleDelete(e ,product.name)} data-productId={product._id}>Delete</button>
          </li>
        ))}
      </ul>
    ) : (
      <p>No products available.</p>
    )}
  </>
  );
}

export default Orders