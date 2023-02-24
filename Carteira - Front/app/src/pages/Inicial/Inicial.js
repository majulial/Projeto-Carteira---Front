import { Link } from "react-router-dom"
import style from "./Inicial.module.css"

import { useEffect, useState } from "react";
import axios from "axios";


export default function Inicial() {

    const [carteira, setCarteira] = useState([]);

    useEffect(() => {
        const fetchCarteira = async () => {
            try {
                const res = await axios.get("http://localhost:8800")
                setCarteira(res.data);
                // console.log(res.data[0].saldo)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCarteira()
    }, [])


    return (
        <>
            <div className={style.boxStatus}>

                {carteira.map((carteiras, key)=>(
                    <div className={style.status} key={key}>
                        <h1>Sua Carteira</h1>
                        <p>
                            Valor Atual
                        </p>
                        <p>{carteiras.saldo}</p>


                        <div className={style.boxButtons}>
                            <Link to="/entrada">
                                <button className={style.adicionar}>Adicionar</button>
                            </Link>

                            <Link to="/saida">
                                <button className={style.remover}>Remover</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}