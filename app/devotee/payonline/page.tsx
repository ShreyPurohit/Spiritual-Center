'use server'

import dynamic from 'next/dynamic';
const DevoteePayOnlinePage = dynamic(() => import('@/components/devotee/PayOnlineClientPage'))
import { decrypt } from '@/lib/auth/auth';
import { cookies } from 'next/headers';

const getCookieUserDate = () => {
  const cookie = cookies().get('auth')
  if (!cookie) return
  const cookieValue = cookie.value
  const decryptedUser = decrypt(cookieValue)
  const { initiationDate } = JSON.parse(decryptedUser);
  return initiationDate
}

const DateServerComponent = async () => {
  const initiationDate = await getCookieUserDate()
  const userMonth = new Date(initiationDate).getMonth() + 1
  const userYear = new Date(initiationDate).getFullYear()

  const years = ["", "2020", "2021", "2022", "2023", "2024"];
  const months = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  let renderMonths: string[] = months.filter((month) => Number(month) >= userMonth)
  let renderYears: string[] = years.filter((year) => Number(year) >= userYear)

  const dateData = {
    allowedMonths: renderMonths,
    allowedYears: renderYears
  }
  return <DevoteePayOnlinePage dateData={dateData} />
}

export default DateServerComponent