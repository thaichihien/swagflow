import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs"

function Footer() {
  return (
    <footer className="pt-5">
      <div className="container mb-5">
        <div className="row">
          <div className="col-5 d-flex flex-column me-5">
            <h4>About our store</h4>
            <p>
              Welcome to SwagFlow – your ultimate destination for hip-hop
              fashion. We take pride in presenting a unique collection, from
              graphic tees to baggy pants, vibrant sneakers, and eye-catching
              accessories.
            </p>
            <p>
              SwagFlow isn't just a store; it's a lifestyle – where you can
              freely express yourself and make your mark. Visit us today and
              explore the creative world of hip-hop fashion!
            </p>
            <ul className="d-flex gap-4 social-icons">
              <li>
                <BsFacebook />
              </li>
              <li>
                <BsInstagram />
              </li>
              <li>
                <BsTwitter />
              </li>
              <li>
                <BsYoutube />
              </li>
            </ul>
          </div>
          <div className="col d-flex flex-column">
            <h4>Category</h4>
            <ul className="d-flex flex-column">
              <li>item</li>
              <li>item</li>
              <li>item</li>
            </ul>
          </div>
          <div className="col d-flex flex-column">
            <h4>Help</h4>
            <ul className="d-flex flex-column">
              <li>item</li>
              <li>item</li>
              <li>item</li>
            </ul>
          </div>
          <div className="col d-flex flex-column">
            <h4>About our store</h4>
            <ul className="d-flex flex-column">
              <li>item</li>
              <li>item</li>
              <li>item</li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="container d-flex justify-content-center">
        <h5>&copy; 2023 SwagFlow by Chi Hien</h5>
      </div>
    </footer>
  )
}

export default Footer
