import Head from "next/head";

interface metaTags {
    name: string;
    content: string;
    title: string
}

const MetaContainer = ({name, content, title}: metaTags) => {
    return (
        <Head>
            <meta name={name} content={content} key={title}/>
            <title>{title}</title>
        </Head>
    );
};

export default MetaContainer;