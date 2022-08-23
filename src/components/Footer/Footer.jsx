import { useState } from 'react'
import Button from '../UI/button/Button'
import Alert from '../UI/alert/Alert'
import { InfoIcon, CopyIcon } from '../../svg.module'
import baseClass from '../../index.module.scss'
import classes from './footer.module.scss'


const Footer = ({ setShowHelper }) => {

    const [showAlert, setShowAlert] = useState(false)
    const [success, setSuccess] = useState(false)
    const nick = '@Nidatsky'

    const handleCopyTelegramNickname = (nick) => {
        setShowAlert(true)
        navigator.clipboard.writeText(nick)
        .then(() => setSuccess(true))
        .catch(() => setSuccess(false))
    }

    return (
        <footer className={classes.footer}>
            <div className={baseClass.container}>
                <div className={classes.row}>
                    <h5 className={classes.logo}>
                        DrawingCat
                    </h5>
                </div>
                <div className={classes.row}>
                    <div className={classes.list}>
                        <a className={classes.info} onClick={() => setShowHelper(true)}>
                            <InfoIcon/>
                            Как это работает?
                        </a>
                        <div className={classes.copywrite}>
                            © DrawingCat from <b>CONTROLL</b> 2022
                        </div>
                    </div>
                    <Button onClick={() => handleCopyTelegramNickname(nick)}>
                        @Nidatsky
                        <CopyIcon/>
                    </Button>
                </div>
            </div>
            { showAlert && (
                <Alert 
                    setShowAlert={setShowAlert}
                    type={success?'info':'error'}
                    message={`Telegram: ${nick} ${success?'скопирован':'не скопирован'}!`}
                />
            )}
        </footer>
    )
}

export default Footer