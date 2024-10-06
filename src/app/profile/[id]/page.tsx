import React from 'react'

interface UserProfileProps {
  params: {
    id: string
  }
}

const UserProfile: React.FC<UserProfileProps> = ({ params }) => {
  return (
    <div>
        <h1>User Profile</h1>
        <hr />
        <p>User Profile page {params.id}</p>
    </div>
  )
}

export default UserProfile