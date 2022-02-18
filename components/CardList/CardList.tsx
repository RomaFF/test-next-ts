import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  dataFetched,
  filteredInputValue,
  dataFiltered,
  changeProducts,
} from '../../actions/actions';

import { DataCard } from '../DataCard/DataCard';
import styles from '../../styles/List.module.scss';
import { FilterForm } from '../FilterForm/FilterForm';

const CardList = () => {
  const data = useAppSelector((state) => state.defaultData.data);
  const dispatch = useAppDispatch();
  const router = useRouter();

  let category: string = !router.query.category ? '' : (router.query.category as string);
  let productName: string = !router.query.productName ? 'All products' : (router.query.productName as string);

  dispatch(filteredInputValue(category));
  dispatch(changeProducts(productName));

  let filtered = [...data];

  if (category && category.length > 2 && category !== null) {
    filtered = data.filter((item) =>
      item.name.toLowerCase().includes(category.toLowerCase())
    );
    if (productName && productName !== 'All products') {
      filtered = filtered.filter((item) =>
        item.bsr_category.includes(productName)
      );
    }
  } else {
    if (productName && productName !== 'All products') {
      filtered = data.filter((item) => item.bsr_category.includes(productName));
    }
  }

  return (
    <div className={styles.border}>
      <FilterForm />
      <div className={styles.wrapper}>
        {filtered.map((item) => (
          <DataCard {...item} key={item.asin} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
