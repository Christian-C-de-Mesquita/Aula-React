import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const url = "http://localhost:3000/produto";

  const [id, setId] = useState('');
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [foto, setFoto] = useState('');

  const [classInserir, setClassInserir] = useState('');
  const [classAlterar, setClassAlterar] = useState('sumir');
  const [data, setData] = useState([]);

  /*** Carregar dados do banco  */
  useEffect(() => {
    axios.get(url)
        .then( res => setData(res.data))
        console.log(data);
  },[data, setData]);

    /*** Inserir dados do banco  */
  const Inserir = () => {
    axios.post(url, {
      produto, valor, quantidade, foto
    })
  }

    /*** Cadastrando dados do banco  */
  const Cadastrar = (e) => {
    e.preventDefault()

      if(produto === ""){
        alert("Por favor preencha o campo nome do produto")
      }else if(valor === ""){
        alert("Por favor preencha o campo valor do produto")
      }else if(quantidade === ""){
        alert("Por favor preencha o campo quantidade do produto")
      }else if(foto === ""){
        alert("Por favor preencha o campo foto do produto")
      } else {
        alert("Produto cadastrado com sucesso!")
        Inserir()
        setProduto('')
        setValor('')
        setQuantidade('')
        setFoto('')
      }
  }

    /*** Remover dados do banco  */

  // const handleAlterar = (id, produto, foto, quantidade, valor) => {
  //   console.log(
  //     "id: " + id + "\n",
  //     "produto: " + produto + "\n",
  //     "foto: " + foto + "\n",
  //     "quantidade: " + quantidade + "\n",
  //     "valor: " + valor + "\n",
  //   )
  // }

  // const handleDelete = (id, produto) =>{
  //   alert( "Nome: " + produto)
  // }

  return (
    <div className='container'>
      <h1 className='mt-3 mb-5 text-center'>Cadastro de Produtos</h1>

      <form onSubmit={Cadastrar} className='mt-5 mb-5'>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                value={produto}
                placeholder="Nome do Produto"
                className="form-control"
                onChange={(e) => setProduto(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                value={valor}
                placeholder="Valor"
                className="form-control"
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                value={quantidade}
                placeholder="Quantidade"
                className="form-control"
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                value={foto}
                placeholder="Url da imagem"
                className="form-control"
                onChange={(e) => setFoto(e.target.value)}
              />
            </div>
          </div>

          
            <button type='submit' className={`btn btn-outline-success ${classInserir}`}>Inserir</button>
            <button type='submit' className={`btn btn-outline-primary ${classAlterar}`}>Salvar</button>
          
      </form>

      <table className='table table'>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome do Produto </th>
            <th scope="col">Valor</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Imagem</th>
            <th scope="col" className='text-center'>Ações</th>
          </tr>
        </thead>
        <tbody>
           
        { data.map( ( item ) => (
              <tr key={ item.id }>
                <th scope="row"> {item.id} </th>
                <td> { item.produto } </td>
                <td> { item.valor } </td>
                <td> { item.quantidade } </td>
                <td>
                  <img width={30} 
                  src={item.foto} 
                  alt="imagem do produto" />
                </td>
                <td>
                  <div className='btn-group d-flex gap-1'>
                    <button className='btn btn-outline-warning' /*onClick={ () => handleAlterar( item.id, item.produto, item.valor, item.foto, item.quantidade)}*/>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className='btn btn-outline-danger' /*onClick={ z => handleDelete( item.id, item.produto) }*/>                      
                      <i className="fa-solid fa-trash"></i>
                    </button>

                  </div>
                </td>
            </tr>
            ))
          }
         
        </tbody>
      </table>

    </div>
  )
}

export default App
