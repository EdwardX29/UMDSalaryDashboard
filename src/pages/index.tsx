import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>UMD Salary Guide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">UMD Salary Guide</h1>
          <div className="inline-flex flex-col mt-8">
            <Link className="text-lg my-2 py-2 px-1 rounded-xl text-white bg-red-600 hover:bg-red-700" href="search/">
              Classic Search
            </Link>
            <Link className="text-lg my-2 py-2 px-1 rounded-xl text-white bg-red-600 hover:bg-red-700" href="staff/">
              Staff Search
            </Link>
          </div>

        </div>


      </main>
    </>
  );
};

export default Home;
