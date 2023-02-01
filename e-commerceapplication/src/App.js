
import { useEffect, useState } from 'react';
import './App.css';
import ReactPaginate from 'react-paginate';
function App() {
  const [state, setState] = useState([])
  const [des, setDis] = useState(false)
  const [idx, setIdx] = useState()
  const [filters, setFilter] = useState([])
  const [filtT, setFilteT] = useState(false)
  const [pageNo, setPageNo] = useState(0)
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(e => e.json())
      .then(e => { setState(e.products.sort((a, b) => a.rating - b.rating)) })
      .catch(e => console.log(e))

  }, [])
  const userPa = 10
  const pageVist = pageNo * userPa
  const changePages = ({ selected }) => {
    setPageNo(selected)
    setFilteT(false)
  }
  // console.log(state)
  const change = (e) => {
    let valu = e.target.value
    console.log(valu)
    let newfilter = state.filter((e) => e.category === valu)
    console.log(newfilter)
    setFilter(newfilter)
    setFilteT(true)
  }
  return (
    <div className="App">
      <div className='heading'>Available Products</div>
      <select onChange={(e) => { change(e) }}>
        <option value='fragrances'>fragrances</option>
        <option value='skincare'>skincare</option>
        <option value='home-decoration'>home-decoration</option>
        <option value='smartphones'>smartphones</option>
        <option value='laptops'>laptops</option>
      </select>
      <div className='ingass'>
        {filtT ? filters.map((e) => {
          return (
            <div key={e.id}>
              <img className='imf' src={e.images[0]} onMouseOver={() => { setIdx(e.id); setDis(true) }} onMouseOut={() => { setDis(false) }}></img>
              {des && idx === e.id ? <div className='description'>
                <div>
                  <h3>{e.category} : </h3>
                  <img style={{ height: '140px' }} src={e.images[0]}></img>
                </div>
                <p style={{ marginLeft: '20px' }}><b>Description : </b>{e.description}</p></div> : ""}
            </div>
          )
        }) : state.slice(pageVist, pageVist + userPa).map((e, i) => {
          return (
            <div key={e.id}>
              <img className='imf' src={e.images[0]} onMouseOver={() => { setIdx(e.id); setDis(true) }} onMouseOut={() => { setDis(false) }}></img>
              {des && idx === e.id ? <div className='description'>
                <div>
                  <h3>{e.category} : </h3>
                  <img style={{ height: '140px' }} src={e.images[0]}></img>
                </div>
                <p style={{ marginLeft: '20px' }}><b>Description : </b>{e.description}</p></div> : ""}
            </div>
          )
        })}
      </div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        onPageChange={changePages}
        pageCount={3}
        containerClassName={"paginationBttns"}
        previousClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default App;
