import Link from "next/link";
import React from "react";


const Footer = () => {

    return (
        <div className="px-2">
            <div className="py-4 border-b border-b-gray-800 flex justify-between items-center max-w-6xl m-auto">
              {/* empty div  */}
            </div>

            <div className="py-8 flex flex-col gap-4 justify-between items-center max-w-6xl m-auto sm:flex-row sm:gap-0">
                <ul className="flex justify-center items-center gap-4">
                    <li className="text-gray-400 text-sm" title="CompressImages">
                        {/* */}
                        <Link href="/" className="font-bold ease-in-out duration-150 hover:text-white">
                            Compress Image
                        </Link>
                    </li>
                    <li className="text-gray-400 text-sm" title="Projects">
                        <Link href="/removebg" className="font-bold ease-in-out duration-150 hover:text-white">
                           Remove Background
                        </Link>
                    </li>
                </ul>
                <h5 className="text-white font-initial text-sm">&copy; 2024 ScaleNow. All Rights Reserved.</h5>
            </div>
        </div>
    );
}

export default Footer;