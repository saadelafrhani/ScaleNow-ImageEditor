import Head from 'next/head';

// Components
import Navbar from '../../components/Navbar';
import Core from '../../components/Core';
import Footer from '../../components/Footer/footer';


export default function Home() {
  return (
    <div className="p-2 bg-gray-700 ">
      <Head>
        <title>ScaleNow </title>
        <meta
          name="description"
          content="ScaleNow: A user-friendly tool for removing image backgrounds and editing photos seamlessly. Enhance your images with just a few clicks using our responsive web application built with HTML5, CSS3, and JavaScript."
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="max-w-7xl m-auto">
        <Navbar />
        <Core />
      </div>
      <Footer />
    </div>
  )
}
