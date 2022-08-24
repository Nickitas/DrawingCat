import { useEffect, useRef, useState } from 'react'
import Alert from '../UI/alert/Alert'
import { answersData } from './answersData'
import { OkeyIcon, CrossIcon, ImageIcon } from '../../svg.module'
import baseClass from '../../index.module.scss'
import classes from './pic_box.module.scss'

const PicBox = ({ color, lineWidth }) => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [isDrawing, setIsDrawing] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [timeStart, setTimeStart] = useState(0)
    const [timeEnd, setTimeEnd] = useState(timeStart)
    const [points, setPoints] = useState(0)
    const [yes, setYes] = useState(false)


    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
  
        const context = canvas.getContext('2d')
        context.scale(2,2)
        context.lineCap = 'round'
        context.strokeStyle = color
        context.lineWidth = lineWidth
        contextRef.current = context
    }, [])

  
    const startDrawing = ({ nativeEvent }) => {
        setTimeStart(new Date().getSeconds())
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }
    const finishDrawing = () => {
        setTimeEnd(new Date().getSeconds())
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    const draw = ({ nativeEvent }) => {
        if(!isDrawing) {
            return
        }
        const {offsetX, offsetY}  = nativeEvent
        contextRef.current.strokeStyle = color
        contextRef.current.lineWidth = lineWidth
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    const handleCheck = () => {
        // if((timeEnd - timeStart) > 1) {
        //     const randomIndex = Math.floor(Math.random() * answersData.length)
        //     if(randomIndex % 2) {
        //         setYes(true)
        //     }
        //     setPoints(points + randomIndex)
        //     localStorage.setItem('points', points)

        

        //     console.log(randomIndex)
        // }
        // else {
        //     setShowAlert(true)
        // }
    }
    const handleCleanОff = () => {
        setTimeout(() => {
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        },100)
        
    }
    const handleSavePic = async () => {
        if(contextRef === null) {
            setShowAlert(true)
        }
        else {
            const img = canvasRef.current.toDataURL('image/png')
            const blob = await (await fetch(img)).blob()
            const blobURL = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = blobURL
            link.downlode = 'image.png'
            link.click()
        }
    }
    
    return (
        <div className={classes.pic_box}>
            <div className={baseClass.container}>
                <div className={classes.content}>
                    { !isDrawing && <>
                        <button className={classes.ready_button} onClick={handleCheck}>
                            <OkeyIcon/>
                        </button>
                        <button className={classes.clear_button} onClick={handleCleanОff}>
                            <CrossIcon/>
                        </button>
                        <button className={classes.save_button} onClick={handleSavePic}>
                            <ImageIcon/>
                        </button>
                    </>}
                    <canvas 
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        onMouseMove={draw}
                        ref={canvasRef}
                    />
                </div>
            </div>
            { showAlert && (
                <Alert 
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                    type='error'
                    message='Ничего не было нарисовано!!!'
                />
            )}
        </div>
    )
}

export default PicBox