import { GetStaticProps } from "next";

interface PageProps {
  apiReadOnTheServer?: string;
  slugString?: string;
}

export default function HomePage({
  apiReadOnTheServer,
  slugString,
}: PageProps) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              {" "}
              <b>API URL read on the server: </b>
            </td>
            <td>{apiReadOnTheServer}</td>
          </tr>

          <tr>
            <td>
              {" "}
              <b>Next public API URL read on the client: </b>
            </td>
            <td>{process.env.NEXT_PUBLIC_QW_API_URL}</td>
          </tr>

          <tr>
            <td>
              <b>SlugString: </b>
            </td>
            <td>{slugString}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [], // Specify pre-rendered routes here or leave it empty if none
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugString = (params?.slug as string[])?.join("/");

  if (!process.env.QW_API_URL) {
    throw new Error("process.env.QW_API_URL is not defined");
  }

  console.log("waiting....");
  // wait for data to be fetched based on the domain process.env.QW_API_URL
  await new Promise((resolve) => setTimeout(resolve, 1 * 2 * 1000)); // 2s delay
  console.log("wait done");

  return {
    props: {
      apiReadOnTheServer:
        process.env.QW_API_URL || `process.env.QW_API_URL (((NOT FOUND)))`,
      slugString,
    },
    revalidate: 3, // Revalidate every 60 seconds
  };
};
