import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CardList from '../components/CardList/CardList';
import MetaContainer from '../components/MetaContainer';
import { useAppSelector } from '../store/store';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const data = useAppSelector((state) => state.defaultData.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'USER_FETCH_REQUESTED' });
  }, []);

  return (
    <div className={styles.App}>
      <MetaContainer
        name="goods"
        content="amazone shop goods devices"
        title="shop"
      />
      {data ? <CardList /> : <div>Загрузка...</div>}
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['general'])),
  },
});

export default Home;
