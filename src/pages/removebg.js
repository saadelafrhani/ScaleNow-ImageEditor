import Head from 'next/head';

// Components
import Navbar from '../../components/Navbar';
import Removebg from '../../components/Core/index1';
import Footer from '../../components/Footer/footer';


export default function Home() {
    return (
        <div className="p-2 bg-gray-700 ">
            <Head>
                <title>ScaleNow</title>
                <link rel="icon" href="/logo.png" sizes="256x256" />
            </Head>
            <div className="max-w-7xl m-auto">
                <Navbar />
                <Removebg />
            </div>
            <Footer />
        </div>
    )
}
