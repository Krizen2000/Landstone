import Image from "next/image";
import Testimonials from "./testimonials";
import StealDeals from "./stealDeals";
import AppartImg from "@images/ravi-avaala-2d4lAQAlbDA-unsplash.jpg";
import Appart2Img from "@images/etienne-beauregard-riverin-B0aCvAVSX8E-unsplash.jpg";
import HomeImg from "@images/r-architecture-2gDwlIim3Uw-unsplash.jpg";
import Home2Img from "@images/daria-nepriakhina-LZkbXfzJK4M-unsplash.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid gap-40 my-14">
      <section className="px-4 flex flex-wrap gap-5 md:flex-nowrap lg:px-24">
        <div className="grid gap-5 content-center">
          <h1 className="text-4xl font-extrabold text-center">
            Find your dream home Today!
          </h1>
          <p className="text-center">
            Every new owner has pour eddort to own one and we help you to get
            the best one you deserve.
          </p>
        </div>
        <Image
          className="w-full object-contain rounded-lg md:w-1/2"
          src={AppartImg}
          alt="home_image"
        />
      </section>
      <Testimonials />
      <section className="px-4 flex flex-wrap gap-10 justify-center md:flex-nowrap lg:px-24">
        <div className="w-full grid gap-8 md:w-3/4">
          <h2 className="text-center text-3xl font-semibold">
            Steps to buy your dreams
          </h2>
          <div className="justify-self-center relative w-full aspect-video md:w-3/4">
            <Image
              className="w-3/4 object-cover absolute top-0 left-0 rounded-lg md:w-3/4"
              src={HomeImg}
              alt="home_image"
            />
            <Image
              className="w-3/4 object-cover absolute bottom-0 right-0 rounded-lg md:w-3/4"
              src={Home2Img}
              alt="home2_image"
            />
          </div>
        </div>
        <ol className="grid gap-5 relative border-l-4 border-green-500 p-3">
          <li className="content-start">
            <div className="w-3 h-3 bg-yellow-500 rounded-full absolute mt-1 -left-2" />
            <p className="text-sm">Step 1</p>
            <h3 className="text-2xl underline">Browsing List</h3>
            <p>Search your desired real estate in our properties page</p>
          </li>
          <li className="content-start">
            <div className="w-3 h-3 bg-yellow-500 rounded-full absolute mt-1 -left-2" />
            <p className="text-sm">Step 2</p>
            <h3 className="text-2xl underline">Contact Agent</h3>
            <p>
              After selecting the property initiate conversation with the agent
            </p>
          </li>
          <li className="content-start">
            <div className="w-3 h-3 bg-yellow-500 rounded-full absolute mt-1 -left-2" />
            <p className="text-sm">Step 3</p>
            <h3 className="text-2xl underline">Review Property</h3>
            <p>At the end visit the real estate before final purchase</p>
          </li>
        </ol>
      </section>
      <StealDeals />
      <section className="px-4 flex flex-wrap gap-5 lg:px-24">
        <Image
          className="w-full object-contain rounded-lg md:w-1/2"
          src={Appart2Img}
          alt="app_image"
        />
        <div className="grid justify-center content-center gap-5">
          <h2 className="text-3xl font-semibold text-center">
            Want to use our platform?
          </h2>
          <p className="text-center">
            Join us in your journey to become a better Real Estate Agent!
          </p>
          <Link
            className="m-auto px-8 py-4 bg-yellow-500 text-white hover:bg-yellow-400 active:bg-yellow-500 rounded-3xl"
            href="/signupAgent"
          >
            Register as Agent
          </Link>
        </div>
      </section>
    </main>
  );
}
