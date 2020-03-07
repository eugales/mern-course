import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'


const CreatePage = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [link, setLink] = useState('')
  const {request} = useHttp()

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async (event) => {
    if(event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch (e) {

      }
    }
  }


  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <input
          placeholder="Type link"
          id="link"
          type="text"
          value={link}
          onChange={(event) => setLink(event.target.value)}
          onKeyPress={pressHandler}
        />
      </div>
    </div>
  )
}

export default CreatePage
