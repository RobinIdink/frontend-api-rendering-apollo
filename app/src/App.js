import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      variants {
        color
        size
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Produkte</h1>
      <ul>
        {data.products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p><strong>Preis: </strong>{product.price} {product.currency}</p>
            <p><strong>Varianten: </strong></p>
            <ul>
              {product.variants.map(variant => (
                <li key={variant.variantId}>
                  {variant.color} - {variant.size}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
