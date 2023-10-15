import React, { ChangeEvent } from "react"

type RequiredProp = {
  id: string
  name: string
}

type Props<T extends RequiredProp> = {
  checkboxList: T[]
  onChange: (checked : boolean,value: string | "all") => void,
  selectedList: string[]
}

function CheckboxFilter<T extends RequiredProp>({
  checkboxList,
  onChange,
  selectedList
}: Props<T>) {
  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.checked,event.target.value)
  }
  function isSelected(name: string): boolean | undefined {
    return selectedList.includes(name)
  }
  return (
    <div className="filter-section">
      <h5 className="fw-bold">Brands</h5>
      <ul>
       
        {checkboxList.map((item) => {
        

          return (
            <li key={item.id}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={item.name}
                  id={item.id}
                  onChange={handleCheckboxChange}
                  checked={isSelected(item.name)}
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

export default CheckboxFilter
