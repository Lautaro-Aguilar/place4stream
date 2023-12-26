import { notFound } from 'next/navigation';

import { isBlockedByUser } from '@/lib/block-service';
import { getUserByUsername } from '@/lib/user-service';
import { isFollowingUser } from '@/lib/follow-service';

import { Actions } from './_components/actions';

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-y-4'>
      {user.username} <p>{`${isFollowing}`}</p>
      <p>is blocked by this user: {`${isBlocked}`}</p>
      <Actions
        isFollowing={isFollowing}
        userId={user.id}
      />
    </div>
  );
};
export default UserPage;
