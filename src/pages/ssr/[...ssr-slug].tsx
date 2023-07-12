import { getSubdomain } from "@/utils/getSubdomain";
import { GetServerSideProps } from "next";

const subdomainApiMap: Record<string, string> = {
  qw: process.env.API_URL_QW || "",
  iq: process.env.API_URL_IQ || "",
  // more subdomains and corresponding API URLs...
};

interface PageProps {
  apiReadOnTheServer?: string;
  resolvedUrl?: string;
}

export default function HomePage({
  apiReadOnTheServer,
  resolvedUrl,
}: PageProps) {
  return (
    <div>
      <h3>API URL read on the server: {resolvedUrl}</h3>
      <h3>API URL read on the server: {apiReadOnTheServer}</h3>

      {/* TODO: get API_URL on the client side */}
      <h3>API URL read on the client: ?</h3>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  resolvedUrl,
}) => {
  const subdomain = getSubdomain(resolvedUrl);

  if (!subdomainApiMap[subdomain]) {
    return {
      props: {
        apiReadOnTheServer: "subdomainApiMap[subdomain]_not_found", // Here you'll provide API URL based on subdomain
        resolvedUrl,
      },
    };
  }

  console.log("waiting....");

  // await new Promise((resolve) => setTimeout(resolve, 1 * 60 * 999)); // delay

  console.log("wait done");

  return {
    props: {
      apiReadOnTheServer: subdomainApiMap[subdomain], // Here you'll provide API URL based on subdomain
    },
  };
};
