import Image from "next/image";
import Testimonials from "./testimonials";
import StealDeals from "./stealDeals";
import AppartImg from "@images/ravi-avaala-2d4lAQAlbDA-unsplash.jpg";

export default function Home() {
  return (
    <main>
      <section className="flex gap-5">
        <div className="grid gap-5">
          <h1>Find your dream home Today!</h1>
          <p>
            Every new owner has pour eddort to own one and we help you to get
            the best one you deserve.
          </p>
        </div>
        <Image
          src={AppartImg}
          alt="home_image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-40 h-40 aspect-square object-cover"
        />
      </section>
      <Testimonials />
      <section>
        <h2>Steps to buy your dreams</h2>
        <div>
          <Image
            src={"http://source.unsplash.com/random/300x300/?home"}
            alt="home_image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-40 h-40"
          />
          <Image
            src={"http://source.unsplash.com/random/300x300/?home"}
            alt="home_image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-40 h-40"
          />
          <ol>
            <li>Browsing List</li>
            <li>Contact Us</li>
            <li>Review Property</li>
          </ol>
        </div>
      </section>
      <StealDeals />
      <section>
        <Image
          src={"http://source.unsplash.com/random/300x300/?home"}
          alt="home_image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-40 h-40"
        />
        <div>
          <h2>Want to use our platform?</h2>
          <p>Join us in your journey to become a better Real Estate Agent!</p>
          <button>Register as Agent</button>
        </div>
      </section>
    </main>
  );
}
