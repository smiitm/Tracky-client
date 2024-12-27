import { useSession } from "../context/SessionContext";
import { Navbar } from "@/components/navbar"

const Dashboard = () => {
  const { session } = useSession();
  return (
    <>
      <Navbar />

      <main>
        <div className='text-5xl text-center p-8 border-b-2'>
          Tracky dashboard 
        </div>
        <section className="text-center py-2">
          <h1>This is a Protected Page</h1>
          <p>User : {session?.user.email || "None"}</p>
        </section>
      </main>
    </>
  );
};

export default Dashboard;