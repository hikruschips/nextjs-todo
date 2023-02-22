import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { FormEvent, useState } from "react";

function getRefinedFirebaseAuthErrorMessage(errorMesssage: string): string {
  return errorMesssage.replace("Firebase: ", "").replace("auth/", "");
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter a valid email address or password");
      return;
    }

    try {
      const auth = getAuth();

      if (isLoggingIn) {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Logged In Successfully.");
      } else {
        //Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
        setError(getRefinedFirebaseAuthErrorMessage(e.message));
      }
    }
  };

  // function submitHandler() {
  //   if (!email || !password) {
  //     setError("Please enter a valid email address or password");
  //     return;
  //   }
  // }

  return (
    <form
      className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="font-extrabold select-none text-2xl sm:text-4xl uppercase">
        {isLoggingIn ? "Login" : "Sign Up"}
      </h1>
      {error && (
        <div className="w-full max-w-[40ch] text-center border-rose-400 border border-solid text-rose-400 py-2">
          {error}
        </div>
      )}
      {message && (
        <div className="w-full max-w-[40ch] text-center border-green-400 border border-solid text-green-400 py-2">
          {message}
        </div>
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        placeholder="Email Address"
        className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-red-600 p-2 w-full max-w-[40ch]"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        placeholder="Password"
        className="outline-none text-red-600 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
      />
      <button
        type="submit"
        className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-red-600"
      >
        <h2 className="relative z-20">SUBMIT</h2>
      </button>
      <h2
        className="duration-300 hover:scale-110 cursor-pointer"
        onClick={() => setIsLoggingIn(!isLoggingIn)}
      >
        {!isLoggingIn ? "Login" : "Sign Up"}
      </h2>
    </form>
  );
}

export default Login;
