import React from 'react'
import '../../layout/css/PublicPage.css'
import chat from '../../layout/pictures/chat.png'
import LoginButton from '../LoginButton'

function PublicPage() {
    return (
        <div id="LandingPage">
            <section className="bg-dark text-light text-center py-5" >
                <div id="imagecaption">
                    <div id="start" className="container-fluid">
                        <img className="img-fluid" id="chat" src={chat} alt="Chat" />
                    </div>
                    <div id="login" className="container-fluid">
                        <p className='h1 text-light'>Chat in Forums about different Topics or with your friends.</p>
                        <LoginButton />
                    </div>
                </div>
            </section>

            <div className="container-fluid padding" id="aboutus">
                <div className="row welcome text-center justify-content-center">
                    <div className="col-12">
                        <h2 className="display-4">What we offer you</h2>
                    </div>
                    <hr />
                </div>
            </div>

            <section className="p-5">
                <div className="container-fluid">
                    <div className="row text-center">
                        <div className="col-xl">
                            <div className="card bg-secondary text-light">
                                <i className="bi bi-chat-text h1 m-1"></i>
                                <div className="card-body">
                                    <h3 className="card-title">Chats</h3>
                                    <p className="card-text text-center">You can chat with your friend or with your friends in a group.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl">
                            <div className="card bg-secondary text-light">
                                <i className="bi bi-chat-square-dots-fill h1 m-1"></i>
                                <div className="card-body">
                                    <h3 className="card-title">Forums</h3>
                                    <p className="card-text text-center">You can chat in many different forums about your favorite topics.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl">
                            <div className="card bg-secondary text-light">
                                <i className="bi bi-person-check-fill h1 m-1"></i>
                                <div className="card-body">
                                    <h3 className="card-title">2F-Authentication</h3>
                                    <p className="card-text text-center">You can verify yourself with 2FA. Your account is safe.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq" className="p-5">
                <div className="container">
                    <h2 className="display-4 text-center mb-4">Frequently asked questions</h2>
                    <hr />
                    <div className="accordion accordion-flush" id="question">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed bg-secondary text-white" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#question1">
                                    Do I need to be a member of a forum to write?
                                </button>
                            </h2>
                            <div id="question1" className="accordion-collapse collapse" data-bs-parent="#question">
                                <div className="accordion-body bg-dark text-white">No! Everyone can join and write in every forum.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingTwo">
                                <button className="accordion-button collapsed bg-secondary text-white" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#question2">
                                    How can I chat with others?
                                </button>
                            </h2>
                            <div id="question2" className="accordion-collapse collapse" data-bs-parent="#question">
                                <div className="accordion-body bg-dark text-white">Just create a chat and search for the userID of
                                    your friends to add them.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingThree">
                                <button className="accordion-button collapsed bg-secondary text-white" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#question3">
                                    Why should I use MyForums?
                                </button>
                            </h2>
                            <div id="question3" className="accordion-collapse collapse" data-bs-parent="#question">
                                <div className="accordion-body bg-dark text-white">Because MyForums is amazing. MyForums will make
                                    your life better in every aspect.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container" id="socials">
                    <div className="row text-light text-center py-4 justify-content-center">

                        <div className="col-sm-10 col-md-8 col-lg-6">
                            <h1>MyForums</h1>
                            <p>Conntact us or follow us on Social Media.</p>
                            <ul className="social pt-3">
                                <li><a href="https://de-de.facebook.com/" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a></li>
                                <li><a href="https://twitter.com/?lang=de" target="_blank" rel="noreferrer"><i className="bi bi-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a></li>
                                <li><a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="bi bi-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="p-2 text-white text-center position-relative">
                <div className="container">
                    <p className="lead">Copyright &copy; MyForums</p>
                    <a href="#topPage" className="position-absolute bottom-0 end-0 p-3">
                        <i className="bi bi-arrow-up-circle h1"></i>
                    </a>
                </div>
            </footer>

        </div>
    )
}

export default PublicPage