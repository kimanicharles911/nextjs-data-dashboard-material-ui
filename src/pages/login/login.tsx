import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  if(session){
    return<>
      Signed in as {session?.user?.email}
      <p>Welcome {session?.user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  }

  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign In</button>
    </>
}

export default Login;