import React, { useState } from 'react'
import Panel from './components/Panel/Panel'
import PicBox from './components/PicBox/PicBox'
import Footer from './components/Footer/Footer'
import Helper from './components/Helper/Helper'


const  App = () => {

  const [color, setColor] = useState('red')
  const [lineWidth, setLineWidth] = useState({values: [3]})
  const [showHelper, setShowHelper] = useState(false)

  if(showHelper){
    document.body.style.overflow = 'hidden'        
  } else document.body.style.overflow = 'auto'

  return (
    <main className='App'>
      <Panel 
        color={color} 
        setColor={setColor} 
        lineWidth={lineWidth} 
        setLineWidth={setLineWidth}
      />
      <PicBox 
        color={color}
        lineWidth={lineWidth.values}
      />
      <Footer setShowHelper={setShowHelper} />
      { showHelper && <Helper setShowHelper={setShowHelper} />}
    </main>
  )
}

export default App