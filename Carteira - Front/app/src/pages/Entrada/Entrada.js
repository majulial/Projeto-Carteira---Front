import { Link } from "react-router-dom"
import style from "./Entrada.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { GoArrowLeft } from "react-icons/go";


export default function Entrada() {

    // Uma constante para jogar dois valores do useState que estão pegando do input.
    const [valor, addValor] = useState({
        valorAdd: "",
    });

    // constante para pegar o conteúdo de useNavigate que é para direcionar para rota que você quer, na linha 30 é o exemplo.
    const navigate = useNavigate();

    // constante para armazena os valores do input que contém o nome "valorAdd" e foi colocada como onChange lá no input.
    const formValores = (e) => {
        addValor((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    // constante para 
    const formBtnClick = async () => {

        try {
            await axios.post("http://localhost:8800/entrada", valor)
            navigate("/entrada")
        } catch (err) {
            console.log(err);
        }
    };




    const [carteira, setCarteira] = useState([]);

    useEffect(() => {
        const fetchCarteira = async () => {
            try {
                const res = await axios.get("http://localhost:8800/entrada")
                setCarteira(res.data);
                // console.log(res.data[0].historicoDeEntradas)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCarteira()
    }, [])



    return (

        <div>

            <div className={style.boxStatus}>


                <Link to="/">
                    <button className={style.iconReturn}><GoArrowLeft /></button>
                </Link>

                {carteira.map((carteiras, key) => (
                    <div className={style.status} key={key}>
                        <h1>Entrada de Valores</h1>

                        <form>
                            <label htmlFor="addValor">Adicione seu valor</label>
                            <input type="number" id="addValor" name="valorAdd" placeholder="Add Valor" onChange={formValores} min="1" />
                            <button type="submit" onClick={formBtnClick}>Enviar</button>
                        </form>

                        <p>
                            Histórico total de Entrada
                        </p>
                        <p>{carteiras.historicoDeEntradas}</p>

                        <div className={style.boxButtons}>

                            <h4>
                                Quer adicionar Saídas?
                            </h4>

                            <Link to="/saida">
                                <button className={style.remover}>Click</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}