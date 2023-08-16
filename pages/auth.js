import { getSession } from "next-auth/react";
import AuthForm from "../components/auth/auth-form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/loader/loader";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  return <AuthForm />;
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (session) {
//     return { redirect: { destination: "/profile", permanent: false } };
//   }
//   return { props: {} };
// }

export default AuthPage;
