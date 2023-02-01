import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/features/auth/authOperations";
import { toast } from "react-toastify";
import { checkIsAuth } from "../redux/features/auth/authSelector";

const LoginPage = () => {  
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector(state => state.auth)
  const isAuth = useSelector(checkIsAuth)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) {
      navigate("/")
    }
  
   
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }))    
      setUsername("")
      setPassword("")
     
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form
        className="w-1/4 h-60 mx-auto mt-40"
        onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-lg text-white text-center" >Авторизація</h1>
        <label className="text-xs text-gray-400">
          Username:
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          />
        </label>

        <label className="text-xs text-gray-400">
          Password:
          <input
            type="Password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          />
        </label>

        <div className="flex gap-8 justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="flex justify-center items-center text-xs text-white bg-gray-600 rounded-sm py-2 px-4"
            type="submit">
            Увійти
          </button>
          <Link
            className="flex justify-center items-center text-xs text-white"
            to={"/register"}>Немає акаунту?</Link>
        </div>
        </form>
    </div>
  )
}

export default LoginPage;