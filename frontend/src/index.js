import React from "react";
import ReactDom from "react-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    FormControl,
    Button,
    Spinner
} from "react-bootstrap";
import Header from "./Components/Header";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

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
            linkedInData: {},
            gitAvailable: "0",
            showDiv: false,
            showSpinner: false,
            skills: [],
            flag: 0,
        };
    }

    apiCall = () => {
        let gitUsernameApi = `http://127.0.0.1:12345/${this.state.search_username}`;
        let linkedInApi = `http://127.0.0.1:12344/username/${this.state.search_username}`;
        axios
            .get(gitUsernameApi)
            .then((res) => {
                return res;
            })
            .then((res) => {
                axios.get(linkedInApi).then((r) => {
                    this.setState({ linkedInData: r.data, showDiv: true });
                    let skills = [];

                    r.data.skills.map(item => {
                        console.log(item.name)
                        skills.push(item.name);
                    })
                    this.setState({skills: skills})
                    console.log(this.state.skills)
                });
                console.log("res.data", res.data, typeof res.data);
                if (res.data === 0) {
                    this.setState({flag: 0})
                    alert("please Link your profile");
                } else if (res.data !== -1) {
                    this.setState({flag: 1})
                    if (res.data !== 0) {
                        let apiUrl = `https://api.github.com/users/${res.data}`;
                        let token = "960b4d41a7e31b30cbeefc4bec2003b5f60042d4";
                        axios
                            .get(apiUrl, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
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
                            .get(apiUrl, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
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
                        this.setState({ gitAvailable: "1" });
                    }
                }
            });
    };

    handleSubmit = (event) => {
        let new_username = this.state.search_username;
        this.setState({ 
                        username: new_username, 
                        showSpinner: true,
                        gitAvailable: "0",
                        showSpinner: true,
                        showDiv: false,
                    });
        this.apiCall();
        event.preventDefault();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        let skills = this.state.skills.map(item => {
            return <Card.Text>{item}</Card.Text>
        })
        var repo_list = this.state.repo_list.map((item, idx) => {
            if (!item.description) {
                item.description = "None";
            }
            return (
                <div>
                    <div style={{ padding: '1rem' }}>
                        <Row>
                            <Col xs={8}>
                                {item.name}
                            </Col>
                            <Col>
                                forked - {item.fork}
                            </Col>
                            <Col>
                                stars - {item.stars}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={8}>
                                {item.description}
                            </Col>
                            <Col>
                                Language - {item.language}
                            </Col>
                        </Row>
                    </div>
                    <ColoredLine color="cyan"></ColoredLine>
                </div>
            );
        });

        let Git;
        console.log("this.state.gitAvailable", this.state.gitAvailable);
        if (this.state.gitAvailable === "1") {
            Git = (
                <Container style={{ margin: "30px" , height: '30px'}}>
                    <Container>
                    <Row>
                        <Col>
                            <Card style={{ height: '80px' }} className='text-center' border="dark">
                                <Card.Title>Name</Card.Title>
                                <Card.Text>{this.state.name}</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ height: '80px' }} className='text-center' border="dark">
                                <Card.Title>Repos</Card.Title>
                                <Card.Text>{this.state.repos}</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ height: '80px' }} className='text-center' border="dark">
                                <Card.Title>Followers</Card.Title>
                                <Card.Text>{this.state.followers}</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ height: '80px' }} className='text-center' border="dark">
                                <Card.Title>Following</Card.Title>
                                <Card.Text>{this.state.following}</Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ height: '80px' }} className='text-center' border="dark">
                                <Card.Title>Repo Stars</Card.Title>
                                <Card.Text>{this.state.repo_stars}</Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                    <div>
                        <div style={{ height: "20px" }}></div>
                        {repo_list}
                    </div>
                </Container>
            );
        } else {
            Git = <div></div>;
        }

        let LinkedIn = <div></div>;

        if(this.state.showSpinner) {
            LinkedIn =  <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-50px",
                marginLeft: "-50px",
                width: "100px",
                height: "100px",
            }} >
                            <div>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            </div>
                        </div>
        }

        if (this.state.showDiv === true) {
            console.log((this.state.flag? "80px": "450px"));
            LinkedIn = (
                <div style={{ display: "flex", alignContent: "space-around" }}>
                    <div style={{ marginLeft: (this.state.flag? "80px": "550px"), 
                                  marginTop:"30px"}}>
                        <Card
                            style={{
                                width: "30rem",
                                justifyContent: "center",
                            }}
                            border="dark"
                        >
                            <Card.Body>
                                <Card.Title>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div>LinkedIn Data</div>
                                    </div>
                                </Card.Title>
                                <Card.Text className="text-center">
                                    {this.state.linkedInData.firstName}
                                    {" "}
                                    {this.state.linkedInData.lastName}
                                </Card.Text>
                                <Card.Text>
                                    {this.state.linkedInData.headline}
                                </Card.Text>
                                <Card.Text>
                                    {this.state.linkedInData.summary}
                                </Card.Text>
                                <Card.Text className="text-center">
                                    <strong> Skills</strong>
                                </Card.Text>
                                {skills}
                            </Card.Body>
                        </Card>
                    </div>
                    {Git}
                </div>
            )
        }

        return (
            <div>
                <Header />
                <div style={{ height: "40px" }}></div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                        <Form inline onSubmit={this.handleSubmit}>
                            <FormControl
                                type="text"
                                placeholder="LinkedIn Username"
                                className="mr-sm-2"
                                onChange={this.handleChange}
                                name="search_username"
                            />
                            <Button
                                variant="dark"
                                onClick={this.handleSubmit}
                            >
                                Search
                            </Button>
                        </Form>
                    </div>
                </div>
                <div style={{ height: "40px" }}></div>
                {LinkedIn}
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById("root"));
