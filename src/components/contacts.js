import React from 'react'
import "./contacts.css"; 


const Contacts = ({ contacts, searchKey }) => {
  console.log(contacts)
  return (
    <div>
        <div className='cardWrapper'>
      {contacts.map((contact) => (
        <div className="card" key={contact.poi_name}>
          <div className={contact.sentiment == 'positive' ? "green" : contact.sentiment == 'negative' ? "red" : "blue" } >
         <div className="card-body" >
            <div className="card-title">
              <img className="profilepicture"
              src={contact.userProfileImageUrlHttps}
              alt="new"/>
              <h5 className="title">{contact.userName}</h5>
            </div>
            <div className = "card-title">
              <h5 className="date">{contact.createdAt}</h5>
            </div>
            <div className = "card-location">
              <h5> {contact.userLocation}</h5>
            </div>
            <cardWrapper className="buttonTweet" onClick={()=> window.open(`https://twitter.com/TulsiGabbard/status/${contact.id}`, "_blank")} >{contact.fullText}</cardWrapper>
          </div>
          </div>
        </div>
      ))
      }
    </div>
    </div>
  )
};

export default Contacts