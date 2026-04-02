import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Stranica nije pronađena</h2>
      <p className="text-gray-600 mb-8 text-center">
        Stranica koju tražite ne postoji ili je premeštena.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Na početnu
      </Link>
    </div>
  );
}

