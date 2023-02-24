import { Link } from "react-router-dom";
import style from "./Saida.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { GoArrowLeft } from "react-icons/go";


export default function Saida() {


    // Uma constante para jogar dois valores do useState que estão pegando do input.
    const [valor, addValor] = useState({
        valorRemove: "",
    });

    // constante para pegar o conteúdo de useNavigate que é para direcionar para rota que você quer, na linha 30 é o exemplo.
    const navigate = useNavigate();

    // constante para armazena os valores do input que contém o nome "valorAdd" e foi colocada como onChange lá no input.
    const formValores = (e) => {
        addValor((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // constante para 
    const formBtnClick = async e => {
        // e.preventDefault()

        try {
            await axios.post("http://localhost:8800/saida", valor)
            navigate("/saida")
        } catch (err) {
            console.log(err);
        }
    }
    // console.log(valor)





    const [carteira, setCarteira] = useState([]);

    useEffect(() => {
        const fetchCarteira = async () => {
            try {
                const res = await axios.get("http://localhost:8800/saida")
                setCarteira(res.data);
                // console.log(res.data[0].historicoDeSaidas)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCarteira()
    }, []);



    return (
        <div>

            <div className={style.boxStatus}>

                <Link to="/">
                    <button className={style.iconReturn}><GoArrowLeft /></button>
                </Link>

                {carteira.map((carteiras, key) => (
                    <div className={style.status} key={key}>
                        <h1>Saída de Valores</h1>

                        <form>
                            <label htmlFor="removeValor">Adicione sua saída de valor</label>
                            <input type="number" id="removeValor" name="valorRemove" placeholder="Add Valor" onChange={formValores} min="1" />
                            <input type="submit" onClick={formBtnClick} />
                        </form>

                        <p>
                            Histórico total de Saídas
                        </p>
                        <p>{carteiras.historicoDeSaidas}</p>
                        <div className={style.boxButtons}>
                            <h4>
                                Quer adicionar valores?
                            </h4>
                            <Link to="/Entrada">
                                <button className={style.remover}>Click</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}