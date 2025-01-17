'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export default function Header() {
  const router = useRouter();


  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint
      const response = await fetch('http://localhost:2025/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        document.cookie = "userId=; path=/; max-age=0";
        document.cookie = "authToken=; path=/; max-age=0";
        toast.success('Logged out successfully');
        
        localStorage.clear(); // Clear localStorage, if used
        sessionStorage.clear();

        // Redirect to the homepage or login page
        router.push('/');
      } else {
        const errorMessage = await response.text();
        toast.error(`Logout failed: ${errorMessage}`);
      }
    } catch (error) {
      toast.error('An error occurred during logout');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          FlightHub
        </Link>
        <div className="space-x-4">
          <Button asChild variant="ghost">
            <Link href="/search">Search Flights</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/bookings">My Bookings</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/profile">Profile</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}
