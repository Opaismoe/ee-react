import React, { useState, useEffect } from "react";
import { Grid, Container } from "semantic-ui-react";
import { useParams, useHistory } from "react-router-dom";

import AnimatedButton from "../components/AnimatedButton";

import {
  ProjectHeader,
  ProjectHeroImage,
  ProjectFluidContent,
  PlaceholderHeader,
  PlaceholderImage,
  ProjectVideo
} from "../components/index";

// import AwesomeSlider from "react-awesome-slider";
// import "react-awesome-slider/dist/styles.css";
// import "../components/awesome-slider-custom.css";

const Project = ({ projects, isLoading }) => {
  const { url_title } = useParams();
  const history = useHistory();
  const [oneProject, setOneProject] = useState([]);

  useEffect(() => {
    const getOneProject = async () => {
      let oneProject = projects
        .filter((project) => project.url_title === url_title)
        .map((filteredProject) => {
          return filteredProject;
        });
      setOneProject(oneProject);
    };
    getOneProject();
  }, [projects, url_title]);

  return (
    <>
      <AnimatedButton
        title="Terug"
        icon="long arrow alternate left"
        clickHandler={() => history.goBack()}
        style={style.btn}
      />

      {isLoading && (
        <Container text>
          <PlaceholderHeader />
          <PlaceholderImage fluid />
        </Container>
      )}

      <Grid container centered>
        <Grid.Row style={style.row}>
          <ProjectHeader oneProject={oneProject} />
        </Grid.Row>
      </Grid>

      <Container fluid>
        <Grid.Row style={style.row}>
          <ProjectHeroImage oneProject={oneProject} />
        </Grid.Row>
      </Container>

      <Grid container centered>
        <Grid.Row style={style.row}>
          <ProjectFluidContent oneProject={oneProject} />
        </Grid.Row>
      </Grid>
  
      <Grid container centered>
      {oneProject.map((project) => (
        project.videos.map((id, index) => (
          <ProjectVideo key={index} id={id} />
        ))
      ))}
      </Grid>
    </>
  );
};

export default Project;

const style = {
  row: {
    marginTop: `2.5em`,
    // justifyContent: `center`,
  },
  btn: {
    marginLeft: 0,
    position: `absolute`,
    left: 0,
  },
};
