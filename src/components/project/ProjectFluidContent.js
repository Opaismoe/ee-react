import React from "react";

import he from "he";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "../../components/awesome-slider-custom.css";
import { Header, Grid } from "semantic-ui-react";
import ProjectVideo from "./ProjectVideo";

const ProjectFluidContent = ({ project }) => {
  /**
   * @param {object} content encoded html entities from expression engine's backend
   */
  const createMarkup = (content) => {
    let data = he.decode(content);
    return { __html: data };
  };

  return (
    <Grid container centered>
      <Grid.Row className="row">
        {project[0]?.fluid_content?.map((content, i) =>
          content.content ? (
            <div
              key={i}
              dangerouslySetInnerHTML={createMarkup(content.content)}
              className="row fluid__content"
            ></div>
          ) : content.image_project ? (
            <img
              key={i}
              src={`https://terralemon.nl/img/projects/${content.image.split('/')[5]}`}
              alt={content.image_project}
            ></img>
          ) : content.subtitle ? (
            <Header key={i}>
              <h4>{he.decode(content.subtitle)}</h4>
            </Header>
          ) : content.image_gallery ? (
            <AwesomeSlider key={i} bullets={false}>
              {content.image_gallery.map((src) => (
                <img key={i} data-src={src} alt={src} />
              ))}
            </AwesomeSlider>
          ) : content.video_gallery ? (
            content.video_gallery.map((url, index) => (
              <ProjectVideo key={index} url={url} />
            ))
          ) : null
        )}
      </Grid.Row>
    </Grid>
  );
};

export default ProjectFluidContent;
