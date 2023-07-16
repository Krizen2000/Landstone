import AppartImg from "@images/r-architecture-2gDwlIim3Uw-unsplash.jpg";
import Image from "next/image";
import PropertyViewer from "./propertyViewer";

export default function Properties() {
  return (
    <main className="grid gap-10 mb-14">
      <section className="grid relative h-[80vh]">
        <div className="absolute w-full h-full bg-black brightness-50">
          <Image
            className="absolute w-full h-full object-cover -z-10"
            alt="appartment_pic"
            src={AppartImg}
          />
        </div>
        <div className="px-4 text-white grid content-center gap-5 z-10 md:gap-8 lg:gap-10">
          <h1 className="text-5xl font-extrabold shadow-lg text-center md:text-6xl lg:text-9xl">
            Discover
          </h1>
          <h3 className="text-2xl font-bold shadow-md text-center md:text-3xl lg:text-4xl">
            Find your Home with Us!
          </h3>
          <p className="text-l text-center md:text-xl lg:text-2xl">
            You can search with name or location. It is always about the right
            time to do good things!!
          </p>
        </div>
      </section>
      <PropertyViewer />
    </main>
  );
}
