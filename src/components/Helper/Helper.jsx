import { useState } from 'react'
import Button from '../UI/button/Button'
import classes from './helper.module.scss'

const Helper = ({ setShowHelper }) => {

    return (
        <div className={classes.helper}>
            <div className={classes.cat}></div>
            <div className={classes.comment}>
                <div className={classes.bubble}>
                    <p className={classes.text}>
                        Привет! Я "Нарисованный кот", а это мое мини приложение для рисования. 
                        Но несмотря на примитивность, тут не так все просто. Тебе предстоит рисовать сложные вещи, которые я тебе буду придумывать, простыми линиями. 
                        Для этого просто кликни по кнопке "Получить" и ты увидешь мое задание. Если захочешь его сменить, то щелкни снова по этой же кнопки, ну а если забудешь задание - слева есть символ молни, где всегда можно посмотреть текущее задание. Как рисовать думаю ты разберешься, ну а на холсте есть кнопки "оценки рисунка", "отчистки холста" и "сохранение твоего творения" соответственно. 
                        Ну а я буду оценивать твои рисунки в зависимости от переданного смысла той абстракции, что я попрошу тебя нарисовать. 
                        Сразу скажу,  необязательно рисовать великие картины, мне нравится минимализм и ассоциация с моим представлением той абстракции. Давай посмотрим сколько балов ты сможешь набрать!
                    </p>
                    <Button onClick={() => setShowHelper(false)}>Дай пять: 🖐</Button>
                </div>
            </div>
        </div>
    )
}

export default Helper