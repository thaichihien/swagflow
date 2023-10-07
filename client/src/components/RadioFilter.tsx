import React, { ChangeEvent } from "react"

type RequiredProp = {
  id: string
  name: string
}

type Props<T extends RequiredProp> = {
  radioList: T[]
  onChange: (value: string | "all") => void
}

function RadioFilter<T extends RequiredProp>({
  radioList,
  onChange,
}: Props<T>) {
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="filter-section">
      <h5 className="fw-bold">Category</h5>
      <ul className="form">
        <li>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="all"
              onChange={handleRadioChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              All
            </label>
          </div>
        </li>
        {radioList.map((item) => {
          return (
            <li key={item.id}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id={item.id}
                  value={item.name}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor={item.id}>
                  {item.name}
                </label>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RadioFilter
