import Head from "next/head";
import Login from "@/components/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/AuthContext";
import UserDashboard from "@/components/UserDashboard";
export default function Home() {
  const { user } = useAuthContext();
  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/pencil-favicon.ico" />
      </Head>
      {!user && <Login />}
      {user && <UserDashboard />}
    </>
  );
}
