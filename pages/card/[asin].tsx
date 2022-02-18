import { useAppSelector } from '../../store/store';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Link as MuiLink } from '@mui/material';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import {
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Theme } from '../../colors/Colors';
import MetaContainer from '../../components/MetaContainer';

interface arrItem {
  img: string;
  asin: string;
  price: string;
  bsr_category: string;
  link: string;
  name: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://61fbc6493f1e34001792c5dd.mockapi.io/data/test`
  );
  const resData = await res.json();
  const data = resData[0].products;

  return { props: { data } };
};

export default function ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //const data = useAppSelector((state) => state.defaultData.data);
  const router = useRouter();

  const product = data.filter(
    (item: arrItem) => item.asin === router.query.asin
  );
  const content = `${product[0].name} amazone shop goods devices ${product[0].bsr_category}`;

  return (
    <>
      <MetaContainer
        name={product[0].name}
        content={content}
        title={product[0].name}
      />
      <Card sx={{ width: 285 }} className="card__wrapper">
        <CardMedia
          component="img"
          alt="Product image"
          height="250"
          image={product[0].img}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" height="150">
            {product[0].name}
          </Typography>
          <hr />
          <Typography
            marginTop={2}
            variant="h5"
            component="div"
            /*color={Theme.palette.primary.price}*/
          >
            {product[0].price} $
          </Typography>
          <Typography marginTop={2} variant="body2" color="text.secondary">
            {product[0].asin}
          </Typography>
          <MuiLink marginTop={2} href={product[0].link} underline="hover">
            {product[0].bsr_category}
          </MuiLink>
          <Button variant="outlined" href="#contained-buttons">
            <Link href="/">
              <a>Return</a>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
