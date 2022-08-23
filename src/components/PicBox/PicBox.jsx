import { useEffect, useRef, useState } from 'react'
import { OkeyIcon, CrossIcon, ImageIcon } from '../../svg.module'
import baseClass from '../../index.module.scss'
import classes from './pic_box.module.scss'

const PicBox = ({ color, lineWidth }) => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [isDrawing, setIsDrawing] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

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
      const {offsetX, offsetY} = nativeEvent
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }
    const finishDrawing = () => {
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
        if(contextRef === null) {
            setShowAlert(true)
        }
        else {
            // набранные очки - сохранять в lockaleStoreg
            // массив вариантов оценки от худщего до лучшего. Индекс будет обозначать кол-очков на вычет и добавление по четным и нечетным
        }
    }
    const handleCleanОff = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
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
                    setShowAlert={setShowAlert}
                    type='error'
                    message='Ничего не было нарисовано!!!'
                />
            )}
        </div>
    )
}

export default PicBox