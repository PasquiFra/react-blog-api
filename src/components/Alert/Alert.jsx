import './alert.scss'
import { useState } from 'react';

const Alert = ({ error }) => {
    const [dismiss, setDismiss] = useState('')

    if (!error) {
        return
    }
    return (
        <div className={`alert ${dismiss === true ? 'close' : ''}`}>
            <h3>{error}</h3>
            <button className='btn btn-danger' onClick={() => setDismiss(true)}>Dismiss</button>
        </div>
    )
}

export default Alert