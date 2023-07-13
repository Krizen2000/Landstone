import Image from "next/image";

export default function StealDeals() {
  return (
    <section>
      <h2>Have a Look</h2>
      <p>As you reached to this bottom section. Here’s some steal deals</p>
      <ul>
        <li>
          <Image
            src={"http://source.unsplash.com/random/300x300/?home"}
            alt="home_image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-40 h-40"
          />
        </li>
        <li>
          <Image
            src={"http://source.unsplash.com/random/300x300/?home"}
            alt="home_image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-40 h-40"
          />
        </li>
        <li>
          <Image
            src={"http://source.unsplash.com/random/300x300/?home"}
            alt="home_image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-40 h-40"
          />
        </li>
      </ul>
    </section>
  );
}
