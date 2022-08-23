import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'
import { Range } from 'react-range'
import Button from '../UI/button/Button'
import { wordsData } from './wordsData'
import { LightningIcon } from '../../svg.module'
import classes from './panel.module.scss'
import baseClass from '../../index.module.scss'
import Alert from '../UI/alert/Alert'

const Panel = ({ 
    color, setColor, 
    lineWidth, setLineWidth, 
}) => {

    const [open, setOpen] = useState(false)
    const [word, setWord] = useState('кота')
    const [showAlert, setShowAlert] = useState(false)

    const handleResetPaintTools = () => {
        setColor('red')
        setLineWidth({values:[3]})
    }
    const handleToggleColorPicker = () => {
        setOpen(e => !e)
    }
    const handleOnChangeColor = (e) => {
        setColor(e.hex)
    }
    const handleToggleTask = () => {
        setShowAlert(e => !e)
    }
    const handleNewTask = (wordsData) => {
        const indexOfWord = randomInteger(wordsData.length)
        setWord(wordsData[indexOfWord])
        setShowAlert(true)
    }

    function randomInteger(max) {
        return Math.floor(Math.random() * max)
    }



    return (
        <div className={classes.panel}>
            <div className={baseClass.container}>
                <div className={classes.row}>
                    
                    <div className={classes.wrapper}>
                        <h5 className={classes.logo} onClick={handleResetPaintTools}>
                            DrawingCat
                        </h5>

                        <div className={classes.colorpiсker}>
                            <div className={classes.color_button} onClick={handleToggleColorPicker}>
                                <div className={classes.choice} style={{
                                    backgroundColor: color,
                                }}></div>
                            </div>
                            { open && (
                                <div className={classes.picker}>
                                    <TwitterPicker
                                        color={color}
                                        onChangeComplete={handleOnChangeColor}
                                    />
                                    <div className={classes.range} >
                                        <Range step={1} min={1} max={20}
                                            values={lineWidth.values}
                                            onChange={(values) => setLineWidth({ values })}
                                            renderTrack={({ props, children }) => (
                                                <div className={classes.track}
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        backgroundColor: color,
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            )}
                                            renderThumb={({ props }) => (
                                                <div className={classes.thumb}
                                                    {...props}
                                                    style={{...props.style,}}
                                                >
                                                    {lineWidth.values}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={classes.form}>
                        <a className={classes.task_link} onClick={handleToggleTask}>
                            <LightningIcon/>
                            <span>Задание</span>
                        </a>
                        <Button className={classes.start_button} onClick={() => handleNewTask(wordsData)}>
                            Получить
                        </Button>
                    </div>

                </div>
            </div>
            { showAlert && (
                <Alert 
                    setShowAlert={setShowAlert}
                    type='task'
                    message={`Нарисуй "${word}"`}
                />
            )}
        </div>
    )
}

export default Panel