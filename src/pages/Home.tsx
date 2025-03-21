import HomeContent from "../components/home/HomeContent";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
  return (
    <>
    <Navbar/>
    <HomeContent/>
      <div className="text-red-500 text-4xl text-center mt-60">
        Home
      </div>
    </>
  );
};

export default Home;
