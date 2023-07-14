export default function Testimonials() {
  return (
    <section className="px-4 py-5 grid gap-8 bg-green-600 md:px-12 md:py-16 lg:px-24">
      <h2 className="text-3xl font-semibold text-center text-white">
        Testimonials
      </h2>
      <ul className="flex flex-wrap gap-6 md:justify-center">
        <li className="max-w-sm">
          <div className="grid gap-5 p-3 rounded text-center text-black bg-yellow-400">
            <h3 className="text-xl">Brock Foreman</h3>
            <p className="text-sm">
              "My wife and I had a dream of downsizing from our house in Cape
              Elizabeth into a small condo closer to where we work and play in
              Portland. David and his skilled team helped make that dream a
              reality."
            </p>
          </div>
        </li>
        <li className="max-w-sm">
          <div className="grid gap-5 p-3 rounded text-center text-black bg-yellow-400">
            <h3 className="text-xl">Pierre Comeau</h3>
            <p className="text-sm">
              I have to say that David is by far the BEST realtor we’ve ever
              worked with, his professionalism, personality, attention to
              detail, responsiveness and his ability to close the deal was
              Outstanding!!!
            </p>
          </div>
        </li>
        <li className="max-w-sm">
          <div className="grid gap-5 p-3 rounded text-center text-black bg-yellow-400">
            <h3 className="text-xl">Amanda Beal</h3>
            <p className="text-sm">
              It is truly a pleasure to work with David – I’ve found that he
              keeps his client’s best interests in sharp focus and you can
              always trust that he is on top of every detail, big and small,
              which brings great peace of mind in any real estate transaction.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}
