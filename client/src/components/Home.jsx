import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const [data, setData] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [qr, setQr] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [view, setView] = useState('card'); 

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('longUrl', longUrl); 
  }, [longUrl]);

  const nav1 = () => {
    navigate("/all-url");
  };

  const handleChange = (e) => {
    setLongUrl(e.target.value);
  };

  const toggle = () => {
    setIsDisabled(!isDisabled);
  };

  const createPost = async () => {
    try {
      if (!longUrl) {
        alert("must fill up the long_url field");
        return;
      }
      const val = await axios.post("http://localhost:3000/api/create_url", {
        long_url: longUrl,
      });
      const res = val.data;
      console.log("API Response:", res);
      if (res.success) {
        console.log("Short URL:", res.newUrl.short_url);
        setData(res.newUrl.short_url);
        toast.success('short url created successfully');
      } else {
        alert("Internal error occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

  const copyUrl = async () => {
    try {
      if (!data) {
        alert("must produce short url first");
        return;
      }
      await navigator.clipboard.writeText(data);
      toast.success('short_url copied successfully');
    } catch (error) {
      alert(error);
    }
  };

  const qrGenerate = async () => {
    try {
      const qr = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
      console.log(qr);
      setQr(qr);
    } catch (error) {
      console.log(error);
    }
  };

  const opa2 = () => {
    toggle();
    qrGenerate();
    setView('qr'); 
  };

  const backToCard = () => {
    setView('card'); 
    setIsDisabled(false); 
  };

  const link =()=>{
     const fbpage = "https://www.facebook.com";
     window.open(fbpage, "_blank");
  }

  const clearUrl = () => {
    setLongUrl(""); 
    setData(""); 
  };



  return (
    <>
      <div className="h-screen w-screen bg-emerald-200 relative">
        <div className="flex-col justify-start absolute space-y-5 mt-20 ml-24">
          <h1 className="font-extrabold text-8xl">
            HI <span className=" text-sky-500">THERE</span>
          </h1>
          <h1 className="font-extrabold text-8xl">WELCOME TO</h1>
          <h1 className="font-extrabold text-8xl text-sky-500 ">
            URL SHORTNER
          </h1>
        </div>

        <div className="flex justify-end">
          {view === 'card' ? (
            <div className="flex-col justify-start text-start bg-slate-200 my-20 mr-36 h-96 w-96 space-y-4 pt-6 rounded-md pl-4 shadow-2xl">
              <div className="space-y-2 border-solid border-black">
                <p className="mr-28 ml-1">your long url</p>
                <input
                  onChange={handleChange}
                  className="bg-white border-black h-10 px-2 w-80 rounded"
                  type="url"
                  name="long_url"
                  placeholder="Enter long link here"
                  value={longUrl}
                  disabled={isDisabled}
                />
              </div>

              <div className="space-y-2">
                <p className="mr-40 ml-2">tiny_url</p>
                <p className="border-black bg-white h-10 px-2 mr-9 pt-1 rounded">
                  {data ? data : ""}
                </p>
              </div>

              <div className="flex justify-start space-x-4 pt-3">
                <button
                  onClick={clearUrl}
                  className="bg-white border-blue-400 border-2 px-5 py-1 rounded-md"
                  disabled={isDisabled}
                >
                  clear
                </button>
                <button
                  onClick={opa2}
                  className="bg-blue-500 px-6 py-1 rounded-md"
                  disabled={isDisabled}
                >
                  QR
                </button>
                <button onClick={link}
                  className="bg-blue-500 px-4 py-1 rounded-md"
                  disabled={isDisabled}
                >
                  share
                </button>
                <button
                  onClick={copyUrl}
                  className="bg-green-500 px-4 py-1 rounded-md"
                  disabled={isDisabled}
                >
                  copy
                </button>
              </div>

              <div className="flex justify-start space-x-3 pt-3">
                <button
                  onClick={nav1}
                  className="bg-white border-solid border-green-500 px-14 py-3 border-2 rounded-md"
                  disabled={isDisabled}
                >
                  my_url
                </button>
                <button
                  onClick={createPost}
                  className="bg-green-600 border-solid text-white px-14 py-3 rounded-md"
                  disabled={isDisabled}
                >
                  short_url
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-col justify-start text-start bg-slate-200 my-20 mr-36 h-96 w-96 space-y-14 pt-4  rounded-md pl-4 shadow-2xl">
            <button
              onClick={backToCard}
              className="flex justify-end bg-blue-500 px-8 py-1 rounded-md mx-64  "
            >
              Back
            </button>
            <img src={qr} alt="QR Code" className="mx-auto" />
          </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Home;
