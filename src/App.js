import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  Row,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
  Table,
  Modal,
  Col,
} from "react-bootstrap";

function App() {
  const [products, setproducts] = useState();
  const [search, setsearch] = useState("");
  const [user, changeUser] = useState("Customer");
  const [view, setview] = useState("Products");
  const [productview, setproductview] = useState();
  const [retailerview, setretailerview] = useState();
  const [showRetailModal, setshowRetailModal] = useState(false);
  const [addorchange, setaddorchange] = useState(false);
  const [addorchangeRetailer, setaddorchangeretailer] = useState(false);
  const [productDetails, setproductDetails] = useState({
    id: "",
    category: "",
    retailprice: "",
    product_vendor: "",
    marketprice: "",
    product_stock: "",
  });
  const [retailerDetails,setretailerDetails]=useState({
    id:"",
    name:"",
    job_title:"",
    emailid:"",
    phone_num:"",
    reportsto:""

  })
  const [retailers,setretailers]=useState()
  useEffect(() => {
    axios.post("http://localhost:5000/api/data").then((resp) => {
      console.log(resp);
      setproducts(resp.data);
    });
    axios.get("http://localhost:5000/api/retailersdata").then((resp) =>{
      setretailers(resp.data)
    })
  }, [setproducts,setretailers]);

  const handleshowRetailModal = (data) => {
    setaddorchange(true);
    setproductDetails(data);
    setshowRetailModal(true);

    console.log(productDetails);
  };
  const handleshowModal = (data) => {
    setaddorchangeretailer(true);
    setretailerDetails(data);
    setshowmodal(true);

    console.log(productDetails);
  };
  const closeRetailModal = () => {
    setshowRetailModal(false);
  };
  const searchData = () => {
    axios
      .post("http://localhost:5000/api/search", { searchparameter: search })
      .then((resp) => {
        console.log(resp);
        setproducts(resp.data);
      });
  };
  const getProductViewdata = () => {
    axios.post("http://localhost:5000/api/data").then((resp) => {
      console.log(resp);
      setproductview(resp.data);
    });
  };
  const getReatilerView = () => {
    axios.post("http://localhost:5000/api/retailer").then((resp) => {
      console.log(resp);
      setretailerview(resp.data);
    });
  };

  const changeProductDetails = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const saveProductDetails = () => {
    axios
      .put("http://localhost:5000/api/updateproduct", { productDetails })
      .then((resp) => {
        console.log(resp);
        // setretailerview(resp.data);
        getProductViewdata();
      });
    closeRetailModal();
  };
  const DeleteProductDetails = (id) => {
    var result = window.confirm("Are you sure to delete!");
    if (result == true) {
      axios
        .post("http://localhost:5000/api/deleteproduct", { id: id })
        .then((resp) => {
          console.log(resp);
          // setretailerview(resp.data);
          getProductViewdata();
        });
      closeRetailModal();
    }
  };
  
  const DeleteRetailerDetails = (id) => {
    var result = window.confirm("Are you sure to delete!");
    if (result == true) {
      axios.post("http://localhost:5000/api/deleteretailer", { id: id })
        .then((resp) => {
          console.log(resp);
          // setretailerview(resp.data);
          getReatilerView();
        });
      closemodal();
    }
  };
  const addPrdoucts = () => {
    console.log(showRetailModal,"hello");
    setproductDetails({
      id: "",
      category: "",
      retailprice: "",
      product_vendor: "",
      marketprice: "",
      product_stock: "",
    });
    setaddorchange(false);
    setshowRetailModal(true);
  };
  const addretailer = () => {
    // console.log(showRetailModal,"hello");
    setretailerDetails({
      id:"",
      name:"",
      job_title:"",
      emailid:"",
      phone_num:"",
      reportsto:"",
    });
    setaddorchangeretailer(false);
    setshowmodal(true);
  };
  const insertProductDetails = () => {
    axios
      .post("http://localhost:5000/api/insertproduct", { productDetails })
      .then((resp) => {
        console.log(resp);
        // setretailerview(resp.data);
        getProductViewdata();
      });
    closeRetailModal();
  };
  

  const [showmodal,setshowmodal]=useState(false);
  const closemodal=()=>{
    setshowmodal(false)
  }
  const viewmodal=()=>{
    setshowmodal(true)
  }

  const changeRetailerDetails=(e)=>{
    setretailerDetails({ ...retailerDetails, [e.target.name]: e.target.value });
  }
  const saveRetailerDetails=()=>{
    axios
      .put("http://localhost:5000/api/updateretailer", { retailerDetails })
      .then((resp) => {
        console.log(resp);
        // setretailerview(resp.data);
        getReatilerView();
      });
    closemodal();
  }
  const insertretailerDetails = () => {
    axios
      .post("http://localhost:5000/api/insertretailer", { retailerDetails })
      .then((resp) => {
        console.log(resp);
        // setretailerview(resp.data);
        getReatilerView();
      });
      closemodal();
  };
  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      
<Modal show={showmodal} onHide={closemodal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>id</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={retailerDetails.id}
                onChange={changeRetailerDetails}
                disabled={addorchangeRetailer}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={retailerDetails.name}
                onChange={changeRetailerDetails}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>job_title</Form.Label>
              <Form.Control
                type="text"
                name="job_title"
                value={retailerDetails.job_title}
                onChange={changeRetailerDetails}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>emailid</Form.Label>
              <Form.Control
                type="text"
                name="emailid"
                value={retailerDetails.emailid}
                onChange={changeRetailerDetails}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>phone_num</Form.Label>
              <Form.Control
                type="text"
                name="phone_num"
                value={retailerDetails.phone_num}
                onChange={changeRetailerDetails}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>reportsto</Form.Label>
              <Form.Control
                type="text"
                name="reportsto"
                value={retailerDetails.reportsto}
                onChange={changeRetailerDetails}
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closemodal}>
            Close
          </Button>
          <Button variant="primary" onClick={addorchangeRetailer?saveRetailerDetails:insertretailerDetails}>
          {addorchangeRetailer?"Update Retailer":"Add Retailer"}
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showRetailModal} onHide={closeRetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>id</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={productDetails.id}
                onChange={changeProductDetails}
                disabled={addorchange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={productDetails.category}
                onChange={changeProductDetails}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>retailprice</Form.Label>
              <Form.Control
                type="text"
                name="retailprice"
                value={productDetails.retailprice}
                onChange={changeProductDetails}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>product_vendor</Form.Label>
              <Form.Control
                type="text"
                name="product_vendor"
                value={productDetails.product_vendor}
                onChange={changeProductDetails}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>marketprice</Form.Label>
              <Form.Control
                type="text"
                name="marketprice"
                value={productDetails.marketprice}
                onChange={changeProductDetails}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>product_stock</Form.Label>
              <Form.Control
                type="text"
                name="product_stock"
                value={productDetails.product_stock}
                onChange={changeProductDetails}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRetailModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addorchange?saveProductDetails:insertProductDetails}>
          {addorchange?"Update Product":"Add Product"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Retail Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex" style={{ paddingLeft: "30%" }}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setsearch(e.target.value)}
              />

              <Button variant="outline-success" onClick={searchData}>
                Search
              </Button>
            </Form>

            <Nav className="me-auto">
              <NavDropdown
                title={user}
                id="basic-nav-dropdown"
                style={{ marginLeft: user == "Customer" ? "300%" : "220%" }}
              >
                <NavDropdown.Item onClick={() => changeUser("Customer")}>
                  Customer
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    changeUser("Administrator");
                    getProductViewdata();
                    getReatilerView();
                  }}
                >
                  Administrator
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* <Nav.Item>{user}</Nav.Item> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {user == "Customer" && (
        <div style={{ marginLeft: "5%", width: "90%" }}>
          <h1 style={{ marginLeft: "20px" }}>Products</h1>
          <Row style={{ paddingLeft: "2%" }}>
            {products &&
              products.map((dat) => (
                <Card style={{ width: "16rem", margin: "10px 10px 10px 10px" }}>
                  <Card.Body>
                    <Card.Title>{dat.category}</Card.Title>
                    <Card.Text>Vendor: {dat.product_vendor}</Card.Text>
                    <Button variant="primary" value={dat.id}>
                      Purchase
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </Row>
        </div>
      )}

      {user == "Administrator" && (
        <div style={{ marginLeft: "5%", width: "90%" }}>
          <h1>Administrator View</h1>
          <Row style={{ width: "70%", marginBottom: "2%" }}>
            <Col>
              <Row>
                <Col>
                  <Dropdown style={{ width: "20rem" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {view}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setview("Products")}>
                        Products
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setview("Retailers")}>
                        Retailers
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  {view=='Products' ?<Button
                    style={{ width: "10rem" }}
                    onClick={() => addPrdoucts()}
                  >
                    Add Product
                  </Button> :<Button
                    style={{ width: "10rem" }}
                    onClick={() => addretailer()}
                  >
                    Add Retailer
                  </Button>}
                </Col>
              </Row>
            </Col>
          </Row>
          {productview && view === "Products" && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>category</th>
                  <th>retailprice</th>
                  <th>product_vendor</th>
                  <th>marketprice</th>
                  <th>product_stock</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {productview.map((dat) => (
                  <tr>
                    <td>{dat.id}</td>
                    <td>{dat.category}</td>
                    <td>{dat.retailprice}</td>
                    <td>{dat.product_vendor}</td>
                    <td>{dat.marketprice}</td>
                    <td>{dat.product_stock}</td>
                    <td>
                      <Button onClick={() => handleshowRetailModal(dat)}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          DeleteProductDetails(dat.id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {retailerview && view === "Retailers" && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>job_title</th>
                  <th>emailid</th>
                  <th>phone_num</th>
                  <th>reportsto</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {retailerview.map((dat) => (
                  <tr>
                    <td>{dat.id}</td>
                    <td>{dat.name}</td>
                    <td>{dat.job_title}</td>
                    <td>{dat.emailid}</td>
                    <td>{dat.phone_num}</td>
                    <td>{dat.reportsto}</td>
                    <td>
                      <Button onClick={()=>handleshowModal(dat)}>Edit</Button>
                    </td>
                    <td>
                      <Button  onClick={() => {
                          DeleteRetailerDetails(dat.id);
                        }}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
