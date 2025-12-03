import { notFound } from 'next/navigation';

import UserForm from './user-form';

type TUserViewPageProps = {
  UserId: string;
};

export default async function UserViewPage({ UserId }: TUserViewPageProps) {
  const User = null;
  let pageTitle = "Create New User";

  if (UserId !== "new") {
    // const data = await fakeUsers.getUserById(Number(UserId));
    // User = data.User as User;
    if (!User) {
      notFound();
    }
    pageTitle = `Edit User`;
  }

  return <UserForm initialData={User} pageTitle={pageTitle} />;
}
