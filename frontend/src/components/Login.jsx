import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import shareVideo from "../assets/share.mp4"
import logo from "../assets/logowhite.png"
import { jwtDecode } from "jwt-decode";
import { client } from "../client";
import {AiFillLeftCircle} from "react-icons/ai"



const Login = () => {

  const navigate = useNavigate();
  const createOrgetUser = async (credentialResponse) => {
    const decode = jwtDecode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(decode));
    const { name, picture, sub } = decode;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture
    };
    client.createIfNotExists(doc)
      .then(() => {
        navigate("/", { replace: true });
      });
  }
  return (


    <div className='flex justify-start items-center flex-col h-screen'>
      <div className="relative w-full h-full ">
        <video src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <Link to={"/"}>
        <AiFillLeftCircle   color="white" fontSize={40} className='absolute z-10 justify-center items-center  flex flex-col top-5 right-0 left-3 cursor-pointer bottom-0 '/>
        </Link>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width={130} alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
            shape='square'
              onSuccess={createOrgetUser}
              onError={() => {
                console.log('Login Failed');
              }}
            />;
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login
