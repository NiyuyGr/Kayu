import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Landing() {
    return (
        <div>
            <Navbar />
            <section>
                <div className='landing--upperInfo'>
                <div className='landing--fColumn'>
                    <h1 className='landing--title'>Kayú</h1>
                    <div className="landing--info">
                        <p>Kayú es una plataforma con un sistema de recomendaciones personalizadas basadas en el perfil de cada uno de nuestros usuarios.</p>
                        <p className='bold'>¡Regístrate  ahora y comienza a disfrutar de las facilidades que Kayú tiene para ti</p>
                    </div>
                </div>
                <img src='https://inmobiliare.com/himalaya/wp-content/uploads/2022/07/turismo-en-Me%CC%81xico-alt.png' className='landing--img'/>
                </div>
            </section>
            <section className='landing--recomended'>
                <h1 className='landing--recomended-title'>
                    Conoce los sitios que más se recomiendan a nuestros usuarios
                </h1>
            </section>
            <Footer />
        </div>
    )
}

export default Landing