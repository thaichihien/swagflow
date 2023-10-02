import React, { ChangeEvent } from "react"
import { serverConfig } from "../config/env"
import { toast,ToastContainer } from "react-toastify"

type Props = {}

function ImportProducts({}: Props) {
  let productsFile: File

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      productsFile = e.target.files[0]
    }
  }

  const sendFileToServer = async () => {
    try {


      if(!productsFile){
        toast.error("Missing file!")
        return
      }

      toast.done("File upload in progress. Please wait for product import to complete.")
      const formData: FormData = new FormData()
      formData.append("file", productsFile)
      const res = await fetch(serverConfig.endpoint("/product/import"), {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        // - redirect
        const number = await res.json()
        toast.success(`Import ${number} products succesfully !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    } catch (error) {
      toast.error("Error occurs!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      console.log(error)
    }
  }

  return (
    <>
      <div className="page-header">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Products</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Import products
            </li>
          </ol>
        </nav>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">Import products by csv file</h3>
          <form>
          <input
            type="file"
            accept=".csv"
            className="form-control mb-3 py-2"
            onChange={uploadFile}
           
          />
          </form>
          <p>The .csv file must have the following structure </p>
          <div className="table-responsive mt-3">
            <table className="table table-dark table-bordered">
              <thead>
                <tr>
                  <th>name</th>
                  <th>category</th>
                  <th>brand</th>
                  <th>description</th>
                  <th>price</th>
                  <th>images</th>
                  <th>S</th>
                  <th>M</th>
                  <th>L</th>
                  <th>XL</th>
                  <th>XXL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      maxWidth: "150px",
                      lineHeight: "30px",
                    }}
                  >
                    Crooks & Castles Mad Klepto Tee Black Black
                  </td>
                  <td>T-shirts</td>
                  <td
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      maxWidth: "80px",
                      lineHeight: "30px",
                    }}
                  >
                    {" "}
                    The Crooks & Castles Mad
                  </td>
                  <td
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      maxWidth: "200px",
                      lineHeight: "30px",
                    }}
                  >
                    The Crooks & Castles Mad Klepto Tee in Black on Black
                    features the Crooks & Castles Mad Klepto design. Made out of
                    100% combed cotton and pre-shrunk, giving you a comfortable
                    fit.
                  </td>
                  <td>34.99</td>
                  <td
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                      maxWidth: "95px",
                      lineHeight: "30px",
                    }}
                  >
                    img01.png,img02.png
                  </td>
                  <th>0</th>
                  <th>2</th>
                  <th>3</th>
                  <th>0</th>
                  <th>1</th>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            className="btn btn-success mt-3 py-2 px-3"
            onClick={sendFileToServer}
          >
            Confirm
          </button>
        </div>
      </div>
     
    </>
  )
}

export default ImportProducts
