'use server'

import dynamic from 'next/dynamic'
const AdminUserFormPage = dynamic(() => import('@/components/admin/UserForm'), { ssr: false })

const AdminCreateUserPage = () => {
  return (
    <AdminUserFormPage />
  )
}

export default AdminCreateUserPage