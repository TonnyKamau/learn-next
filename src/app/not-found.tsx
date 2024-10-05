import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <h2 className="text-3xl font-semibold mt-4">Not Found</h2>
          <p className="py-6">Could not find requested resource</p>
          <Link href="/" className="btn btn-primary">Return Home</Link>
        </div>
      </div>
    </div>
  )
}