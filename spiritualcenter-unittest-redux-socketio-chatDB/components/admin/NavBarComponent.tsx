import Link from "next/link";
import dynamic from "next/dynamic";
const LogoutComponent = dynamic(() => import("../common/Logout"));

const AdminNavigationComponent = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={"/admin/userlist"}>All Users</Link>
        </li>
        <li>
          <Link id="userCreateBtn" href={"/admin/createuser"}>
            Create User
          </Link>
        </li>
        <li>
          <Link id="donationBtn" href={"/admin/donations"}>
            Donation
          </Link>
        </li>
        <li>
          <Link id="chats" href={"/chats"}>
            Chat
          </Link>
        </li>
        <li>
          <LogoutComponent />
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigationComponent;
