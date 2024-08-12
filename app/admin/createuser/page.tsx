'use server'

import dynamic from 'next/dynamic'
const AdminUserFormPage = dynamic(() => import('@/components/admin/UserForm'))

const AdminCreateUserPage = () => {
  return (
    <AdminUserFormPage />
  )
}

export default AdminCreateUserPage