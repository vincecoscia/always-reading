import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="p-5 text-slate-900">
      <div className="container mx-auto grid grid-cols-3">
        <div className=''>
          <h1 className="font-bold text-xl uppercase ">#AlwaysReading</h1>
        </div>
        <div className=' justify-self-center'>
          <Link href="/" className={router.pathname == "/" ? 'mr-5 font-semibold' : 'mr-5'}>Home</Link>
          <Link href="/blog" className='mr-5'>Blog</Link>
          <Link href="/about" >About</Link>
        </div>
        <div className=''>
        </div>
      </div>
    </nav>
  );
}
