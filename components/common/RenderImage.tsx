'use client'

import DummyImage from "@/images/yoga.jpeg";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

type ImageSrc = StaticImageData | string;

const RenderImage = ({ users, css }: { users: string; css: string }) => {
  const [imageSrc, setImageSrc] = useState<ImageSrc>(DummyImage);

  useEffect(() => {
    if (users) {
      setImageSrc(`${process.env.NEXT_PUBLIC_AWS_PROFILE_URL}/${users}`);
    } else {
      setImageSrc(DummyImage);
    }
  }, []);

  return (
    <Image
      className={`relative ${css}`}
      src={imageSrc}
      fill
      sizes=""
      style={{ objectFit: "cover", objectPosition: "center" }}
      alt="User Image"
      key={typeof imageSrc === "string" ? imageSrc : imageSrc.src}
    />
  );
};

export default RenderImage;