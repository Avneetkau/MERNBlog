import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from "../../Firebase/Firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
     const auth = getAuth(app);

     const dispatch =useDispatch();

     const navigate = useNavigate();


    const handleGoogleClick = async () => {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt : 'select_account'})
      try{
        const  resultFromGoogle = await signInWithPopup( auth, provider);
        //console.log(resultFromGoogle); Here we were only displaying this on console now we will use this to save in backend
        const res = await fetch('https://mern-blog-one-rho.vercel.app/api/auth/google', {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json'},
            body :JSON.stringify({
                name : resultFromGoogle.user.displayName,
                email : resultFromGoogle.user.email,
                googlephotoUrl : resultFromGoogle.user.photoURL,
            }),
        })
        const data = await res.json()
        if(res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
        }
      } catch(error){
        console.log(error);
      }
    }
  return (
    <button
     type="button"
      onClick = {handleGoogleClick}
      className="flex items-center justify-center w-full px-4 py-2 mt-5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      Sign in with Google
    </button>
  );
};

export default OAuth;

