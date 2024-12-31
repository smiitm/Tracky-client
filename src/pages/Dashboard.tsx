import { useSession } from "../context/SessionContext";
import { LogSession } from "@/components/LogSession"
import { NewRoutine } from "@/components/newRoutine"
import { RightSide } from "@/components/SideRight"
import { LeftSide } from "@/components/SideLeft"

const Dashboard = () => {
  const { session } = useSession();
  return (
    <div>
      <div className={"h-screen grid grid-cols-5"}>
        <div className="border-r"><LeftSide /></div>

        <main className={"flex-1 col-span-3"}>
          <main className="border-b-2">
            <div className='text-2xl text-center p-2 border-b-2'>
              Tracky dashboard
            </div>
            <div className="flex justify-center my-8">
              <LogSession />
            </div>
          </main>
          <NewRoutine />
          <footer className="text-center py-2">
            <h1>This is a Protected Page</h1>
            <p>User : {session?.user.email || "None"}</p>
          </footer>
        </main>

        <div className="border-l"><RightSide /></div>
      </div>
    </div>
  );
};

export default Dashboard;