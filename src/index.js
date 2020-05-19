import React from "react";
import ReactDom from "react-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row, Col, Card } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_username: "ujjwal-raizada",
      avatar_url: "",
      name: "",
      repos: "",
      followers: "",
      following: "",
      username: "",
      repo_stars: "",
      repo_list: [],
    };
  }

  apiCall = () => {
    let apiUrl = `https://api.github.com/users/${this.state.search_username}`;
    let token = "960b4d41a7e31b30cbeefc4bec2003b5f60042d4";
    axios
      .get(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        return res;
      })
      .then((res) => {
        this.setState({
          avatar_url: res.data.avatar_url,
          name: res.data.name,
          repos: res.data.public_repos,
          followers: res.data.followers,
          following: res.data.following,
          username: res.data.login,
        });
      });

    apiUrl = `https://api.github.com/users/${this.state.search_username}/repos`;
    axios
      .get(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        return res;
      })
      .then((res) => {
        let star_count = 0;
        let repo_list = [];
        let repo_array = res.data;
        repo_array.map((item) => {
          star_count += item.stargazers_count;
          if (item.fork) {
            var obj = {
              fork: "true",
              language: item.language,
              name: item.name,
              stars: item.stargazers_count,
              description: item.description,
            };
            repo_list.push(obj);
          } else {
            obj = {
              fork: "false",
              language: item.language,
              name: item.name,
              stars: item.stargazers_count,
            };
            repo_list.push(obj);
          }
        });
        this.setState({
          repo_stars: star_count,
          repo_list: repo_list,
        });
      });
  };

  componentDidMount() {
    this.apiCall();
  }

  handleSubmit = (event) => {
    let new_username = this.state.search_username;
    this.setState({ username: new_username });
    this.apiCall();
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    var repo_list = this.state.repo_list.map((item) => {
      if (!item.description) {
        item.description = "None";
      }
      return (
        <div>
          <Card>
            <Card.Title> {item.name} </Card.Title>
            <Card.Text> Description - {item.description} </Card.Text>
            <Card.Text> forked - {item.fork} </Card.Text>
            <Card.Text> language - {item.language} </Card.Text>
            <Card.Text> stars - {item.stars} </Card.Text>
          </Card>
          <br />
        </div>
      );
    });
    return (
      <div>
        <div padding="20px">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">GitHub Search</Navbar.Brand>
            <Nav className="mr-auto"></Nav>
          </Navbar>
        </div>
        <Container fluid>
          <Row>
            <Col></Col>
            <Col xs={6}>
              <form>
                <label>
                  Enter Username:
                  <input
                    type="text"
                    value={this.state.search_username}
                    onChange={this.handleChange}
                    name="search_username"
                  />
                  <button onClick={this.handleSubmit}>search</button>
                </label>
              </form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col></Col>
            <Col xs={6}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={this.state.avatar_url} />
                <Card.Body>
                  <Card.Title>{this.state.name}</Card.Title>
                  <Card.Text> Username - {this.state.username}</Card.Text>
                  <Card.Text> Repos - {this.state.repos}</Card.Text>
                  <Card.Text> Followers - {this.state.followers} </Card.Text>
                  <Card.Text> Following - {this.state.following} </Card.Text>
                  <Card.Text> Repo Stars - {this.state.repo_stars} </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
        <Container>{repo_list}</Container>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
