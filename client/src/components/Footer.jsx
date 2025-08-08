import { Menu, X } from "lucide-react";
import {Link} from 'react-router-dom'


const  Footer = ()=> {
  return (
    <footer className="bg-black border-t-[#fff] border-t-2 text-white p-4 h-[13vh] space-y-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
       
          <div className="text-lg font-semibold w-full flex items-center justify-center">ProgressBook © 2025</div>

          <div className="text-14 text-gray-200 flex items-center justify-center">
            Keep Going 💪 
          </div>
    </footer>
  );
}


export default Footer;