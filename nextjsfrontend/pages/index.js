import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React, { useEffect } from "react";
import { RecentlyViewed } from "../components/RecentlyViewed";
import hikingBackground from "../images/hikingBackground.jpg";
import { MostPopular } from "../components/MostPopular";
import { RecentProducts } from "../components/RecentProducts";
import { FollowInstagram } from "../components/FollowInstagram";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import { Categories } from "../components/FrontPage/Categories";
// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   )
// }



//Home Page

//Featured Section/Banner section

// Top Products

// Instagram Section

// categories section

export const FrontPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "600px",
          width: "100%",
          // backgroundColor: "#CE1121",
          position: "relative",
        }}
      >
        {/* <img src={webBanner} alt="" height="100%"/> */}
        <img
          src={hikingBackground}
          alt="hikingShoes"
          height="100%"
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            width: "100%",
            objectFit: "cover",
            left: "0",
          }}
        />
        Banner
      </div>
      <MostPopular />

      {/* Category Selection */}
      <Categories />
      <div
      className="highlights"
    
      >
        <div
          style={{ display: "grid", height: "fit-content", maxWidth: "300px" }}
        >
          <div>
            <LocalShippingIcon style={{ fontSize: 70 }} />
          </div>
          <h3>Next day delivery in the uk</h3>
          <p>If you order before 3pm</p>
        </div>
        <div
          style={{ display: "grid", height: "fit-content", maxWidth: "300px" }}
        >
          <div>
            <PaymentIcon style={{ fontSize: 70 }} />
          </div>
          <h3>30 day return refund</h3>
          <p>
            Did't not get the right size or colour. 30 days refund no questions
            asked.
          </p>
        </div>
        <div
          style={{ display: "grid", height: "fit-content", maxWidth: "300px" }}
        >
          <div>
            <PaymentIcon style={{ fontSize: 70 }} />
          </div>
          <h3>24/7 Customer Support</h3>
          <p></p>
        </div>
      </div>
      <RecentProducts />

      <Link href="/store">Explore more</Link>

      <FollowInstagram />

      <RecentlyViewed />
    </div>
  );
};


export default FrontPage;