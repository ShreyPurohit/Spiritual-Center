'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/store/hooks';
import { logoutUsersApi } from '@/lib/store/features/Users/fetchUsersApi';
import { toast } from 'react-hot-toast'

const LogoutComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    const toastID = toast.loading("Logging Out...")
    const resultAction = await dispatch(logoutUsersApi())
    if (logoutUsersApi.fulfilled.match(resultAction)) {
      toast.success("Logged Out Successfully", { id: toastID })
    }
    router.push('/login');
  };

  return (
    <button id="logoutBtn" onClick={handleLogout}>
      LOGOUT USER
    </button>
  );
};

export default LogoutComponent;