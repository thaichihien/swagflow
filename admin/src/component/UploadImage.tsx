import React, { ChangeEvent, SyntheticEvent, useState } from "react"

type Props = {
  onUploadImages: (value: File[]) => void
}

function UploadImage({onUploadImages}: Props) {
  const [filePreviewArray, setFilePreviewArray] = useState<string[]>([])
  const [fileArray,setFileArray] = useState<File[]>([]);
  

  const uploadMultipleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const fileURLs = files.map((file) => URL.createObjectURL(file))
      setFilePreviewArray([...filePreviewArray, ...fileURLs])
      onUploadImages([...fileArray,...files])
      setFileArray([...fileArray,...files])

    }
  }

  const uploadFiles = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(filePreviewArray)
  }

  const removeFile = (e: SyntheticEvent, index: number) => {
    const fileUrl = filePreviewArray.filter((item, i) => i != index)
    setFilePreviewArray(fileUrl)
  }

  return (
    <>
      <form>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={uploadMultipleFiles}
            multiple
          />
        </div>

        <div className="form-group multi-preview">
          {filePreviewArray.map((url, index) => (
            <div className="image-area" key={index}>
              <img  src={url} alt="..." />
              <div
                className="remove-image"
                onClick={(e) => removeFile(e, index)}
                style={{ display: "inline" }}
              >
                &#215;
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={uploadFiles}
        >
          Clear
        </button>
      </form>
    </>
  )
}

export default UploadImage
