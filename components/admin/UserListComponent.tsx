import { getdate } from "@/lib/helpers/helperFunctions";
import { IUser } from "@/lib/helpers/interfaces";
import dynamic from "next/dynamic";
const EditDeleteButtons = dynamic(() => import('@/components/admin/UserEditDeleteButtons'), { ssr: false });
const RenderImage = dynamic(() => import('@/components/common/RenderImage'), { ssr: false });

interface IUserListProps {
    users: IUser[]
}

const UserListComponent: React.FC<IUserListProps> = ({ users }) => {
    return (
        <div className="overflow-x-auto text-center m-2 text-sm lg:text-base">
            <table id="devoteeList" className="md:w-full table table-auto min-w-max">
                <thead>
                    <tr>
                        <th>DevoteeId</th>
                        <th>
                            <div className="flex flex-col">
                                <p>First</p> <p>Name</p>
                            </div>
                        </th>
                        <th>
                            <div className="flex flex-col">
                                <p>Middle</p>
                                <p>Name</p>
                            </div>
                        </th>
                        <th>
                            <div className="flex flex-col">
                                <p>Last</p>
                                <p>Name</p>
                            </div>
                        </th>
                        <th>EmailId</th>
                        <th>Flat No</th>
                        <th>Area</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pincode</th>
                        <th>
                            <div className="flex flex-col">
                                <p>Initiation</p>
                                <p>Date</p>
                            </div>
                        </th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map((user) => (
                        <tr key={user._id} className="hover:bg-slate-200 hover:transition">
                            <td>{user.username}</td>
                            <td>{user.fullName.firstName}</td>
                            <td>{user.fullName.middleName}</td>
                            <td>{user.fullName.lastName}</td>
                            <td>
                                <div className="flex flex-col">
                                    <div>{user.email.split('@')[0]}</div>
                                    <div>@{user.email.split('@')[1]}</div>
                                </div>
                            </td>
                            <td>{user.address.flatNumber}</td>
                            <td>
                                <div className="flex flex-col">
                                    <div>{user.address.area.split(' ')[0]}</div>
                                    <div>{user.address.area.split(' ')[1]}</div>
                                </div>
                            </td>
                            <td>{user.address.city}</td>
                            <td>{user.address.state}</td>
                            <td>{user.address.pinCode}</td>
                            <td>{getdate(user.initiationDate)}</td>
                            <td>
                                <div className="relative h-20">
                                    <RenderImage css="w-14 md:w-20" users={user.photo} />
                                </div>
                            </td>
                            <EditDeleteButtons users={user} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserListComponent