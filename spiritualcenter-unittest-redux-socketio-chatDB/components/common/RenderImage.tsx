import DummyImage from "@/images/yoga.jpeg";
import Image from "next/image";

const RenderImage = ({ users, css }: { users: string; css: string }) => {
  const renderImg = () => {
    if (users) {
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_PROFILE_URL}/${users}`}
          fill
          sizes=""
          alt="User Image"
        />
      );
    } else {
      return <Image className={css} src={DummyImage} alt="User Image" />;
    }
  };

  return <>{renderImg()}</>;
};
export default RenderImage;
