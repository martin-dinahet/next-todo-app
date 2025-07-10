import type { FC } from "react";

const IndexPage: FC = () => {
  return (
    <div className="h-screen w-screen">
      <section className="grid h-screen w-full place-items-center">
        <article className="card card-border w-md">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Hello, World! <span className="badge">Badge</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, molestiae omnis quam soluta id mollitia, voluptates
              alias dicta, maiores cum expedita quo. Pariatur, distinctio
              impedit obcaecati provident labore adipisci natus?
            </p>
            <div className="card-actions mt-4 justify-end">
              <button className="btn btn-accent">Buy now</button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default IndexPage;
