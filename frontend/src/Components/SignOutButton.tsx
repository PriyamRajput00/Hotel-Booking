import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient()
    const {showToast} = useAppContext();

  const mutation = useMutation({
    mutationFn: () => apiClient.signOut(),
    onSuccess: async() => {
         await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({message : "Signed Out" , type : "Success"})
    },
    onError: (error : Error) => {
        showToast({message: error.message , type: "Error"})
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-blue-600 font-bold px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200 "
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
