import { useNavigate } from "react-router-dom";
const StepTwo = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start justify-between">
      <h1 className="text-3xl font-medium">Password Updated Successfull!</h1>

      {/* Continue Button */}
      <button
        onClick={() => navigate("/login")}
        type="button"
        className="w-full px-[24px] py-[14px] mt-8 bg-greynormal text-white rounded-[8px] font-normal flex justify-center items-center"
      >
        Continue
      </button>
    </div>
  );
};

export default StepTwo;
