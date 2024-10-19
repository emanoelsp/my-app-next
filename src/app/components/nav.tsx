import Link from 'next/link';

export default function Nav() {
    return (
        <>
            <Link href="/" className="hover:underline hover:font-bold hover:bg-blue-900 hover:text-white p-2">
                Home
            </Link>
            <Link href="/about" className="hover:underline hover:font-bold hover:bg-blue-900 hover:text-white p-2">
                About
            </Link>
            <Link href="/profiles" className="hover:underline hover:font-bold hover:bg-blue-900 hover:text-white p-2">
                Profiles
            </Link>
        </>
    );
}
