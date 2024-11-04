import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import ProjectCard from './projects/ProjectCard';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  projectsContainer: {
    marginTop: 75,
  },
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

function HomeAndProjects() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setHomeData(res))
      .catch((err) => err);
  }, []);

  const theme = useContext(ThemeContext);
  const [projectData, setProjectData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setProjectData(res))
      .catch((err) => err);
  }, []);
  const numberOfItems = showMore && projectData ? projectData.length : 6;

  return homeData && projectData ? (
    <>
      <Fade>
        <div style={styles.mainContainer}>
          <h1 style={styles.nameStyle}>{homeData?.name}</h1>
          <div style={{ flexDirection: 'row' }}>
            <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: homeData?.roles,
              }}
            />
          </div>
          <Social />
        </div>
      </Fade>

      <div className="section-content-container" style={styles.projectsContainer}>
        <Container style={styles.containerStyle}>
          <Row xs={1} sm={1} md={1} lg={2} className="g-4">
            {projectData.projects?.slice(0, numberOfItems).map((project) => (
              <Fade key={project.title}>
                <ProjectCard project={project} />
              </Fade>
            ))}
          </Row>

          {!showMore
            && (
            <Button
              style={styles.showMoreStyle}
              variant={theme.bsSecondaryVariant}
              onClick={() => setShowMore(true)}
            >
              show more
            </Button>
            )}
        </Container>
      </div>
    </>
  ) : <FallbackSpinner />;
}

export default HomeAndProjects;
