import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  name?: string
  email?: string
  pointsEarned?: number
}

interface ProfileCardProps {
  user: User
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name || 'User'}`} alt={user.name || 'User'} />
          <AvatarFallback>{(user.name || 'U').charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{user.name || 'User'}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-lg text-gray-900">{user.email || 'Not provided'}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Points Earned</dt>
            <dd className="mt-1 text-lg text-gray-900">
              {user.pointsEarned !== undefined ? user.pointsEarned.toLocaleString() : 'Not available'}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

