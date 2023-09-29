import React from "react"

type Props = {}

function Dashboard({}: Props) {
  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$12.34</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">
                Potential growth
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$17.34</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +11%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Revenue current</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$12.34</h3>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">
                      -2.4%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-danger">
                    <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Daily Income</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">$31.53</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <span className="mdi mdi-arrow-top-right icon-item"></span>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Expense current</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Transaction History</h4>
              <canvas
                id="transaction-history"
                className="transaction-chart"
              ></canvas>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 className="mb-1">Transfer to Paypal</h6>
                  <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 className="font-weight-bold mb-0">$236</h6>
                </div>
              </div>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 className="mb-1">Tranfer to Stripe</h6>
                  <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 className="font-weight-bold mb-0">$593</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title mb-1">Open Projects</h4>
                <p className="text-muted mb-1">Your data status</p>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="preview-list">
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-primary">
                          <i className="mdi mdi-file-document"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">
                            Admin dashboard design
                          </h6>
                          <p className="text-muted mb-0">
                            Broadcast web app mockup
                          </p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">15 minutes ago</p>
                          <p className="text-muted mb-0">30 tasks, 5 issues </p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-success">
                          <i className="mdi mdi-cloud-download"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">
                            Wordpress Development
                          </h6>
                          <p className="text-muted mb-0">Upload new design</p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">1 hour ago</p>
                          <p className="text-muted mb-0">23 tasks, 5 issues </p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-info">
                          <i className="mdi mdi-clock"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">Project meeting</h6>
                          <p className="text-muted mb-0">
                            New project discussion
                          </p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">35 minutes ago</p>
                          <p className="text-muted mb-0">15 tasks, 2 issues</p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-item border-bottom">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-danger">
                          <i className="mdi mdi-email-open"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">Broadcast Mail</h6>
                          <p className="text-muted mb-0">
                            Sent release details to team
                          </p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">55 minutes ago</p>
                          <p className="text-muted mb-0">35 tasks, 7 issues </p>
                        </div>
                      </div>
                    </div>
                    <div className="preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-warning">
                          <i className="mdi mdi-chart-pie"></i>
                        </div>
                      </div>
                      <div className="preview-item-content d-sm-flex flex-grow">
                        <div className="flex-grow">
                          <h6 className="preview-subject">UI Design</h6>
                          <p className="text-muted mb-0">
                            New application planning
                          </p>
                        </div>
                        <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                          <p className="text-muted">50 minutes ago</p>
                          <p className="text-muted mb-0">27 tasks, 4 issues </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Revenue</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">$32123</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p>
                  </div>
                  <h6 className="text-muted font-weight-normal">
                    11.38% Since last month
                  </h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Sales</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">$45850</h2>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +8.3%
                    </p>
                  </div>
                  <h6 className="text-muted font-weight-normal">
                    {" "}
                    9.61% Since last month
                  </h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <h5>Purchase</h5>
              <div className="row">
                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                  <div className="d-flex d-sm-block d-md-flex align-items-center">
                    <h2 className="mb-0">$2039</h2>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">
                      -2.1%{" "}
                    </p>
                  </div>
                  <h6 className="text-muted font-weight-normal">
                    2.27% Since last month
                  </h6>
                </div>
                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                  <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Order Status</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                      </th>
                      <th> Client Name </th>
                      <th> Order No </th>
                      <th> Product Cost </th>
                      <th> Project </th>
                      <th> Payment Mode </th>
                      <th> Start Date </th>
                      <th> Payment Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                      </td>
                      <td>
                        <img src="assets/images/faces/face1.jpg" alt="image" />
                        <span className="pl-2">Henry Klein</span>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Dashboard </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-success">
                          Approved
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                      </td>
                      <td>
                        <img src="assets/images/faces/face2.jpg" alt="image" />
                        <span className="pl-2">Estella Bryan</span>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Website </td>
                      <td> Cash on delivered </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-warning">
                          Pending
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                      </td>
                      <td>
                        <img src="assets/images/faces/face5.jpg" alt="image" />
                        <span className="pl-2">Lucy Abbott</span>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> App design </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-danger">
                          Rejected
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                      </td>
                      <td>
                        <img src="assets/images/faces/face3.jpg" alt="image" />
                        <span className="pl-2">Peter Gill</span>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Development </td>
                      <td> Online Payment </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-success">
                          Approved
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </label>
                        </div>
                      </td>
                      <td>
                        <img src="assets/images/faces/face4.jpg" alt="image" />
                        <span className="pl-2">Sallie Reyes</span>
                      </td>
                      <td> 02312 </td>
                      <td> $14,500 </td>
                      <td> Website </td>
                      <td> Credit card </td>
                      <td> 04 Dec 2019 </td>
                      <td>
                        <div className="badge badge-outline-success">
                          Approved
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title">Messages</h4>
                <p className="text-muted mb-1 small">View all</p>
              </div>
              <div className="preview-list">
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src="assets/images/faces/face6.jpg"
                      alt="image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Leonard</h6>
                        <p className="text-muted text-small">5 minutes ago</p>
                      </div>
                      <p className="text-muted">
                        Well, it seems to be working now.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src="assets/images/faces/face8.jpg"
                      alt="image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Luella Mills</h6>
                        <p className="text-muted text-small">10 Minutes Ago</p>
                      </div>
                      <p className="text-muted">
                        Well, it seems to be working now.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src="assets/images/faces/face9.jpg"
                      alt="image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Ethel Kelly</h6>
                        <p className="text-muted text-small">2 Hours Ago</p>
                      </div>
                      <p className="text-muted">Please review the tickets</p>
                    </div>
                  </div>
                </div>
                <div className="preview-item border-bottom">
                  <div className="preview-thumbnail">
                    <img
                      src="assets/images/faces/face11.jpg"
                      alt="image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="preview-item-content d-flex flex-grow">
                    <div className="flex-grow">
                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                        <h6 className="preview-subject">Herman May</h6>
                        <p className="text-muted text-small">4 Hours Ago</p>
                      </div>
                      <p className="text-muted">
                        Thanks a lot. It was easy to fix it .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Portfolio Slide</h4>
              <div
                className="owl-carousel owl-theme full-width owl-carousel-dash portfolio-carousel"
                id="owl-carousel-basic"
              >
                <div className="item">
                  <img src="assets/images/dashboard/Rectangle.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="assets/images/dashboard/Img_5.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="assets/images/dashboard/img_6.jpg" alt="" />
                </div>
              </div>
              <div className="d-flex py-4">
                <div className="preview-list w-100">
                  <div className="preview-item p-0">
                    <div className="preview-thumbnail">
                      <img
                        src="assets/images/faces/face12.jpg"
                        className="rounded-circle"
                        alt=""
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">CeeCee Bass</h6>
                          <p className="text-muted text-small">4 Hours Ago</p>
                        </div>
                        <p className="text-muted">
                          Well, it seems to be working now.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted">Well, it seems to be working now. </p>
              <div className="progress progress-md portfolio-progress">
                <div
                  className="progress-bar bg-success s1"
                  role="progressbar"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-xl-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">To do list</h4>
              <div className="add-items d-flex">
                <input
                  type="text"
                  className="form-control todo-list-input"
                  placeholder="enter task.."
                />
                <button className="add btn btn-primary todo-list-add-btn">
                  Add
                </button>
              </div>
              <div className="list-wrapper">
                <ul className="d-flex flex-column-reverse text-white todo-list todo-list-custom">
                  <li>
                    <div className="form-check form-check-primary">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> Create
                        invoice{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-box"></i>
                  </li>
                  <li>
                    <div className="form-check form-check-primary">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> Meeting
                        with Alita{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-box"></i>
                  </li>
                  <li className="completed">
                    <div className="form-check form-check-primary">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" checked />{" "}
                        Prepare for presentation{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-box"></i>
                  </li>
                  <li>
                    <div className="form-check form-check-primary">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> Plan
                        weekend outing{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-box"></i>
                  </li>
                  <li>
                    <div className="form-check form-check-primary">
                      <label className="form-check-label">
                        <input className="checkbox" type="checkbox" /> Pick up
                        kids from school{" "}
                      </label>
                    </div>
                    <i className="remove mdi mdi-close-box"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Visitors by Countries</h4>
              <div className="row">
                <div className="col-md-5">
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-us"></i>
                          </td>
                          <td>USA</td>
                          <td className="text-right"> 1500 </td>
                          <td className="text-right font-weight-medium">
                            {" "}
                            56.35%{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-de"></i>
                          </td>
                          <td>Germany</td>
                          <td className="text-right"> 800 </td>
                          <td className="text-right font-weight-medium">
                            {" "}
                            33.25%{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-au"></i>
                          </td>
                          <td>Australia</td>
                          <td className="text-right"> 760 </td>
                          <td className="text-right font-weight-medium">
                            {" "}
                            15.45%{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-gb"></i>
                          </td>
                          <td>United Kingdom</td>
                          <td className="text-right"> 450 </td>
                          <td className="text-right font-weight-medium">
                            {" "}
                            25.00%{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-ro"></i>
                          </td>
                          <td>Romania</td>
                          <td className="text-right"> 620 </td>
                          <td className="text-right font-weight-medium">
                            {" "}
                            10.25%{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="flag-icon flag-icon-br"></i>
                          </td>
                          <td>Brasil</td>
                          <td className="text-right"> 230 </td>
                          <td className="text-right font-weight-medium">
                            {" "}
                            75.00%{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-7">
                  <div id="audience-map" className="vector-map"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
