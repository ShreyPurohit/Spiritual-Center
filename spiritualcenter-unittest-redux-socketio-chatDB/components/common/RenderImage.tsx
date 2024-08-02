import DummyImage from "@/images/yoga.jpeg";
import Image from "next/image";

const RenderImage = ({ users, css }: { users: string; css: string }) => {
  const renderImg = () => {
    if (users) {
      return (
        <Image
          src={`${process.env.AWS_PROFILE_URL}/${users}`}
          className="min-w-20 h-20 md:w-32 md:h-32 object-cover mx-auto"
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
