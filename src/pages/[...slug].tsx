import { GetStaticProps, GetStaticPaths } from "next";

const subdomainApiMap: Record<string, string> = {
  qw: process.env.API_URL_QW || "",
  iq: process.env.API_URL_IQ || "",
  // more subdomains and corresponding API URLs...
};

interface PageProps {
  apiReadOnTheServer?: string;
}

export default function HomePage({ apiReadOnTheServer }: PageProps) {
  return (
    <div>
      <h3>API URL read on the server: {apiReadOnTheServer}</h3>

      {/* TODO: get API_URL on the client side */}
      <h3>API URL read on the client: ?</h3>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subdomain = params?.slug?.[0] as string;

  if (!subdomainApiMap[subdomain]) {
    return {
      props: {
        apiReadOnTheServer: "subdomainApiMap[subdomain]_not_found", // Here you'll provide API URL based on subdomain
      },
      revalidate: 300, // revalidation time
    };
  }

  console.log("waiting....");

  // await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 999)); // delay

  console.log("wait done");

  return {
    props: {
      apiReadOnTheServer: subdomainApiMap[subdomain], // Here you'll provide API URL based on subdomain
    },
    revalidate: 300, // revalidation time
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(subdomainApiMap).map((subdomain) => ({
    params: { slug: [subdomain] },
  }));

  return {
    paths,
    fallback: "blocking", // Important for ISR
  };
};
