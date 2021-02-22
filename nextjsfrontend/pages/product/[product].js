import {
    Breadcrumbs,
    Button,
    Typography,
  } from "@material-ui/core";
  import React, { useEffect, useState, useContext,useRef } from "react";
  import Link from "next/link";
  import { ProductImages } from "../../components/ProductImages";
  import { ProductTabs } from "../../components/ProductTabs";
  import { RecentlyViewed } from "../../components/RecentlyViewed";
  import { commerce } from "../../lib/commerce";
  import { addToHistory } from "../../lib/localStorage";
  import { useSnackbar } from "notistack";
  import { CartContext } from "../../context/CartContext";
  import { SelectSize } from "../../components/SelectSize";
  import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
  
  
  export const ProductPage = (props) => {
      console.log(props);
    const [product, setProduct] = useState({});
    const [size, setSize] = useState('')
    const { changeCart } = useContext(CartContext);
    const { enqueueSnackbar } = useSnackbar();
    const sizeId = useRef();
    const [sizeInfo, setSizeInfo] = useState({});
  
    const fetchItem = (id) => {
      commerce.products
        .retrieve(id)
        .then((cart) => {
          setProduct(cart);
        })
        .catch((error) => {
          console.error("There was an error fetching the cart", error);
        });
    };
  
  
  
    useEffect(() => {
      fetchItem(props.id);
      window.scrollTo(0, 0);
    }, []);
  
  
  
    useEffect(() => {
      if(typeof product?.variants !== "undefined" && product?.variants?.length !==0){
  let sizeObject = {};
        product.variants.forEach((variant)=>{
  
          if(variant.name==="size"){
  
            sizeId.current = variant.id;
            variant.options.forEach((sizes,index)=>{
              sizeObject[sizes.name]= {id:sizes.id, quantity: sizes.quantity}
              
            })
            setSizeInfo(sizeObject);
          }
        })
      }
    }, [product]);
  
    useEffect(() => {
      
      return () => {
        addToHistory(product);
      };
    }, [product]);
  
  
    const handleAddToCart = (item, quantity = 1) => {
      if(size!==''&&  typeof sizeInfo[`${size}`]?.id !=="undefined"){
        commerce.cart
        .add(item.id, quantity,{[sizeId.current]: sizeInfo[`${size}`].id})
        .then((item) => {
          changeCart(item.cart);
          enqueueSnackbar("Item added to the basket", { variant: "success" });
        })
        .catch((error) => {
          console.error("There was an error adding the item to the cart", error);
          enqueueSnackbar("Item could not be added to the basket", {
            variant: "error",
          });
        });
      }else{
        enqueueSnackbar("Please Select a size", {
          variant: "error",
        });
      }
      
    };
  
  
    const changeSize = (size)=>{
      setSize(size)
    }
  
  
    return (
      <div style={{ padding: "0 20px" }}>
        <div
          style={{
            display: "flex",
            margin: "auto",
            width: "fit-content",
            textAlign: "start",
            marginTop: "50px",
            flexFlow:'wrap',
            maxWidth:'100%',
          }}
        >
          
            {/* Product Images */}
            <ProductImages images={product.assets} />
          
      
            <div className="itemDescription">
              <h1>{product.name}</h1>
              {/* +Review bar */}
  
              
              
              <h2>{product?.price?.formatted_with_symbol}</h2>
              <p style={{ color: "green" }}>In Stock {size!==""? ` UK ${size} (${sizeInfo[size]?.quantity || 0} left)`: `(${product.quantity} left)`}</p>
  
              <label htmlFor="sizes" style={{ fontWeight: "bold" }}>
                Select size
              </label>
              <SelectSize availableSizes={sizeInfo} productVariants={product.variants} changeSize={changeSize} size={size}/>
              <a href="#!">Size Guide</a>
              <hr />
              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <Button
                  onClick={() => handleAddToCart(product, 1)}
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  style={{
                    backgroundColor: "#bc2334",
                    color: "white",
                    width: "60%",
                  }}
                >
                  ADD TO BASKET
                </Button>
                <Button variant="contained">BUY NOW</Button>
              </div>
            
  
            {/* tabbed sections with information  */}
          </div>
        </div>
  
        {/* sticky header for when top section is not in view (intersection observer)
         */}
  
        <div
        className="itemNav"
          // style={{
          //   top: "4px",
          //   position: "sticky",
          //   height: "fit-content",
          //   display: "flex",
          //   justifyContent: "space-between",
          //   backgroundColor: "white",
          //   zIndex: "2",
          //   margin: "0 -20px",
          //   padding: " 0",
          //   width: "81%",
          // }}
        >
          <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
            <Link href="/">Home</Link>
            <Link href="/">Store</Link>
            <Typography>{product?.name}</Typography>
          </Breadcrumbs>
  
          <div style={{ display: "flex" }}>
            <img src={product?.assets?.[0]?.url} height="60px" alt="" />
            <h4 style={{ margin: "1em" }}>{product.name}</h4>
            <p>{product?.price?.formatted_with_symbol}</p>
          </div>
  
          <div
          
            style={{
              display: "flex",
              minWidth: "30%",
              width: "fit-content",
              justifyContent: "space-between",
            }}
          >
  
  
            <select
              name="sizes"
              id="sizes"
              style={{ margin: "1em", height: "30px" }}
              value={size}
              onChange={(e)=>changeSize(e.target.value)}
            >
              <option value="" disabled>Select a size</option>
              {[4, 6, 8, 9].map((num, i)=>(
                <option value={num} key={i}>UK {num}</option>
              ))}
  
            </select>
  
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                width: "400px",
                maxWidth: "100%",
              }}
            >
              <Button
                onClick={() => handleAddToCart(product, 1)}
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                style={{
                  backgroundColor: "#bc2334",
                  color: "white",
                  width: "60%",
                  height: "fit-content",
                  margin: "1em 1em 0",
                }}
              >
                ADD TO BASKET
              </Button>
              {/* <Button
                variant="contained"
                style={{
                  backgroundColor: "#bc2334",
                  color: "white",
                  width: "40%",
                  height: "fit-content",
                  margin: "1em 0",
                }}
              >
                BUY NOW
              </Button> */}
            </div>
          </div>
        </div>
        <hr />
        <ProductTabs product={product} />
        
        {/* <ReviewProduct /> */}
        <RecentlyViewed />
      </div>
    );
  };
  

  
export default  ProductPage;



export async function getStaticProps({ params }) {
    console.log(`params`)

    console.log(params)
    let productData = {};
   await commerce.products
      .retrieve(params.product, { type:'permalink'})
      .then((product) => {
        console.log(product);
        productData = product;
      });
    // const data = await getPost(params.slug);
    // const mdxSource = await renderToString(data?.post?.markdownDescription);
    // const aboutProjectMdx = await renderToString(data?.post?.aboutProject);
  
    return {
      props: {
        name: productData?.name || '',
        id: productData?.id || '',
        price: productData?.price?.formatted_with_symbol,
        description: productData?.description || '',
        variants: productData?.variants || '',
      },
    };
  }
  
  export async function getStaticPaths() {
      let products = [];
      await commerce.products
          .list()
          .then(({data}) => {
            
            products=data;
           
          });
    return {
      paths: products?.map(({ permalink }) =>{
          
        console.log('slug - ',permalink)
        return `/product/${permalink}`
      } ) ?? [],
      fallback: true,
    };
  }
  