import Image from "next/image";
import Link from "next/link";

const data = [1, 2, 3];

export default function StealDeals() {
  return (
    <section className="grid gap-5 lg:px-24">
      <h2 className="text-3xl font-semibold text-center">Have a Look</h2>
      <p className="text-center">
        As you reached to this bottom section. Here’s some steal deals
      </p>
      <ul className="flex flex-wrap justify-center gap-5 md">
        {data.map((_, inx) => (
          <li key={inx} className="w-full max-w-sm">
            <Link
              href="/"
              className="relative w-5/6 aspect-square mx-auto grid justify-center items-center cursor-pointer "
            >
              <div className="absolute w-full h-full aspect-square rounded-lg bg-black opacity-40 hover:opacity-20 transition-opacity duration-150" />
              <Image
                className="w-full h-full aspect-square object-cover rounded-lg absolute -z-20"
                src={"http://source.unsplash.com/random/300x300/?home"}
                alt="home_image"
                width={0}
                height={0}
                sizes="100vw"
              />
              <div>
                <div className="flex gap-2 items-center justify-center">
                  <i className="bi-geo-alt text-white text-2xl" />
                  <p className="text-white">Location</p>
                </div>
                <h3 className="text-white text-center text-sm">Name</h3>
                <p className="text-white text-center text-3xl">Big Mansion</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
