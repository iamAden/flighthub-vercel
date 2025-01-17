import ProfileCard from '../components/ProfileCard';
import { cookies } from 'next/headers';

async function getProfile() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId');
  try {
    const response = await fetch('http://localhost:2025/profile', {
      credentials: 'include',
      headers: {
        'Cookie': `userId=${userId?.value || ''}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error fetching profile:', response.status, errorMessage);
      return { error: errorMessage };
    }

    return response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


export default async function ProfilePage() {
  const user = await getProfile()

    if (user===null) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">User Profile</h1>
          <p className="text-center text-gray-700">You must be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">User Profile</h1>
        <ProfileCard user={user} />
      </div>
    </div>
  )
}

