import ProductCard from "../components/ProductCard"

function Products() {
  return (
    <>
      <div className="products-wrapper">
        <section className="filter-side-bar card">
          <div className="card-body">
            <div className="filter-section">
              <h5>Brands</h5>
              <ul>
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault-1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault-1"
                    >
                      Default checkbox
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault-2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault-2"
                    >
                      Default checkbox
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault-3"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault-3"
                    >
                      Default checkbox
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="product-list-wrapper">
          <div className="row row-cols-3 gy-4">
            <div className="column d-flex justify-content-center"><ProductCard/></div>
            <div className="column d-flex justify-content-center"><ProductCard/></div>
            <div className="column d-flex justify-content-center"><ProductCard/></div>
            <div className="column d-flex justify-content-center"><ProductCard/></div>
           
            
          </div>
        </section>
      </div>
    </>
  )
}

export default Products
