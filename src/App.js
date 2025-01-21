import './index.css'
import { useState } from 'react'
import axios  from 'axios'
import * as XLSX from 'xlsx'

function App() {

  const [msg,setMsg] = useState("")
  const [status, setStatus] = useState(false)
  const [emailList, setEmaillist] = useState([])

  function handlemsg(event){
    setMsg(event.target.value)
  }

  function handleFile(event){
    const file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = function (event) {
      const data = event.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetname = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetname]
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 'A' })
      const totalemail = emailList.map(function(item){return item.A})
      console.log(totalemail)
      setEmaillist(totalemail)
    }

    reader.readAsBinaryString(file)

  }

function send(){
  setStatus(true)
  axios.post("http://localhost:5000/sendemail",{msg:msg,emailList:emailList}).then(function(data){
    if(data.data === true){
      alert("Email Sent Successfully")
      setStatus(false)
      setMsg("")

    }
    else{
      alert("Failed to Send")
    }
  }
)}

  return (
    <>
    <div>
      <div className="bg-red-950 text-white text-center">
        <h1 className='text-2xl font-medium px-5 py-3'>Bulk Mailer</h1>

      </div>
        <div className="bg-red-800 text-white text-center">
          <h1 className=' font-medium px-5 py-3'>Seamlessly send multiple emails at just one click</h1>

        </div>
        <div className="bg-red-600 text-white text-center">
          <h1 className=' font-medium px-5 py-3'>Drag & Drop</h1>

        </div>
        <div className='bg-red-400 flex flex-col items-center text-black px-5 py-5'>
            <textarea onChange = {handlemsg} value={msg} className='w-[80%] h-32 outline-none px-2 border border-black rounded-md'placeholder='Enter the email text.....'></textarea>
            <div>
              <input type="file" onChange={handleFile} className='border-4 border-dashed py-4 px-5 mt-5 mb-5'></input>
              
            </div>
          <p>Total Emails in the file: {emailList.length}</p>
          <button className='bg-red-950 text-white px-4 py-2 font-medium rounded-md mt-2' onClick={send}>{status?"Sending":"Send"}</button>
        </div>
        <div className="bg-red-400 text-white text-center">
          <h1 className=' font-medium px-5 py-3'></h1>

        </div>
        <div className="bg-red-400 text-white text-center">
          <h1 className=' font-medium px-5 py-3'></h1>

        </div>
        <div className="bg-red-400 text-white text-center">
          <h1 className=' font-medium px-5 py-3'></h1>

        </div>

    </div>
    
    </>
  );
}

export default App;
