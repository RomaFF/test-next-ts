import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { filteredInputValue, changeProducts } from '../../actions/actions';
import { useAppSelector } from '../../store/store';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export const FilterForm = () => {
  const data = useAppSelector((state) => state.defaultData.data);
  const { t } = useTranslation('general');

  const filterValue = useAppSelector<string>(
    (state) => state.filteredData.filterValue
  );
  const speciesList = useAppSelector((state) => state.filteredData.speciesList);
  const selectedProduct = useAppSelector(
    (state) => state.filteredData.selectedProduct
  );
  const dispatch = useDispatch();
  const router = useRouter();

  let href = {
    pathname: '/',
    query: { category: '', productName: 'All products' },
  };

  interface MyFormValues {
    filterInput: string;
    species: string;
  }

  return (
    <>
      <Formik
        initialValues={{
          filterInput: filterValue,
          species: selectedProduct,
        }}
        validationSchema={Yup.object({
          filterInput: Yup.string()
            .min(2, t('document.minErr'))
            .required(t('document.reqField')),
        })}
        onSubmit={() => {
          console.log('submit!');
        }}
        validator={() => ({})}
      >
        {({filterInput, species}: MyFormValues) => (
          <Form className="form">
            <label htmlFor="filterInput">{t('document.productName')}</label>
            <Field
              id="filterInput"
              name="filterInput"
              value={filterInput ? filterInput : filterValue}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                href.query.category = e.currentTarget.value;
                href.query.productName = selectedProduct
                  ? selectedProduct
                  : 'All products';
                router.push(href);
                dispatch(filteredInputValue(e.currentTarget.value));
              }}
            />
            <ErrorMessage
              component="div"
              className="error"
              name="filterInput"
            />

            <Field
              as="select"
              name="species"
              value={species !== router.query.productName ? router.query.productName : species}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                href.query.category = filterValue ? filterValue : '';
                href.query.productName = e.currentTarget.value;
                router.push(href);
                dispatch(changeProducts(e.currentTarget.value));
              }}
            >
              {speciesList.map((item: string) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </Field>
          </Form>
        )}
      </Formik>

      <Link
        href={router.pathname}
        locale={router.locale === 'ru' ? 'en' : 'ru'}
        passHref
      >
        <a>Switch to {t('lang.title')}</a>
      </Link>
    </>
  );
};
