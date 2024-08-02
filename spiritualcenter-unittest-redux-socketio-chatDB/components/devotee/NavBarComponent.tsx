import Link from "next/link";
import dynamic from "next/dynamic";
const LogoutComponent = dynamic(() => import("../common/Logout"));

const DevoteeNavigationComponent = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link id="myPaymentsBtn" href={"/devotee/mypayments"}>
              My Payments
            </Link>
          </li>
          <li>
            <Link id="payOnlineBtn" href={"/devotee/payonline"}>
              Pay Online
            </Link>
          </li>
          <li>
            <Link id="profileBtn" href={"/devotee/profile"}>
              Profile
            </Link>
          </li>
          <li>
            <Link id="chat" href={"/chats"}>
              Chat
            </Link>
          </li>
          <li>
            <LogoutComponent />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DevoteeNavigationComponent;
