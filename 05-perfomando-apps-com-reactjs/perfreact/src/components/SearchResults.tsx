import { useMemo } from 'react';
import { ProductItem } from './ProductItem';

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map(product => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </div>
  );
}

/**
 * 1. Criar uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 */

// Uso do memo
/**
 * 1. Pure functional Components
 * 2. Reenders too often
 * 3. Re-renders with same props
 * 4. Medium to big size
 */

// useMemo
/**
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */
