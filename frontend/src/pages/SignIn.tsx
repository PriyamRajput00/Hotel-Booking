import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext(); // ✅ get showToast from context
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({ message: "User signed in successfully!", type: "Success" });
      await queryClient.invalidateQueries({
        queryKey : ["validateToken"]
      })
      navigate("/"); // ✅ go to home page
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "Error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      {/* Email Input */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          autoComplete="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      {/* Password Input */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          autoComplete="current-password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

       {/* Submit Button */}
       <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Register ? <Link to = '/register' className="underline">Create an account here</Link>
        </span>
         <button
        type="submit"
        disabled={mutation.isPending} // ✅ disable while loading
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:opacity-50 w-24 "
      >
       Login
      </button>
       </span>
     
    </form>
  );
};

export default SignIn;