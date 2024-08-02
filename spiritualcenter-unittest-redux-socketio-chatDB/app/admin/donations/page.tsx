'use client'

import { useState } from "react"
import PaidUsersComponent from "@/components/admin/PaidUsersComponent"
import UnpaidUserComponent from "@/components/admin/UnpaidUserComponent"

const list = [
  { value: 'All Payments', id: 'allPayment' },
  { value: 'Unpaid Donation', id: 'allUnpaidList' },
]

const AdminDonationsPage = () => {
  const [lists, setLists] = useState('All Payments')

  return (
    <main>
      <div className="flex justify-center">
        <select id="donationMenu" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLists(e.target.value)}
          className="w-max mt-5 text-center bg-slate-300">
          {list.map((tab) => (
            <option key={tab.id} id={tab.id} >{tab.value}</option>
          ))}
        </select>
      </div>
      {
        lists === 'All Payments'
          ?
          <PaidUsersComponent />
          :
          <UnpaidUserComponent />
      }
    </main>
  )
}

export default AdminDonationsPage