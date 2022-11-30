import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>#AlwaysReading</title>
        <meta
          name="description"
          content="A blog explaining how to be always reading"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
}
