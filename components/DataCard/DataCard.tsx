import { Card, CardContent, CardActions, CardMedia, Button, Typography, Link as MuiLink } from '@mui/material';

import Link from 'next/link'
import { Theme } from '../../colors/Colors';

import styles from '../../styles/DataCard.module.scss'

interface dataProps {
    img: string;
    asin: string;
    price: string;
    bsr_category: string;
    link: string;
    name: string;
}

export const DataCard = ({img ,asin, price, bsr_category, link, name}: dataProps) => {

    return (
        <Card sx={{ width: 285 }} className={styles.wrapper}>
            <CardMedia
                component="img"
                alt="Product image"
                height="250"
                image={img}
                />
            <CardContent>
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    height="150"
                >
                    {name}
                </Typography>
                <hr/>
                <Typography 
                    marginTop={2}
                    variant="h5" 
                    component="div"
                    /*color={Theme.primary.price}*/
                >
                    {price} $
                </Typography>
                <Typography 
                    marginTop={2}
                    variant="body2" 
                    color="text.secondary"
                >
                    <li>
                        <Link href={`/card/${asin}`}>
                            <a>{asin}</a>
                        </Link>
                    </li>
                </Typography>
                <MuiLink 
                    marginTop={2}
                    href={link} 
                    underline="hover"
                >
                    {bsr_category}
                </MuiLink>
            </CardContent>
        </Card>
    )

}