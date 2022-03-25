import { List, ListRowRenderer } from 'react-virtualized';
import { ProductItem } from './ProductItem';

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({
  totalPrice,
  results,
  onAddToWishList
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })} */}
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
