import { Link } from "react-router-dom";
import { ImLocation } from 'react-icons/im';
import { HiPlay } from 'react-icons/hi2'
import { useEffect, useState } from "react";
import axios from "axios";


const API = process.env.REACT_APP_API_URL;
let speech = new SpeechSynthesisUtterance();
let synth = window.speechSynthesis;

export default function PointOfInterestCard({ poi_id, name, img, setActiveMarker, toggleModal, setCurrentPoi, setModalCommentary }) {

    const [commentary, setCommentary] = useState("")

    useEffect(() => {
        axios.get(`${API}/commentary/${poi_id}`)
            .then((res) => {
                setCommentary(res.data)
            })
    }, [poi_id])

    console.log(commentary.description)

    let textToSpeech = () => {

        if (!synth.speaking || !synth.paused) {
            speech.text = commentary.description
            speech.rate = 0.85
            synth.speak(speech)
        } else {
            // synth.paused ? synth.resume() : synth.pause();
            synth.cancel()
        }
    }

    let speechPause = () => {
        window.speechSynthesis.cancel()
    }

    const liClick = (name) => {
        toggleModal()
        setCurrentPoi(name)
        setModalCommentary(commentary.description)
    }

    // const shortCommentary = commentary.description.substring(0,75)

    return (
        <div>

            <li className="text-left"
                onMouseOver={() => setActiveMarker(name)}
                onMouseLeave={() => setActiveMarker('')}
                onClick={() => liClick(name)}
            ><span className="float-left px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[400px]"><h3 className="inline-flex text-xl font-bold"><ImLocation />{name}</h3>
                    <section className="border-l-2 border-sky-950 ml-2">
                        <p className="ml-3"><Link onClick={() => textToSpeech()} className="inline-flex text-sky-800"><HiPlay className="mt-1" /> PLAY AUDIO</Link></p>


                        <p className="ml-3">Click to view details about {name} and proceed with yout tour...</p>

                        {/* <Link>Show More</Link> */}
                    </section>

                </span>
                {/* <img className="w-[200px] h-[110px]" src={img} alt={name} /> */}
            </li>
        </div>
    )
}
