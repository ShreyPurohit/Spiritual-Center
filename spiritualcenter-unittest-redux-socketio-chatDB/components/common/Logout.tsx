'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/store/hooks';
import { logoutUsersApi } from '@/lib/store/features/Users/fetchUsersApi';

const LogoutComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  
  const handleLogout = () => {
    dispatch(logoutUsersApi())
    router.push('/login');
  };

  return (
    <button id="logoutBtn" onClick={handleLogout}>
      LOGOUT USER
    </button>
  );
};

export default LogoutComponent;