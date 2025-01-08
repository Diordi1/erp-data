import React from 'react';
import { useEffect,useState } from 'react';
import axios from "axios"
function CenterComponent() {
    let [data,setdata]=useState([]);
    let [sgpa,setsgpa]=useState([]);
    let [final,setfinal]=useState([]);
    let [popup,setpopup]=useState(false);
    let [semester,setsemester]=useState(0);
    let [studentdetails,setstudentdetails]=useState({
        studentName:"",
        studentBranch:""
    })
    let [token,setToke]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJkbiI6InVpZD0yMjExMzAxMjcwLG91PXN0dWRlbnRzLGRjPW1hbml0LGRjPWFjLGRjPWluIiwiY29udHJvbHMiOltdLCJvYmplY3RDbGFzcyI6WyJpbmV0T3JnUGVyc29uIiwic2hhZG93QWNjb3VudCIsInBvc2l4QWNjb3VudCJdLCJzbiI6IlZFTktBVEEiLCJnaXZlbk5hbWUiOiJNIiwib3UiOiJCLlRlY2giLCJwb3N0YWxBZGRyZXNzIjoiMi0yNTAsTUFSS0VUIFNUUkVFVCxHRU9SR0VQRVRBLEFOREhSQSBQUkFERVNIIiwibW9iaWxlIjoiOTc1NzQ3NDA2OSIsIm1haWwiOiJtYWRlbWFkaXR5YTMwMDdAZ21haWwuY29tIiwic2hhZG93TGFzdENoYW5nZSI6IjE5MzEzIiwiZ2lkTnVtYmVyIjoiMTAwMDAiLCJnZWNvcyI6Ik0gVkVOS0FUQSIsImxvZ2luU2hlbGwiOiIvYmluL2Jhc2giLCJjbiI6Ik0gVkVOS0FUQSIsInVpZE51bWJlciI6IjIzMTAxIiwiZGVwYXJ0bWVudE51bWJlciI6IkVsZWN0cmljYWwgRW5naW5lZXJpbmciLCJlbXBsb3llZVR5cGUiOiJTdHVkZW50IiwidWlkIjoiMjIxMTMwMTI3MCIsImhvbWVEaXJlY3RvcnkiOiIvaG9tZS8yMjExMzAxMjcwIiwiZW1wbG95ZWVOdW1iZXIiOiIyMjExMzAxMjcwIiwidXNlclBhc3N3b3JkIjoie1NTSEF9NXo3SWsvcmd6VFYyTTlybEVocko5MHM4ODBtaGdEZXciLCJzdHVkZW50SW5mbyI6W3sicGhvbmVfbm8iOiI5NzU3NDc0MDY5Iiwic3R1ZGVudHVpZCI6MzU1OSwiZnVsbF9uYW1lIjoiTSBWRU5LQVRBIEFESVRZQSBQUkFLQVNIIiwicm9sbF9ubyI6IjIyMTEzMDEyNzAiLCJkb2IiOiIzMC83LzIwMDQiLCJwaG9uZV9udW1iZXIiOiI5NzU3NDc0MDY5IiwiaW5zdGl0dXRlX2VtYWlsX2lkIjoibWFkZW1hZGl0eWEzMDA3QGdtYWlsLmNvbSIsImFjY291bnRzX3BheW1lbnRfdHlwZV9pZCI6OCwic3RhcnRfc2Vzc2lvbiI6MjAyMiwicHJvZ3JhbV9tYXN0ZXJfaWQiOjczLCJwcm9ncmFtX3R5cGVfaWRfY29kZSI6MjcsImNvZGUiOiJCLlRlY2giLCJjb2RlX2Rlc2MiOiJCYWNoZWxvciBvZiBUZWNobm9sb2d5IiwicGF5bWVudF90eXBlIjoiR0VOL09CQy0gSW5jb21lIEJldHdlZW4gMSB0byA1IExha2giLCJob3N0ZWwiOiJINS1CMjQyIn1dLCJzZW1lc3Rlcl90ZXJtIjp7InN0dWRlbnR1aWQiOjM1NTksInNlbWVzdGVyX3JlZ19jb21wbGV0aW9uX3N0YXR1cyI6IlIiLCJzZW1lc3Rlcl90ZXJtX25vX2lkX2NvZGUiOjgsInN0YXJ0X3Nlc3Npb24iOjIwMjIsInByb2dyYW1fbWFzdGVyX2lkIjo3NSwidmVyc2lvbiI6MSwiY3VycmljdWx1bV9zdGFydF9zZXNzaW9uIjoyMDIxLCJzdGFydF9zZW1lc3Rlcl90eXBlX2lkX2NvZGUiOjIsInNlc3Npb24iOjIwMjQsInNjaGVkdWxlX3R5cGVfdmFsdWUiOiIyIiwiY29kZV9kZXNjIjoiU2VtZXN0ZXIgNSIsInJlZ2lzdHJhdGlvbiI6IkNvbmZpcm1lZCIsImRlcHRfaWQiOjMsInByb2dyYW1fbmFtZSI6IkIuVGVjaC4gaW4gRWxlY3RyaWNhbCBFbmdpbmVlcmluZyIsImRlZ3JlZV9sZXZlbF9pZF9jb2RlIjoyOCwicHJvZ3JhbV90eXBlX2lkX2NvZGUiOjI3fSwic3ViamVjdHMiOltdLCJwcm9ncmFtIjpbeyJwcm9ncmFtX21hc3Rlcl9pZCI6NzUsInByb2dyYW1fbmFtZSI6IkIuVGVjaC4gaW4gRWxlY3RyaWNhbCBFbmdpbmVlcmluZyIsInN0YXJ0X3Nlc3Npb24iOjIwMjEsImRlZ3JlZV9sZXZlbF9pZF9jb2RlIjoyOCwicHJvZ3JhbV90eXBlX2lkX2NvZGUiOjI3fSx7InByb2dyYW1fbWFzdGVyX2lkIjo3NiwicHJvZ3JhbV9uYW1lIjoiTWlub3IgU3BlY2lhbGl6YXRpb24gaW4gQ29tcHV0ZXIgU2NpZW5jZSBFbmdpbmVlcmluZyIsInN0YXJ0X3Nlc3Npb24iOjIwMjIsImRlZ3JlZV9sZXZlbF9pZF9jb2RlIjo4MiwicHJvZ3JhbV90eXBlX2lkX2NvZGUiOjI3fV19LCJpYXQiOjE3MzYzMjU1NDQsImV4cCI6MTczNjQxMTk0NH0.jrHHfXXDBJ_PcdygdgryZgZ78EsnKCVxOrCI9qp_F9k");

    let [popupdata,setpopupdata]=useState([]);
    let [studentu,setstudentu]=useState('');
    // let [studentName,setStudentName]=useState('');


    let check=()=>{
        axios.post("https://erpapi.manit.ac.in/api/student_result",{
            
                "studentuid":parseInt(studentu)
        
            
        },{
            headers:{
                Authorization:"Bearer "+token
            }
        }).then(res=>{
            // console.log(res.data.data.Basic_Details[res.data.data.Basic_Details.length-1].full_name);
            // setStudentName();
            setstudentdetails({
                studentName:res.data.data.Basic_Details[res.data.data.Basic_Details.length-1].full_name,
                studentBranch:res.data.data.Basic_Details[res.data.data.Basic_Details.length-1].program_name
            })

            // console.log(res.data.data.FINAL_CGPA)
            setdata(res.data.data.FINAL_CGPA)
            setsgpa(res.data.data.Semester_Data);
            let temp=[];

            for(let i=0;i<sgpa.length;i++){
                temp.push({sgpa1:sgpa[i].data.grand_total.sgpa,cgpa1:data[i]})
            }
            
            setfinal(temp);
            
        }).catch(err=>{
            console.log(err)
            if(err.status==403){

                axios.post("https://erpapi.manit.ac.in/api/login",{
                    "username":"2211301270",
                    "password":"Diordel123"
                }).then(res=>{
                    setToke(res.data.token);


                }).catch(err=>{
                    console.log(err);
                    
                })
            }
        }).finally(()=>{
            

        })
    }

    let handleClick=(event)=>{
        console.log("Clicked");
        setsemester(parseInt(event.target.name)+1)
        setpopupdata(sgpa[event.target.name].data.subjects)
        setpopup(true)
        
    }

    return (
        <div className='container  vh-100 d-flex flex-column gap-5 align-items-center justify-content-center vw-100'>
{/* Modal */}
{
    popup? <div className="modal modal-sheet position-fixed d-flex justify-content-center  ps-0 p-4 py-md-5"  role="dialog" id="modalSheet" style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content rounded-4 shadow" style={{width:"fit-content"}}>
      <div className="modal-header border-bottom-0">
        <h1 className="modal-title fs-5">Semester {semester}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setpopup(false)}></button>
      </div>
      <div className="modal-body py-0">
        {/* <p>This is a modal sheet, a variation of the modal that docs itself to the bottom of the viewport like the newer share sheets in iOS.</p> */}
      </div>
      <div className="modal-footer flex-column align-items-stretch  gap-2 pb-3 border-top-0">
      <table className="table">
  <thead>
    <tr className=''>
      <th scope="col">#</th>
      <th scope="col">Subject</th>
      <th scope="col">Max-Credits</th>
      <th scope="col">Grade Points</th>
      <th scope="col">Grade Points Obtained</th>
      <th scope="col">Grade</th>
      <th scope="col" >Mid Marks(40)</th>
      <th scope="col"  >End Marks(60)</th>
      <th scope="col">Marks Obtained(100)</th>
      
      
      {/* <th></th> */}
    </tr>
  </thead>
  <tbody>{
    popupdata.map((val,idx)=>{
        return <tr key={idx}>
      <th scope="row">{idx+1}</th>
      <td>{val.subname}</td>
      <td>{val.max_credits}</td>
      <td>{val.max_grade_point}</td>
      <td>{val.gradePoint}</td>
      <td>{val.grade}</td>
      <td>{val.mid_term_marks}</td>
      <td>{val.end_term_marks}</td>
      <td>{val.marks_obtained}</td>
      {/* <td><button className='btn btn-primary'>Full Result</button></td> */}
    </tr>
    })
    }
   
  </tbody>
</table>
      </div>
    </div>
  </div>
</div>:""
}
{/* end */}
    <div className="temp gap-5 border border-3 border-dark p-4 rounded shadow bg-light">

            <div className="search-area d-flex gap-3 mb-3">
            <input type="text" className="w-100 border border-dark rounded-pill" placeholder="Student UID" aria-label="Username" aria-describedby="basic-addon1" value={studentu} onChange={(event)=>{
                setstudentu(event.target.value)
            }}/>
            <button type="button" className="btn btn-outline-primary rounded-pill" onClick={check}>Result</button>
                </div>
            {
                studentdetails.studentName?<div className='mb-2'><p>Account Holder : {studentdetails.studentName}</p>
                <p>Branch : {studentdetails.studentBranch}</p>
                </div>:""
            }
            <div className="result">
            <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Semester</th>
      <th scope="col">SCGPA</th>
      <th scope="col">CGPA</th>
      <th scope="col">Full Result</th>
      {/* <th></th> */}
    </tr>
  </thead>
  <tbody>{
      final.map((val,idx)=>{
          return <tr key={idx}>
      <th scope="row">{idx+1}</th>
      <td>Semester {idx+1}</td>
      <td>{val.sgpa1}</td>
      <td>{val.cgpa1}</td>
      <td><button className='btn btn-primary' name={idx} onClick={handleClick}>Full Result</button></td>
    </tr>
    })
    }
    {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      </tr>
      <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      </tr> */}
    
  </tbody>
</table>
            </div>
      </div>
            
        </div>
    );    
}

export default CenterComponent;