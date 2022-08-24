import { useEffect } from 'react'
import { InfoIcon, LightningIcon, ErrorIcon, CloseIcon } from '../../../svg.module'
import classes from './alert.module.scss'

const Alert = ({ showAlert, setShowAlert, type, message }) => {

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2500)
    }, [])

    const handleCloseAlert = () => {
        setShowAlert(false)
    }

    return (
        <div className={`${classes.alert} ${showAlert?classes.animation:''}`}>
            <div className={classes.icon}>
                { type=='info'?<InfoIcon/>:type=='task'?<LightningIcon/>:<ErrorIcon/>}
            </div>
            <div className={classes.message}>
                <h5>{ type=='info'?'Успешно!':type=='task'?'Задание:':'Ошибка!'}</h5>
                <p>{ message }</p>
            </div>
            <div className={classes.close} onClick={handleCloseAlert}>
                <CloseIcon/>
            </div>
        </div>
    )
}

export default Alert