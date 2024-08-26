
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
function Allurl() {
 
  const [url,setUrl] = useState([])

   useEffect(()=>{
      const fetchData = async ()=>{
         try {
            const urlList =await axios.get('http://localhost:3000/api/all_url')
            const  res = urlList.data.all_url;
            console.log(res)
            setUrl(res);
        } catch (error) {
          console.log(error)
        }
      }
      fetchData();
   },[]);
 
 
 
   return (
    <div className="flex-col pl-10 pr-7 pt-3 h-screen w-screen bg-gray-100  "> 
          {url?.map((item,index)=>(
            <ul className={`my-3 p-4 m-2 space-y-3 rounded-sm ${index%2?'bg-slate-300':'bg-slate-400'}`} key={item._id}>
                 <li> <span className="font-bold">long_url:</span> {item.long_url}</li>
                 <li><span className="font-bold">short_url:</span> {item.short_url}</li>
            </ul>
          ))

          }
    </div>
  )
}

export default Allurl