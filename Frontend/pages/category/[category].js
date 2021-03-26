import React, { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import Link from "next/link";
import { RecentlyViewed } from "../../components/Common/RecentlyViewed";
import Skeleton from "@material-ui/lab/Skeleton";
import { Breadcrumbs, Typography } from "@material-ui/core";
import runningBackground from "../../images/runningBackground.jpg";
import hikingBackground from "../../images/hikingBackground2.jpg";
import casualBackground from "../../images/casualBackground2.jpg";
import { ItemImage } from "../../components/Common/ItemImage";
import PropTypes from "prop-types";
import { Filters } from "../../components/StorePage/Filters";
import { useLazyQuery } from "@apollo/client";
import { LOAD_ALL_CATEGORY_PRODUCTS} from "../../GraphQL/Queries"

export const CategoryPage = ({category, description, numOfProducts, slug}) => {

const [getProducts, {data}] = useLazyQuery(LOAD_ALL_CATEGORY_PRODUCTS);

  // const [products, setProducts] = useState(
  //   Array.from({ length: 12 }, (v, i) => i)
  // );
  const [products, setProducts] = useState([]);

  const fetchProducts = (category) => {
    commerce.products
      .list({
        category_slug: category,
      })
      .then((item) => {
        setProducts((items) => [products, ...item.data]);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  useEffect(() => {
    // fetchProducts(slug);
    getProducts({variables: {category: slug}})
  }, [category]);

  useEffect(() => {
    console.log(data)
    if(data?.getAllProducts !== undefined){
      setProducts([...data.getAllProducts])
    }
    return () => {
    }
  }, [data])

  useEffect(() => {
    setProducts([])
    return () => {
      setProducts([])
    }
  }, [])

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "300px",
          width: "100%",
          position: "relative",
        }}
      >
        <img
            src={category==="running"? runningBackground : (category==="hiking")? hikingBackground: casualBackground}
            alt=""
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              width: "100%",
              objectFit: "cover",
              left: "0",
              objectPosition: category==="casual"? "75% 65%" : "50% 50%",
            }}
          />
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/store">Store</Link>
          <Typography>
            {category}
          </Typography>
        </Breadcrumbs>

        <div>
          <h2>
            {category}({numOfProducts})
          </h2>
          <p style={{ maxWidth: "600px", margin: " 0 auto 20px" }}>
            {description}
          </p>
          <Filters/>
        </div>

        <ul
          style={{
            display: "flex",
            flexFlow: "wrap",
            listStyle: "none",
            gap: "20px",
            margin: "auto",
            justifyContent: "center",
            padding: "0",
          }}
        >
          {products?.map((item, index) => (
            <li
              key={index}
              style={{
                width: "24%",
                minWidth: "150px",
                flexGrow: "1",
                maxWidth: "300px",
                boxSizing: "border-box",
              }}
            >
              {typeof item !== "object" ? (
                <>
                  <Skeleton
                    variant="rect"
                    height={200}
                    width={200}
                    style={{
                      margin: "0px auto",
                      maxWidth: "100%",
                      maxHeight: "20vh",
                    }}
                  ></Skeleton>
           

                  <Skeleton
                    height={50}
                    width={150}
                    style={{ margin: "0px auto 0" }}
                  ></Skeleton>
              
                </>
              ) : (
                <>
                  <ItemImage
                    id={item.id}
                    name={item.name || item.productName}
                    firstImage={item?.media?.source || `${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[0]}`}
                    secondImage={item?.assets?.[1]?.url ||`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[1]}`}
                    link={item.permalink || item.slug}
                  />
                  <h4 style={{ margin: "10px auto 0" }}>{item.name || item.productName}</h4>
                  <p style={{ margin: "auto" }}>
                    {item.price?.formatted_with_symbol || item.price}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>

        <RecentlyViewed />
      </div>
    </div>
  );
};

export default  CategoryPage;


CategoryPage.propTypes = {
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  numOfProducts: PropTypes.number.isRequired,
  slug:PropTypes.string.isRequired,
};

CategoryPage.defaultProps = {
  category: 'Running',
  description: '',
  numOfProducts: 0,
  slug:'running',
};



export async function getStaticProps({ params }) {
    console.log(`params`)
    console.log(params)
    let categoryData = {};
   await commerce.categories
      .retrieve(params.category, { type: "slug" })
      .then((category) => {
        console.log(category);
        categoryData = category;
      });
    // const data = await getPost(params.slug);
    // const mdxSource = await renderToString(data?.post?.markdownDescription);
    // const aboutProjectMdx = await renderToString(data?.post?.aboutProject);
  
    return {
      props: {
        category: categoryData?.name || '',
        description: categoryData?.description || '',
        numOfProducts: categoryData?.products || 0,
        slug: categoryData?.slug || '',
      },
    };
  }
  
  export async function getStaticPaths() {
      let categories = [];
      await commerce.categories
          .list()
          .then(({data}) => {
            
            categories=data;
            console.log(categories);
           
          });
    return {
      paths: categories?.map(({ slug }) =>{
        console.log('slug - ',slug)
        return `/category/${slug}`
      } ) ?? [],
      fallback: true,
    };
  }
  